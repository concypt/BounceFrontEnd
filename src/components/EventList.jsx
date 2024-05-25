import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import EventCard from "./EventCard";
import Pagination from "./Pagination";

import PropTypes from "prop-types";
import styles from "./eventList.module.css";

const URL = "https://bounce.extrasol.co.uk/api/attenders/events";
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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(9);

  const fetchEvents = async () => {
    let completeURL = `${URL}`;
    if (!limit) {
      const categoriesParameter = selectedCategories
        .map((category) => `categories[]=${category}`)
        .join("&");

      const params = new URLSearchParams({
        ...(searchKeywords && { keyword: searchKeywords }),
        ...(location && { location }),
        ...(dateParameter && { date: dateParameter }),
      });

      completeURL = `${URL}?${params.toString()}&${categoriesParameter}`;
    }
    const { data } = await axios
      .get(completeURL, config)
      .then((res) => res.data);
    return data;
  };

  const {
    data: events,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "events",
      { selectedCategories, searchKeywords, location, dateParameter },
    ],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    // setProgress(30);
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <p>Errors: {error.message}</p>;
  }

  return (
    <>
      <div className="custom-wrapper">
        <div className={styles.eventsGrid}>
          {limit
            ? events
                .slice(0, limit)
                .map((event) => <EventCard key={event.id} event={event} />)
            : events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>{" "}
        {limit ? (
          ""
        ) : (
          <Pagination
            totalPosts={events.length}
            postsPerPage={eventsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
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
};
export default EventList;
