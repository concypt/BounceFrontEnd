import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CatContext } from "../contexts/GlobalProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./eventCard.module.css";

//images
import clockIcon from "../assets/images/clock.svg";
import locationIcon from "../assets/images/location.svg";
import buyTicketIcon from "../assets/images/buy-ticket.svg";
import { set } from "date-fns";

function EventCard({
  event,
  setModalEventId,
  toggleModal,
  setSelectedCategories,
}) {
  const { categories } = useContext(CatContext);
  //console.log(event);
  // Parse the start time string into a Date object
  const startTime = new Date(event.start_time);
  // Format the date portion only
  const formattedDate = startTime.toLocaleDateString();

  const handleCatChange = (catName) => {
    const category = categories.find((category) => category.name === catName);
    const catId = category ? category.id : null;
    setSelectedCategories([catId]);
  };
  const handleBuyTickets = () => {
    setModalEventId(event.id);
    toggleModal();
  };
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventCardImage}>
        <button
          type="button"
          className={styles.eventCategoryButton}
          onClick={() => handleCatChange(event.category)}
        >
          {event.category || <Skeleton />}
        </button>
        <Link to={`/events/${event.id}`}>
          <img className={styles.eventImg} src={event.image} alt={event.name} />
        </Link>
      </div>

      <div className={styles.eventCardDetails}>
        <Link to={`/events/${event.id}`}>
          <h2>{event.name || <Skeleton />}</h2>
        </Link>
        <div className={styles.dateRemainingDaysDiv}>
          <span className={styles.time}>
            <img src={clockIcon} alt="" /> {formattedDate || <Skeleton />}
          </span>
          <div className={styles.remainingDaysBtn}>
            <>{event.daysCount || <Skeleton />}</>
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
              {"Buy tickets " || <Skeleton />}
            </span>
          </a>
          <Link
            to={`/events/${event.id}`}
            className="bgGlobalBtn borderGlobalBtn"
          >
            <span>{"Find out more" || <Skeleton />}</span>
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
  setSelectedCategories: PropTypes.func,
};
export default EventCard;
