import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEventDetails } from "../api/publicService";
import LoadingBar from "react-top-loading-bar";
import FollowUnfollowBtn from "./FollowUnfollowBtn";
import PropTypes from "prop-types";
import styles from "./singleEvent.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";

//images
import calendarImage from "../assets/images/calender.svg";
import clockImage from "../assets/images/clock_grey.svg";
import locationImage from "../assets/images/location_grey.svg";
import LikeToggleBtn from "./LikeToggleBtn";
import EventTickets from "./EventTickets";

const SingleEvent = () => {
  const { eventId } = useParams();
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Set loading complete to true when the page has finished loading
  window.onload = () => {
    setLoadingComplete(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    data: event,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: () => fetchEventDetails(eventId),
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
    return <p>Errors: {error.message}</p>;
  }

  let netPrice = 0;
  let adminFee = 0;
  if (event.ticket && event.ticket.length > 0 && event.ticket[0].price) {
    const adminPercentage = (100 - event.org_commission) / 100;
    netPrice = event.ticket[0].price / (1 + adminPercentage);
    adminFee = event.ticket[0].price - netPrice;
  }

  return (
    <>
      <div className={`${styles.event_detail} bounce_bg_circle`}>
        <div className={"custom-wrapper"}>
          <div className={styles.event_main_img}>
            <img
              className={styles.eventImg}
              src={event.image}
              alt="San Francisco"
            />
            <div className={styles.category_main}>
              <h5 className={styles.category_name}>{event.category.name}</h5>
            </div>
            <LikeToggleBtn eventId={event.id} />
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-7">
              <div className={styles.details}>
                <h2>{event.name}</h2>
                <div className={styles.event_detail_card}>
                  <div className={styles.event_circle_img}>
                    {/* <p className={styles.image_path}>
                      {event.organisation.imagePath}
                    </p> */}
                    <img src={event.organisation.imagePath} />
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
                  <FollowUnfollowBtn organisationId={event.organisation.id} />
                </div>
                <div className={styles.cart_description}>
                  <p className={styles.event_date}>
                    <img
                      src={calendarImage}
                      className={styles.description_img}
                      alt=""
                    />{" "}
                    {event.date}
                  </p>
                  <p>
                    {" "}
                    <img
                      src={clockImage}
                      className={styles.description_img}
                      alt=""
                    />{" "}
                    {moment(event.start_time).format("HH:mm:ss")}
                  </p>
                  <p>
                    {" "}
                    <img
                      src={locationImage}
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
                  <div className={styles.description}>{event.description}</div>
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
                    <button
                      type="button"
                      href="#"
                      className="global_button_one"
                      onClick={toggleModal}
                    >
                      <span>Secure your ticket</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className={styles.details}>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EventTickets eventId={eventId} toggleModal={toggleModal} />
      )}
    </>
  );
};

SingleEvent.propTypes = {
  eventId: PropTypes.string,
};
export default SingleEvent;
