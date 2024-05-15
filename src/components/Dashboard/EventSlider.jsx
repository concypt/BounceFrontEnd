import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./eventslider.module.css";
// import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

// images
import staticCard from "../../assets/images/staticCard.png";

const EventSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={50}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },

          1280: {
            slidesPerView: 3,
          },

          1400: {
            slidesPerView: 4,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        <SwiperSlide className={styles.eventSlide}>
          <div className={styles.swiperCard}>
            <img src={staticCard} alt="" />
            <div className={styles.cardBody}>
              <h3>Pendulum LIVE</h3>
              <p>24/02/2024</p>
              <p>The O2 Arena, London</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.eventSlide}>
          {" "}
          <div className={styles.swiperCard}>
            <img src={staticCard} alt="" />
            <div className={styles.cardBody}>
              <h3>Pendulum LIVE</h3>
              <p>24/02/2024</p>
              <p>The O2 Arena, London</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.eventSlide}>
          {" "}
          <div className={styles.swiperCard}>
            <img src={staticCard} alt="" />
            <div className={styles.cardBody}>
              <h3>Pendulum LIVE</h3>
              <p>24/02/2024</p>
              <p>The O2 Arena, London</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.eventSlide}>
          {" "}
          <div className={styles.swiperCard}>
            <img src={staticCard} alt="" />
            <div className={styles.cardBody}>
              <h3>Pendulum LIVE</h3>
              <p>24/02/2024</p>
              <p>The O2 Arena, London</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.eventSlide}>
          {" "}
          <div className={styles.swiperCard}>
            <img src={staticCard} alt="" />
            <div className={styles.cardBody}>
              <h3>Pendulum LIVE</h3>
              <p>24/02/2024</p>
              <p>The O2 Arena, London</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default EventSlider;
