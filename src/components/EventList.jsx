import { useEffect, useState } from "react";
import EventFilter from "./EventFilter";
import EventCard from "./EventCard";
import Pagination from "./Pagination";

import PropTypes from "prop-types";
import styles from "./eventList.module.css";

const URL = "https://bounce.extrasol.co.uk/api/attenders/events";

const EventList = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(9);

  //filters
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([8, 7, 2]);
  const [location, setLocation] = useState("");
  const [locationMiles, setLocationMiles] = useState(40);
  const [dateParameter, setDateParameter] = useState("");

  const filterNow = () => {
    console.log(searchKeywords);
    console.log(selectedCategories);
    console.log(location);
    console.log(locationMiles);
    console.log(dateParameter);
  };

  useEffect(() => {
    let categoriesParameter = "";
    selectedCategories.map((category) => {
      categoriesParameter += "&categories[]=" + category;
    });

    const completeURL =
      URL +
      "?" +
      (searchKeywords ? "keyword=" + searchKeywords + "&" : "") +
      (location ? "?location=" + location + "&" : "") +
      //(locationMiles ? "?locationmiles=" + locationMiles + "&" : "") +
      (dateParameter ? "?date=" + dateParameter + "&" : "") +
      (categoriesParameter ? categoriesParameter : "");

    const fetchEvents = async () => {
      try {
        setProgress(30); // Start loading bar at 30%
        const response = await fetch(completeURL, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setEvents(jsonData.data); // Set the parsed JSON data as the events state
        setLoading(false);
        setProgress(100); // Finish loading bar
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setProgress(100); // Finish loading bar even on error
      }
    };

    fetchEvents();

    return () => {
      // Cleanup if needed
    };
  }, [searchKeywords, location, dateParameter, selectedCategories]);

  const lastEventIndex = currentPage * eventsPerPage;
  const firstEventIndex = lastEventIndex - eventsPerPage;
  const currentPageEvents = events.slice(firstEventIndex, lastEventIndex);

  return (
    <>
      {limit ? (
        ""
      ) : (
        <EventFilter
          setSearchKeywords={setSearchKeywords}
          setSelectedCategories={setSelectedCategories}
          setLocation={setLocation}
          setLocationMiles={setLocationMiles}
          setDateParameter={setDateParameter}
          filterNow={filterNow}
        />
      )}

      <div className="custom-wrapper">
        <div className={styles.eventsGrid}>
          {limit
            ? currentPageEvents
                .slice(0, limit)
                .map((event) => <EventCard key={event.id} event={event} />)
            : currentPageEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
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
};
export default EventList;
