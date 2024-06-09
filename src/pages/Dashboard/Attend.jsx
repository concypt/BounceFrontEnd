import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import moment from 'moment';
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EventSlider from "../../components/Dashboard/EventSlider";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

// images
import emptyState from "../../assets/images/emptystate.svg";

const URL = "https://bounce.extrasol.co.uk/api/user/event-liked";
let config = {
  
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const fetchEventData = async () => {
  const { data } = await axios.get(URL, config).then((res) => res.data);
  return data;
};

  function Attend() {
    const {
      data: events,
      error,
      isLoading,
    } = useQuery({
      queryKey: ["eventsDataFetch"],
      queryFn: fetchEventData,
    });
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (isLoading)
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!events) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 10 : 0}
      />
    );
  }
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
      {events.upcoming.length > 0 ? (
        <div className="upcomingEvents">
          <div className="upcomingDiv">
            <h2>Upcoming Events</h2>
            <button className="loginButton" type="submit">
              <span>Browse All Events</span>
            </button>
          </div>
          <EventSlider events={events.upcoming} />
        </div>
        ) : (
        <div className="upcomingEvents">
          <div className="upcomingDiv">
            <h2>Upcoming Events</h2>
          </div>
          <div className="emptyContent">
            <img src={emptyState} alt="" />
            <h2>No upcoming events :(</h2>
            <p>
              Browse events that are currently live on Bounce to find your next
              motive.
            </p>
            <button className="loginButton" type="submit">
              <span>Let’s go!</span>
            </button>
          </div>
        </div>
        )}
        <div className="likedEvents">
          
          
      {events.liked.length > 0 ? (
        <div className="upcomingEvents">
            <div className="upcomingDiv">
              <h2>Liked Events</h2>
            </div>
            <EventSlider events={events.liked} />
            </div>
      ) : (
        <div className="upcomingEvents">
        <div className="emptyContent">
            <img src={emptyState} alt="" />
            <h2>No Liked events :(</h2>
          </div>
          </div>
          
      )}
      {events.unlikeevents.length > 0 ? (
          <div className="upcomingEvents">
            <div className="upcomingDiv">
              <h2>Events you may like</h2>
            </div>
            <EventSlider events={events.unlikeevents} />
          </div>
           ) : (
            <div className="upcomingEvents">
            <div className="emptyContent">
                <img src={emptyState} alt="" />
                <h2>No events available:(</h2>
              </div>
              </div>    
          )}
        </div>
      </div>
      </div>
  );
}

export default Attend;

