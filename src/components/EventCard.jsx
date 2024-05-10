import styles from "./events.module.css";
import { Link } from "react-router-dom";

//images
import clockIcon from "../assets/images/clock.svg";
import locationIcon from "../assets/images/location.svg";
import buyTicketIcon from "../assets/images/buy-ticket.svg";

function EventCard({ event }) {
  // Parse the start time string into a Date object
  const startTime = new Date(event.start_time);
  // Format the date portion only
  const formattedDate = startTime.toLocaleDateString();
  return (
    <div className={styles.eventCard}>
      <Link to={`/events/${event.id}`}>
        <div className={styles.eventCardImage}>
          <img
            className={styles.eventImg}
            src={event.image}
            alt="Event image"
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
            <img src={clockIcon} alt="" /> {formattedDate}
          </span>
          <div className={styles.remainingDaysBtn}>
            <>The event is over</>
          </div>
        </div>

        <div className={event.location ? styles.locationDiv : null}>
          {event.location && (
            <span className={styles.location}>
              <img src={locationIcon} alt="" /> {event.location}
            </span>
          )}
        </div>

        <div className={styles.ticketsFindMore}>
          <a className="bgGlobalBtn" href="">
            <span>
              <img src={buyTicketIcon} alt="" />
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
