import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import { Link ,useNavigate } from "react-router-dom";
import { fetchEventDetails } from "../../api/secureService";

import calendarIcon from "../../assets/images/calender.svg";
import clockIcon from "../../assets/images/clock_grey.svg";
import locationIcon from "../../assets/images/location_grey.svg";
import { format, parseISO } from 'date-fns';

const EventInfoComponent = ({ eventData }) => {
 
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
          {eventData.start_time}
        </p>
        <p>
          <img src={clockIcon} className="descriptionImg" alt="" /> 5PM
        </p>
        <p>
          <img src={locationIcon} className="descriptionImg" alt="" />{" "}
          {eventData.location ? eventData.location : "No location Entered"}
        </p>
      </div>
      <div className="singleEventBtn">
        
        <button className="loginButton" >
          <span>Edit event</span>
        </button>
       
        <Link to={`/dashboard-event-tickets/${eventData.id}`} >
        <button className="loginButton" type="button" >
          <span>Manage tickets</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default EventInfoComponent;
