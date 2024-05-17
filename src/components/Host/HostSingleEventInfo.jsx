import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";
// import { format, parseISO } from "date-fns";
const EventInfoComponent = ({ eventId }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://bounce.extrasol.co.uk/api/user/event-edit/${eventId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response=>", response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        // console.log("responseData", responseData);
        setEventData(responseData.data.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  useEffect(() => {
    console.log("eventData updated=>", eventData);
  }, [eventData]);

  if (!eventData) {
    return (
      <LoadingBar color="#7e79ff" height={3} progress={setLoading ? 10 : 0} />
    );
  }

  //   const startTime = parseISO(event.start_time);
  //   const formattedDate = format(startTime, "EEEE d MMMM yyyy");
  //   const hours = format(startTime, "h:mm a");

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
          <img src="/images/calender.svg" className="descriptionImg" alt="" />{" "}
          {eventData.start_time}
        </p>
        <p>
          <img src="/images/clock_grey.svg" className="descriptionImg" alt="" />{" "}
          5PM
        </p>
        <p>
          <img
            src="/images/location_grey.svg"
            className="descriptionImg"
            alt=""
          />{" "}
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
