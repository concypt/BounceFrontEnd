import React, { useRef, useState } from "react";
import Reveal from "./utils/Reveal.jsx";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./partySlider.module.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default function PartySlider() {
  return (
    <Reveal width="100%" delay="0.9">
      <div className={styles.partyImagesWrapper}>
        <div className={styles.partyImagesContainer}>
          <div className={styles.partyImages}>
            <img src="images/party.jpg" className="img1" alt="" />
            <img src="images/part2.jpg" className="img2" alt="" />
            <img src="images/party3.jpg" className="img3" alt="" />
            <img src="images/party4.jpg" className="img4" alt="" />
            <img src="images/party5.jpg" className="img5" alt="" />
            <img src="images/party6.jpg" className="img6" alt="" />
          </div>
          <div className={styles.partyImages}>
            <img src="images/party.jpg" className="img1" alt="" />
            <img src="images/part2.jpg" className="img2" alt="" />
            <img src="images/party3.jpg" className="img3" alt="" />
            <img src="images/party4.jpg" className="img4" alt="" />
            <img src="images/party5.jpg" className="img5" alt="" />
            <img src="images/party6.jpg" className="img6" alt="" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
