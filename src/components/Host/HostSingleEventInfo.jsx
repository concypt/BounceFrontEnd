import { useState, useEffect } from "react";
// import { format, parseISO } from "date-fns";
import "../../pages/Dashboard/styles/primaryStyles.css";
import "../../pages/Dashboard/styles/comonStyles.css";

const EventSingleInfo = ({ eventId }) => {
  const [event, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        const data = await response.json();
        setEventData(data.data.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  console.log("event", event);

  if (!event) {
    console.log("No Data Find");
  }

  //   const startTime = parseISO(event.start_time);
  //   const formattedDate = format(startTime, "EEEE d MMMM yyyy");
  //   const hours = format(startTime, "h:mm a");

  return (
    <div className="singleEvent">
      <div className="singleEventHeader">
        {/* <h2>{event.name}</h2> */}
        <a href="#" className="viewAll">
          <span>View event page </span>
        </a>
      </div>
      <div className="cardDescription">
        <p className="event_date">
          <img src="/images/calender.svg" className="descriptionImg" alt="" />{" "}
          {/* {event.start_time} */}
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
          7 Scott Street, London EN12 9GN
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

export default EventSingleInfo;
