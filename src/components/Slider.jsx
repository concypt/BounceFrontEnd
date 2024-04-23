import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
            <div className="sliderlast_div">
                <div className="name_div">
                    <img src="images/blank.png " alt="" />
                    <div className="slider_text">
                        <h6>Name Surname</h6>
                        <p>Position, Company name</p>
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
            <div className="sliderlast_div">
                <div className="name_div">
                    <img src="images/blank.png " alt="" />
                    <div className="slider_text">
                        <h6>Name Surname</h6>
                        <p>Position, Company name</p>
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
            <div className="sliderlast_div">
                <div className="name_div">
                    <img src="images/blank.png " alt="" />
                    <div className="slider_text">
                        <h6>Name Surname</h6>
                        <p>Position, Company name</p>
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
            <div className="sliderlast_div">
                <div className="name_div">
                    <img src="images/blank.png " alt="" />
                    <div className="slider_text">
                        <h6>Name Surname</h6>
                        <p>Position, Company name</p>
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
            <div className="sliderlast_div">
                <div className="name_div">
                    <img src="images/blank.png " alt="" />
                    <div className="slider_text">
                        <h6>Name Surname</h6>
                        <p>Position, Company name</p>
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
