import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import styles from "./eventslider.module.css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

//images
import clockIcon from "../../assets/images/clock.svg";
import locationIcon from "../../assets/images/location.svg";
import buyTicketIcon from "../../assets/images/buy-ticket.svg";

const EventSlider = (props) => {
  const { events, slides } = props;
  const qS = parseInt(slides);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },

          1024: {
            slidesPerView: qS === 4 ? 2 : 2,
          },

          1280: {
            slidesPerView: qS === 4 ? 3 : 2,
          },

          1400: {
            slidesPerView: qS,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className={styles.eventSlide}>
            <div
              className={`${styles.eventCard} ${
                qS === 4 ? styles.upcomingEventCard : ""
              }`}
            >
              <div className={styles.eventCardImage}>
                <img
                  className={styles.eventImg}
                  src={event.image}
                  alt="Event image"
                />
                <div className={styles.eventCategoryButton}>
                  {/* {event.category} */}
                  Sports
                </div>
              </div>
              <div className={styles.eventCardDetails}>
                <h2>{event.name}</h2>
                <div className={styles.dateRemainingDaysDiv}>
                  <span className={styles.time}>
                    <img src={clockIcon} alt="" />{" "}
                    {moment(event.start_time).format("YYYY-MM-DD")}
                  </span>
                  <div className={styles.remainingDaysBtn}>
                    <>{event.daysCount}</>
                  </div>
                </div>
                <div className={event.location ? styles.locationDiv : null}>
                  {event.location && (
                    <span className={styles.location}>
                      <img src={locationIcon} alt="" /> {event.location}
                    </span>
                  )}
                </div>

                <div className={styles.ticketsFindMore}>
                  {qS === 4 ? (
                    <div className="bgGlobalBtn borderGlobalBtn" onClick="">
                      <span>View ticket details</span>
                    </div>
                  ) : (
                    <div className="bgGlobalBtn borderGlobalBtn">
                      <span>Find out more</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default EventSlider;
