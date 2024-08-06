import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import EventCard from "./EventCard";
import Pagination from "./Pagination";

import PropTypes from "prop-types";
import emptyState from "../assets/images/emptystate.svg";
import EventTickets from "./EventTickets";
import styles from "./eventList.module.css";
import Skeleton from "react-loading-skeleton";

const URL = "https://api.bounce.live/api/attenders/events";
let config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  },
};

const EventList = ({
  limit,
  searchKeywords,
  selectedCategories,
  location,
  dateParameter,
  setSearchKeywords,
  setSelectedCategories,
  setLocation,
  setDateParameter,
}) => {
  const navigate = useNavigate();
  const locationObj = useLocation();

  // Parse query parameters from URL if there are any
  const queryParams = new URLSearchParams(locationObj.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialSearchKeywords = queryParams.get("keyword") || "";
  const initialLocation = queryParams.get("location") || "";
  const initialDateParameter = queryParams.get("date") || "";
  const initialSelectedCategories = queryParams.getAll("categories[]");
  const [page, setPage] = useState(initialPage);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [modalEventId, setModalEventId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //useEffect with empty dependency to render first time if found parameters in URL
  useEffect(() => {
    if (!limit) {
      setSearchKeywords(initialSearchKeywords);
      setLocation(initialLocation);
      setDateParameter(initialDateParameter);
      setSelectedCategories(initialSelectedCategories);
    }
  }, []);

  //whenever a filter changes or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (!limit) params.set("page", page);
    if (searchKeywords) params.set("keyword", searchKeywords);
    if (location) params.set("location", location);
    if (dateParameter) params.set("date", dateParameter);
    if (selectedCategories) {
      selectedCategories.forEach((category) =>
        params.append("categories[]", category)
      );
    }
    navigate({ search: params.toString() });
  }, [
    limit,
    page,
    initialPage,
    eventsPerPage,
    searchKeywords,
    location,
    dateParameter,
    selectedCategories,
    navigate,
  ]);
  // Reset page to 1 when filter parameters change
  useEffect(() => {
    setPage(1);
  }, [
    searchKeywords,
    location,
    dateParameter,
    selectedCategories,
    eventsPerPage,
  ]);

  const fetchEvents = async (page = 1) => {
    let completeURL = `${URL}`;
    if (!limit) {
      const categoriesParameter = selectedCategories
        .map((category) => `categories[]=${category}`)
        .join("&");

      const params = new URLSearchParams({
        ...(searchKeywords && { keyword: searchKeywords }),
        ...(location && { location: location }),
        ...(eventsPerPage && { perPage: eventsPerPage }),
        ...(page && { page }),
      });

      completeURL = `${URL}?${params.toString()}`;
      if (dateParameter) {
        completeURL += `&date=${dateParameter}`;
      }
      if (categoriesParameter) {
        completeURL += `&${categoriesParameter}`;
      }
    }

    const { data } = await axios
      .get(completeURL, config)
      .then((res) => res.data);
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "events",
      page,
      {
        selectedCategories: selectedCategories,
        searchKeywords: searchKeywords,
        location: location,
        dateParameter: dateParameter,
        eventsPerPage: eventsPerPage,
      },
    ],
    queryFn: () => fetchEvents(page),
    keepPreviousData: true,
  });

  if (error) {
    return <p>Errors: {error.message}</p>;
  }

  return (
    <>
      <div className="custom-wrapper">
      <div className={styles.eventsGrid}>
  {isLoading ? (
    Array(limit || eventsPerPage).fill({}).map((_, index) => (
      <EventCard
        key={index}
        event={{}} // Pass an empty object for loading state
        setModalEventId={setModalEventId}
        toggleModal={toggleModal}
        setSelectedCategories={setSelectedCategories}
      />
    ))
  ) : data.events && data.events.length > 0 ? (
    (limit ? data.events.slice(0, limit) : data.events).map((event, index) => (
      <EventCard
        key={event.id}
        event={event}
        setModalEventId={setModalEventId}
        toggleModal={toggleModal}
        setSelectedCategories={setSelectedCategories}
      />
    ))
  ) : (
    <div className={styles.noEventsstyle}>
        <div className="emptyContent">
              <img src={emptyState} alt="No upcoming events" />
              <h2>No upcoming events :(</h2>
            </div>
    </div>
  )}
</div>

        {isLoading ? (
          <Skeleton />
        ) : limit || data.events.length < 11 ? (
          ""
        ) : (
          <Pagination
            totalPosts={data?.total_result || 0}
            postsPerPage={eventsPerPage}
            setEventsPerPage={setEventsPerPage}
            setPage={setPage}
            page={page}
          />
        )}
      </div>
      {isModalOpen && (
        <EventTickets eventId={modalEventId} toggleModal={toggleModal} />
      )}
    </>
  );
};

EventList.propTypes = {
  limit: PropTypes.number,
  searchKeywords: PropTypes.string,
  selectedCategories: PropTypes.array,
  location: PropTypes.string,
  locationMiles: PropTypes.number,
  dateParameter: PropTypes.string,
  setSearchKeywords: PropTypes.func,
  setSelectedCategories: PropTypes.func,
  setLocation: PropTypes.func,
  setDateParameter: PropTypes.func,
};
export default EventList;
