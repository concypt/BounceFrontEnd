import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Eventliset from "../components/EventList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../components/events.module.css";
import moment from "moment";

const URL = "https://bounce.extrasol.co.uk/api/attenders/event-detail";

const EventDetail = () => {
  const { eventId } = useParams();
  // console.log("Event ID:", eventId);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details based on eventId
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${URL}/${eventId}`); // Corrected URL construction
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        setEvent(eventData.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className={`${styles.event_detail} bounce_bg_circle`}>
        <div className={styles.event_detail_content}>
          <div className={styles.event_main_img}>
            <img
              className={styles.eventImg}
              src="https://images.unsplash.com/photo-1584391889471-9603788c366c"
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
            <div className="col-6">
              <div className={styles.details}>
                <h2>{event.name}</h2>
                <div className={styles.event_detail_card}>
                  <div className={styles.event_circle_img}>
                    <p className={styles.image_path}>
                      {event.organisation.imagePath}
                    </p>
                    <img
                      src="http://bounce.extrasol.co.uk/images/upload/defaultuser.png
"
                    />
                    <div className={styles.card_text}>
                      <a href="#">
                        {event.organisation.first_name +
                          " " +
                          event.organisation.last_name}
                      </a>
                      <p>{event.organisation.followers.length} followers</p>
                    </div>
                  </div>
                  <div className={styles.follow_div}>
                    <a
                      className={`${styles.follow_btn} bgGlobalBtn borderGlobalBtn`}
                      href=""
                    >
                      <span>Follow</span>
                    </a>
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
                  {event.hasTag.map((tag, index) => (
                    <span key={index}>{tag} </span>
                  ))}
                </div>
                <div className={styles.description_heading}>
                  <h2>About the event</h2>
                  <p>Description: {event.description}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={styles.details}>
                <div className={styles.ticket_detail}>
                  <h3>Tickets available</h3>
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
