import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventCard from "./EventCard";
import FollowUnfollowBtn from "./FollowUnfollowBtn";
import styles from "./hostProfile.module.css";
import LoadingBar from "react-top-loading-bar";
//images below
import userOne from "../assets/images/userOne.svg";
import userTwo from "../assets/images/userTwo.svg";
import userThree from "../assets/images/userThree.svg";
import userFour from "../assets/images/userFour.svg";
import userFive from "../assets/images/userFive.svg";

const URL = "https://bounce.extrasol.co.uk/api/host/profile";

const HostProfile = ({ limit }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { organisationId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/${organisationId}`);
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
        <LoadingBar
          color="#7e79ff"
          height={3}
          progress={loadingComplete ? 100 : 0}
        />
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
                      {profile.bio ? profile.bio : "No bio found..."}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <h2>Followers</h2>
                    <div className={`users ${styles.hostUser}`}>
                      <div className="user_imgs">
                        <img src={userOne} alt="Picture of Happy Attendee" />
                        <img src={userTwo} alt="Picture of Happy Host" />
                        <img src={userThree} alt="Picture of Happy Attendee" />
                        <img src={userFour} alt="Picture of Happy Attendee" />
                        <img src={userFive} alt="Picture of Happy Host" />
                        <div className="user_count">
                          <p>268+</p>
                        </div>
                      </div>
                    </div>
                    <FollowUnfollowBtn organisationId={profile.id} />
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
