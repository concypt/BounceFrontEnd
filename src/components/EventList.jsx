import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./events.module.css";

const URL = "https://bounce.extrasol.co.uk/api/attenders/events";

const EventList = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(30); // Start loading bar at 30%
        const response = await fetch(URL);
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

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      <div className="bounce_bg_circle">
      <LoadingBar progress={progress} color="#7e79ff" height={3} />
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
    </div>
  );
}



export default EventList;
