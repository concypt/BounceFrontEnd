import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from 'moment';
import styles from "./eventslider.module.css";
// import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

// images
import staticCard from "../../assets/images/staticCard.png";

const EventSlider = (props) => {
  const { events } = props;
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
        {events.map(event => (
        <SwiperSlide className={styles.eventSlide}>
          <div className={styles.swiperCard}>
            <img src={event.image} alt="" />
            <div className={styles.cardBody}>
              <h3>{event.name}</h3>
              <p>{event.start_time}</p>
              <p>{event.location}</p>
            </div>
          </div>
        </SwiperSlide>
        ))}
        
    
      </Swiper>
    </>
  );
};
export default EventSlider;

