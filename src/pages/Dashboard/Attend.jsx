import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EventSlider from "../../components/Dashboard/EventSlider";
import LoadingBar from "react-top-loading-bar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchEventData } from "../../api/secureService";
import emptyState from "../../assets/images/emptystate.svg";

function Attend() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Set loading complete to true when the page has finished loading
  window.onload = () => {
    setLoadingComplete(true);
  };
  const {
    data: events,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventsDataFetch"],
    queryFn: fetchEventData,
  });

  if (isLoading) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>

      <div className="dataTables">
        {events?.upcoming?.length > 0 ? (
          <div className="upcomingEvents row-one">
            <div className="upcomingDiv">
              <h2>Upcoming Events</h2>
              <Link to="/events?page=1">
              <button className="loginButton" type="submit">
              <span>Browse All Events</span>
               </button>
               </Link>
            </div>
            <EventSlider events={events.upcoming} slides="4" />
          </div>
        ) : (
          <div className="upcomingEvents row-two">
            <div className="upcomingDiv">
              <h2>Upcoming Events</h2>
            </div>
            <div className="emptyContent">
              <img src={emptyState} alt="" />
              <h2>No upcoming events :(</h2>
              <p>
                Browse events that are currently live on Bounce to find your
                next motive.
              </p>
              <button className="loginButton" type="submit">
                <span>Let’s go!</span>
              </button>
            </div>
          </div>
        )}
        <div className="likedEvents">
          {events?.liked?.length > 0 ? (
            <div className="upcomingEvents row-two">
              <div className="upcomingDiv">
                <h2>Liked Events</h2>
              </div>
              <EventSlider events={events.liked} slides="2" />
            </div>
          ) : (
            <div className="upcomingEvents">
              <div className="emptyContent">
                <img src={emptyState} alt="" />
                <h2>No Liked events :(</h2>
              </div>
            </div>
          )}
          {events?.unlikeevents?.length > 0 ? (
            <div className="upcomingEvents row-two">
              <div className="upcomingDiv">
                <h2>Events you may like</h2>
              </div>
              <EventSlider events={events.unlikeevents} slides="2" />
            </div>
          ) : (
            <div className="upcomingEvents">
              <div className="emptyContent">
                <img src={emptyState} alt="" />
                <h2>No events available :(</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attend;
