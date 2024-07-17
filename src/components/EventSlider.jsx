// core version + navigation, pagination modules:
import PropTypes from "prop-types";

import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import styles from "./eventSlider.module.css";

register();

// Install Swiper modules

const EventSlider = ({ galleryImages }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
      console.log(swiper);
    });
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="1"
      navigation="true"
      pagination="true"
    >
      {galleryImages.map((image, index) => (
        <swiper-slide key={index}>
          <div
            className={styles.gimageWrapper}
            style={{ "--background-image": `url(${image})` }}
          >
            <img className={styles.gimage} src={image} alt="" />
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};
EventSlider.propTypes = {
  galleryImages: PropTypes.array,
};
export default EventSlider;
