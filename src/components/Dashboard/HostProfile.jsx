import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from ".././events.module.css";
import stylesDash from "./dashboard.module.css";

const URL = "https://bounce.extrasol.co.uk/api/host/profile/21";

const HostProfile = ({ limit }) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setProfile(jsonData.data); // Set the parsed JSON data as the events state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      ) : profile.length === 0 ? (
        <div>No events available</div>
      ) : (
        <div className="bounce_bg_circle">
          <div className="container-fluid">
            <Navbar />
            {profile.name
              ? profile.name
              : profile.first_name + " " + profile.last_name}
            {/* Loop through each event in the host's data array */}
            {profile.events.data.map((event) => (
              <div key={event.id}>
                <h3>{event.name}</h3>
                <p>Type: {event.type}</p>
                {/* Render other event details here */}
              </div>
            ))}
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostProfile;
