import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FollowUnfollowBtn from "../components/FollowUnfollowBtn";
import styles from "../components/events.module.css";
import LoadingBar from "react-top-loading-bar";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://bounce.extrasol.co.uk/api/attenders/event-detail/${eventId}`
        );

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

    if (token) {
      setIsLoggedIn(true);
    }
  }, [eventId, token]);

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
  let netPrice = 0;
  let adminFee = 0;
  if (event.ticket && event.ticket.length > 0 && event.ticket[0].price) {
    const adminPercentage = (100 - event.org_commission) / 100;
    netPrice = event.ticket[0].price / (1 + adminPercentage);
    adminFee = event.ticket[0].price - netPrice;
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
                        }}
                      >
                        {event.organisation.first_name +
                          " " +
                          event.organisation.last_name}
                      </Link>
                      <p>{event.organisation.followers.length} followers</p>
                    </div>
                  </div>
                  <FollowUnfollowBtn />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
