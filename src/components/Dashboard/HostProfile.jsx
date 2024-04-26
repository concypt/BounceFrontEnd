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
            <div className={styles.hostProfile}>
              <div className={styles.profilePath}>
                <img src={profile.imagePath} alt="" />
                <h1>
                  {profile.name
                    ? profile.name
                    : profile.first_name + " " + profile.last_name}
                </h1>
              </div>
              <div className={styles.hostCard}>
                <div className="row">
                  <div className="col-lg-6">
                    <h2>About</h2>
                    <p className={styles.hostText}>
                      Here is a bio about GVO Events.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <h2>Followers</h2>
                    <div className={`users ${styles.hostUser}`}>
                      <div className="user_imgs">
                        <img src="../images/userOne.svg" alt="" />
                        <img src="../images/userTwo.svg" alt="" />
                        <img src="../images/userThree.svg" alt="" />
                        <img src="../images/userFour.svg" alt="" />
                        <img src="../images/userFive.svg" alt="" />
                        <div className="user_count">
                          <p>268+</p>
                        </div>
                      </div>
                    </div>
                    <div className="header_btn">
                      <a
                        href="#"
                        className={`global_button_one ${styles.followBtn}`}
                      >
                        {" "}
                        <span>Follow</span>
                      </a>
                    </div>
                    <p className={styles.hostText}>
                      Follow to receive the latest updates and new event
                      announcements by email!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Check if events exists before mapssping over them */}
          </div>
          <div className={styles.gvoEvents}>
            <div className={styles.eventsGrid}>
              {profile.events &&
                profile.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HostProfile;
