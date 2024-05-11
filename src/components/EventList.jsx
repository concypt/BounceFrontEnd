import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./events.module.css";

const URL = "https://bounce.extrasol.co.uk/api/attenders/events";

const EventList = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setProgress(30); // Start loading bar at 30%
        const response = await fetch(URL, {
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
  }, []);

  return (
    <>
      <div className={styles.eventsGrid}>
        {limit
          ? events
              .slice(0, limit)
              .map((event) => <EventCard key={event.id} event={event} />)
          : events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>{" "}
    </>
  );
};

export default EventList;
