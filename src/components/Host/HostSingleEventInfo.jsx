import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
import { fetchEventDetails } from "../../api/secureService";

import calendarIcon from "../../assets/images/calender.svg";
import clockIcon from "../../assets/images/clock_grey.svg";
import locationIcon from "../../assets/images/location_grey.svg";

const EventInfoComponent = ({ eventId }) => {
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchEventDetails(eventId),
    queryKey: ["EventInfo", eventId],
    enabled: !!eventId, // Ensure eventId is truthy before making the request
  });
  if (isLoading) {
    return <LoadingBar color="#7e79ff" height={3} progress={10} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
          {eventData.start_time}
        </p>
        <p>
          <img src={clockIcon} className="descriptionImg" alt="" /> 5PM
        </p>
        <p>
          <img src={locationIcon} className="descriptionImg" alt="" />{" "}
          {eventData.address ? eventData.address : "No location Entered"}
        </p>
      </div>
      <div className="singleEventBtn">
        <button className="loginButton" type="button">
          <span>Edit event</span>
        </button>
        <button className="loginButton" type="button">
          <span>Manage tickets</span>
        </button>
      </div>
    </div>
  );
};

export default EventInfoComponent;
