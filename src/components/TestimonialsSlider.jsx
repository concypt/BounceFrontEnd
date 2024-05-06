import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//import "../styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default function TestimonialsSlider() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper_slide">
            <div className="slider_content">
              <div className="stars">
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
              </div>
              <p>
                "Bounce truly delivers an electrifying experience! The platform
                seamlessly connects event hosts with eager attendees, fostering
                an atmosphere of inclusivity and excitement. As an avid
                event-goer, I've discovered some of the most thrilling live
                music events through Bounce. Highly recommended!"
              </p>
              <div className="sliderlast_div">
                <div className="name_div">
                  <img src="images/blank.png " alt="" />
                  <div className="slider_text">
                    <h6>Sarah Johnson</h6>
                    <p>Marketing Manager, Groove Productions</p>
                  </div>
                  <div className="webflow_img">
                    <img src="images/webflow.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper_slide">
            <div className="slider_content">
              <div className="stars">
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
              </div>
              <p>
                "Bounce has revolutionized the way we engage with our audience.
                As a host, I've found their platform to be intuitive and
                effective in reaching a diverse demographic. It's been a
                game-changer for us!"
              </p>
              <div className="sliderlast_div">
                <div className="name_div">
                  <img src="images/blank.png " alt="" />
                  <div className="slider_text">
                    <h6>David White</h6>
                    <p>Events Coordinator, Vibe Events</p>
                  </div>
                  <div className="webflow_img">
                    <img src="images/webflow.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper_slide">
            <div className="slider_content">
              <div className="stars">
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
                <img src="images/star.svg" alt="" />
              </div>
              <p>
                "I've had the pleasure of attending numerous events through
                Bounce, and each one has exceeded my expectations. The
                user-friendly interface makes it easy to discover and book
                tickets, and I've never been disappointed. Kudos to the Bounce
                team for creating such a dynamic platform!"
              </p>
              <div className="sliderlast_div">
                <div className="name_div">
                  <img src="images/blank.png " alt="" />
                  <div className="slider_text">
                    <h6>Emily Patel</h6>
                    <p>Creative Director, Pulse Entertainment Group</p>
                  </div>
                  <div className="webflow_img">
                    <img src="images/webflow.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
