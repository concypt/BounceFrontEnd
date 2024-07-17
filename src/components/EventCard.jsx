import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./eventCard.module.css";

//images
import clockIcon from "../assets/images/clock.svg";
import locationIcon from "../assets/images/location.svg";
import buyTicketIcon from "../assets/images/buy-ticket.svg";
import { set } from "date-fns";

function EventCard({ event, setModalEventId, toggleModal }) {
  //console.log(event);
  // Parse the start time string into a Date object
  const startTime = new Date(event.start_time);
  // Format the date portion only
  const formattedDate = startTime.toLocaleDateString();

  const handleBuyTickets = () => {
    setModalEventId(event.id);
    toggleModal();
  };
  return (
    <div className={styles.eventCard}>
      <Link to={`/events/${event.id}`}>
        <div className={styles.eventCardImage}>
          <img className={styles.eventImg} src={event.image} alt={event.name} />
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
            <>{event.daysCount}</>
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
          <a className="bgGlobalBtn" onClick={handleBuyTickets}>
            <span>
              <img src={buyTicketIcon} alt="" />
              Buy tickets
            </span>
          </a>
          <Link
            to={`/events/${event.id}`}
            className="bgGlobalBtn borderGlobalBtn"
          >
            <span>Find out more</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
EventCard.propTypes = {
  event: PropTypes.object,
  setModalEventId: PropTypes.func,
  toggleModal: PropTypes.func,
};
export default EventCard;
