import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EventCard from "../EventCard";
import styles from "./dashboard.module.css";

const URL = "https://bounce.extrasol.co.uk/api/host/profile/21";

const HostProfile = ({ limit }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setProfile(jsonData.data); // Set the parsed JSON data as the profile state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : !profile ? (
        <div>No profile available</div>
      ) : (
        <div className="bounce_bg_circle">
          <div className="container-fluid">
            <Navbar />
            <h2>
              {profile.name
                ? profile.name
                : profile.first_name + " " + profile.last_name}
            </h2>
            <img src={profile.imagePath} alt="" />
            {/* Check if events exists before mapping over them */}
            <div className={styles.eventsGrid}>
              {profile.events &&
                profile.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostProfile;
