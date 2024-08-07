import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EventSlider from "../../components/Dashboard/EventSlider";
import LoadingBar from "react-top-loading-bar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchEventData } from "../../api/secureService";
import emptyState from "../../assets/images/emptystate.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Attend() {
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
      <div className="dashboard">
        <div>
          <Header />
          <Sidebar />
        </div>
        <div className="dataTables">
          <div className="upcomingEvents row-one">
            <div className="upcomingDiv">
              <h2>
                <Skeleton width={320} />
              </h2>
              <Skeleton width={250} height={40} borderRadius={20} />
            </div>
            <div className="px-5">
              <Skeleton height={500} borderRadius={20} />
            </div>
          </div>
          <div className="likedEvents">
            <div className="upcomingEvents row-two">
              <div className="upcomingDiv">
                <h2>
                  <Skeleton width={300} />
                </h2>
              </div>
              <div className="px-5">
                <Skeleton height={300} borderRadius={20} />
              </div>
            </div>
            <div className="upcomingEvents row-two">
              <div className="upcomingDiv">
                <h2>
                  <Skeleton width={400} />
                </h2>
              </div>
              <div className="px-5">
                <Skeleton height={300} borderRadius={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div>
          <Header />
          <Sidebar />
        </div>
        <div className="dataTables">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
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
                <button className="loginButton" type="button">
                  <span>Browse all events</span>
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
              <img src={emptyState} alt="No upcoming events" />
              <h2>No upcoming events :(</h2>
              <p>
                Browse events that are currently live on Bounce to find your
                next motive.
              </p>
              <Link to={"/events?page=1"} className="loginButton" type="button">
                <span>Let’s go!</span>
              </Link>
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
                <img src={emptyState} alt="No liked events" />
                <h2>No liked events :(</h2>
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
                <img src={emptyState} alt="No events available" />
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
