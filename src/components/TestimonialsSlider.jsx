import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

//images
import starImage from "../assets/images/star.svg";
import staremptyImage from "../assets/images/star-empty.svg";

export default function TestimonialsSlider(props) {
  const { reviews } = props;
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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="swiper_slide">
              <div className="slider_content">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <img
                      key={index}
                      src={index < review.rating ? starImage : staremptyImage}
                      alt={`Star ${index + 1}`}
                    />
                  ))}
                </div>
                <p>{review.description}</p>
                <div className="sliderlast_div">
                  <div className="name_div">
                    <img src={review.image} alt="" />
                    <div className="slider_text">
                      <h6>{review.name}</h6>
                      <p>{review.position}</p>
                    </div>
                    <div className="webflow_img">
                      <img src={review.logo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

TestimonialsSlider.propTypes = {
  reviews: PropTypes.array.isRequired,
};
