import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./events.module.css";

const URL = "https://bounce.extrasol.co.uk/api/attenders/events";

const EventList = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setEvents(jsonData.data); // Set the parsed JSON data as the events state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : events.length === 0 ? (
        <div>No events available</div>
      ) : (
        <div className="bounce_bg_circle">
          <div className="container-fluid">
            <div className={styles.eventsGrid}>
              {limit
                ? events
                    .slice(0, limit)
                    .map((event, index) => (
                      <EventCard key={event.id} event={event} />
                    ))
                : events.map((event, index) => (
                    <EventCard key={event.id} event={event} />
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
