import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Eventliset from "../components/EventList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../components/events.module.css";
import LoadingBar from "react-top-loading-bar";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const URL = "https://bounce.extrasol.co.uk/api/attenders/event-detail";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${URL}/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        setEvent(eventData.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoadingComplete(true);
      }
    };

    fetchEventDetails();

    // Check if user is logged in by verifying if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [eventId]);

  const toggleFollow = async (organizationId) => {
    try {
      // Construct the URL with the organizationId
      const url = `https://bounce.extrasol.co.uk/api/user/add-followList/${organizationId}`;

      // Make the GET request to toggle follow status
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token in header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle follow status");
      }

      // Assuming the response from the API indicates success
      return Promise.resolve();
    } catch (error) {
      // Handle error cases
      return Promise.reject(error);
    }
  };

  const handleFollow = () => {
    if (isLoggedIn) {
      // User is logged in, perform follow/unfollow operation
      // Make API call with authorization token in header
      // Assuming toggleFollow function handles follow/unfollow logic
      toggleFollow(event.organisation.id)
        .then(() => {
          // Update button text based on follow/unfollow action
          setIsFollowing((prev) => !prev);
          // Show success alert
          Swal.fire({
            icon: "success",
            title: !isFollowing
              ? "Followed successfully!"
              : "Unfollowed successfully!",
            showConfirmButton: false,
            timer: 1500, // Auto close the alert after 1.5 seconds
          });
        })
        .catch((error) => {
          // Handle API call error
          console.error("Toggle follow API error:", error);
          // Show error alert
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    } else {
      // User is not logged in, store current page in local storage and redirect to login
      localStorage.setItem("redirectEventPage", window.location.pathname);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  if (!event) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
    );
  }

  // Assuming $setting and $item are objects with properties org_commission and price respectively
  if (event.ticket && event.ticket.length > 0 && event.ticket[0].price) {
    const adminPercentage = (100 - event.org_commission) / 100;
    const netPrice = event.ticket[0].price / (1 + adminPercentage);
    const adminFee = event.ticket[0].price - netPrice;
  }

  return (
    <>
      <Navbar />
      <div className={`${styles.event_detail} bounce_bg_circle`}>
        <div className={styles.event_detail_content}>
          <div className={styles.event_main_img}>
            <img
              className={styles.eventImg}
              src={event.image}
              alt="San Francisco"
            />
            <div className={styles.category_main}>
              <h5 className={styles.category_name}>{event.category.name}</h5>
            </div>
            <div className={styles.heart_icon}>
              <img src="/images/heart.svg" alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-7">
              <div className={styles.details}>
                <h2>{event.name}</h2>
                <div className={styles.event_detail_card}>
                  <div className={styles.event_circle_img}>
                    <p className={styles.image_path}>
                      {event.organisation.imagePath}
                    </p>
                    <img src="http://bounce.extrasol.co.uk/images/upload/defaultuser.png" />
                    <div className={styles.card_text}>
                      <Link
                        to={{
                          pathname: `/host-profile/${event.organisation.id}`,
                          state: { isFollowing: isFollowing },
                        }}
                      >
                        {event.organisation.first_name +
                          " " +
                          event.organisation.last_name}
                      </Link>
                      <p>{event.organisation.followers.length} followers</p>
                    </div>
                  </div>
                  <div className={styles.follow_div}>
                    <button
                      className={`${styles.follow_btn} bgGlobalBtn borderGlobalBtn`}
                      onClick={handleFollow}
                    >
                      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
                    </button>
                  </div>
                </div>
                <div className={styles.cart_description}>
                  <p className={styles.event_date}>
                    <img
                      src="/images/calender.svg"
                      className={styles.description_img}
                      alt=""
                    />{" "}
                    {event.date}
                  </p>
                  <p>
                    {" "}
                    <img
                      src="/images/clock_grey.svg"
                      className={styles.description_img}
                      alt=""
                    />{" "}
                    {moment(event.start_time).format("HH:mm:ss")}
                  </p>
                  <p>
                    {" "}
                    <img
                      src="/images/location_grey.svg"
                      className={styles.description_img}
                      alt=""
                    />{" "}
                    {event.address}
                  </p>
                </div>
                <div className={styles.hashtags}>
                  {event.hasTag &&
                    event.hasTag.length > 0 &&
                    event.hasTag.map((tag, index) => (
                      <span key={index}>{tag} </span>
                    ))}
                </div>

                <div className={styles.description_heading}>
                  <h2>About the event</h2>
                  <p>Description: {event.description}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              <div className={styles.details}>
                <div className={styles.ticket_detail}>
                  <h3>Tickets available</h3>

                  {/* <p>Starting from {event.ticket[0].price} + £1.80 fee</p> */}
                  {event.ticket &&
                    event.ticket.length &&
                    (event.ticket[0].absorbe_fees === 0 ? (
                      <>
                        £ {netPrice.toFixed(2)}
                        <p className="fee_text">+ £{adminFee.toFixed(2)} Fee</p>
                      </>
                    ) : (
                      <>£ {event.ticket[0].price}</>
                    ))}

                  <div className="header_btn">
                    <a href="#" className="global_button_one">
                      <span>Secure your ticket</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.ticket_detail}>
                  <h3>Promote this event</h3>
                  <p className={styles.ticket_text}>
                    Earn 10% of every ticket <br /> purchased through your link.
                  </p>
                  <div className="header_btn">
                    <a href="#" className="global_button_one">
                      <span>Request my link</span>
                    </a>
                  </div>

                  {/* <p>{event.ticket[0].price}</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* Add more event details as needed */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
