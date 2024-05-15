//import React, { useEffect, useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EventSlider from "../../components/Dashboard/EventSlider";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

// images
import emptyState from "../../assets/images/emptystate.svg";

function Attend() {
  // Sample data

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="upcomingEvents">
          <div className="upcomingDiv">
            <h2>Upcoming Events</h2>
            <button className="loginButton" type="submit">
              <span>Browse All Events</span>
            </button>
          </div>
          <EventSlider />
        </div>
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
        <div className="likedEvents">
          <div className="upcomingEvents">
            <div className="upcomingDiv">
              <h2>Liked Events</h2>
            </div>
            <EventSlider />
          </div>
          <div className="upcomingEvents">
            <div className="upcomingDiv">
              <h2>Events you may like</h2>
            </div>
            <EventSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Attend;
