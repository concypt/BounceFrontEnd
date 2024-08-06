import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import { Link, useNavigate } from "react-router-dom";
import { fetchEventDetails } from "../../api/secureService";

import calendarIcon from "../../assets/images/calender.svg";
import clockIcon from "../../assets/images/clock_grey.svg";
import locationIcon from "../../assets/images/location_grey.svg";
import { format, parseISO } from "date-fns";

const EventInfoComponent = ({ eventData }) => {
  let date = '';
  let time = '';

  // Check if start_time exists
  if (eventData && eventData.start_time) {
    const eventDateTime = new Date(eventData.start_time);
    date = eventDateTime.toLocaleDateString();
    time = eventDateTime.toLocaleTimeString();
  }
  return (
    <div className="singleEvent">
      <div className="singleEventHeader">
        <h2>{eventData.name}</h2>
        <Link to={`/events/${eventData.id}`} className="viewAll">
          <span>View event page </span>
        </Link>
      </div>
      <div className="cardDescription">
        <p className="event_date">
          <img src={calendarIcon} className="descriptionImg" alt="" />{" "}
          {date}
        </p>
        <p>
          <img src={clockIcon} className="descriptionImg" alt="" /> {time}
        </p>
        <p>
          <img src={locationIcon} className="descriptionImg" alt="" />{" "}
          {eventData.type === "online" ? "Online Event" : (eventData.location ? eventData.location : " ")}
        </p>
      </div>
      <div className="singleEventBtn">
        <Link to={`/host-event/edit/${eventData.id}/`}>
          <button className="loginButton">
            <span>Edit event</span>
          </button>
        </Link>
        <Link to={`/host-event/${eventData.id}/tickets`}>
          <button className="loginButton" type="button">
            <span>Manage tickets</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventInfoComponent;
