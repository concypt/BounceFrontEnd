import React, { useEffect, useState } from "react";
import styles from "./events.module.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const [remainingDays, setRemainingDays] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const eventStartTime = new Date(event.start_time); // Assuming event is defined somewhere

    const differenceInTime = eventStartTime.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    setRemainingDays(differenceInDays);
  }, [event.start_time]);

  const dateTimeString = event.start_time;
  const dateTimeParts = dateTimeString.split(" ");
  const dateWithoutTime = dateTimeParts[0];
  console.log(remainingDays);

  return (
    <div className={styles.eventCard}>
      <Link to={`/events/${event.id}`}>
        <div className={styles.eventCardImage}>
          <img
            className={styles.eventImg}
            src="https://images.unsplash.com/photo-1584391889471-9603788c366c"
            alt="San Francisco"
          />
          <div className={styles.eventCategoryButton}>{event.category}</div>
        </div>
      </Link>
      <div className={styles.eventCardDetails}>
        <Link to={`/events/${event.id}`}>
          <h2>{event.name}</h2>
        </Link>
        <div className={styles.dateRemainingDaysDiv}>
          <span className={styles.time}>
            <img src="../images/clock.svg" alt="" /> {dateWithoutTime}
          </span>
          <div
            className={
              remainingDays === 0
                ? styles.remainingDaysZero
                : styles.remainingDaysBtn
            }
          >
            {isNaN(remainingDays) || remainingDays < 0 ? (
              <>The event is over</>
            ) : remainingDays === 0 ? (
              <>Today is the event</>
            ) : (
              <>
                In {remainingDays} {remainingDays === 1 ? "day" : "days"} time
              </>
            )}
          </div>
        </div>

        <div className={event.location ? styles.locationDiv : null}>
          {event.location && (
            <span className={styles.location}>
              <img src="../images/location.svg" alt="" /> {event.location}
            </span>
          )}
        </div>

        <div className={styles.ticketsFindMore}>
          <a className="bgGlobalBtn" href="">
            <span>
              <img src="../images/buy-ticket.svg" alt="" />
              Buy Tickets
            </span>
          </a>
          <a className="bgGlobalBtn borderGlobalBtn" href="">
            <span>Find out more</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
