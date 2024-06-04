import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import TestimonialsSlider from "../components/TestimonialsSlider";
import EventList from "../components/EventList";
import Reveal from "../components/utils/Reveal.jsx";
import PartySlider from "../components/PartySlider";
import FAQs from "../components/HomePage/FAQs.jsx";
//images below

import tick from "../assets/images/tick.svg";
import rightArrow from "../assets/images/right_arrow.svg";
import analyticsIcon from "../assets/images/analyticsicon.svg";
import listingsIcon from "../assets/images/listingsicon.svg";
import marketingIcon from "../assets/images/marketingicon.svg";
import secureIcon from "../assets/images/secureicon.svg";
import { Link } from "react-router-dom";

const URL = "/api/attenders/home-content";
let config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  },
};

const fetchHomeData = async () => {
  const { data } = await axios.get(URL, config).then((res) => res.data);
  return data;
};

function Home() {
  const {
    data: home,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
  });

  //const [home, setHomeContent] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Set loading complete to true when the page has finished loading
  window.onload = () => {
    setLoadingComplete(true);
  };

  if (isLoading)
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="header bounce_bg_circle">
        <div className="header_div">
          <Reveal width="100%" delay="0">
            <h1>{home.header.title}</h1>
          </Reveal>
          <Reveal width="100%" delay=".2">
            <div className="users">
              <div className="user_imgs">
                <img src={home.header.user1} alt={home.header.user1.alt} />
                <img src={home.header.user2} alt={home.header.user2.alt} />
                <img src={home.header.user3} alt={home.header.user3.alt} />
                <img src={home.header.user4} alt={home.header.user4.alt} />
                <img src={home.header.user5} alt={home.header.user5.alt} />
                <div className="user_count">
                  <p>{home.header.user_number}+</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="hader_text">
            <Reveal width="100%" delay=".4">
              <p>{home.header.description}</p>
            </Reveal>
          </div>
          <div className="header_btn">
            <Reveal width="100%" delay=".6">
              <Link to="/events" className="global_button_one">
                <span>{home.header.btn}</span>
              </Link>
            </Reveal>
          </div>
        </div>
        <PartySlider
          imagePath1={home.header.img1}
          imagePath2={home.header.img2}
          imagePath3={home.header.img3}
          imagePath4={home.header.img4}
          imagePath5={home.header.img5}
          imagePath6={home.header.img6}
        />
      </div>
      <div className="event_div">
        <Reveal width="100%" delay=".2" amount="1">
          <div className="event_heading">
            <h2>{home.header.event_title}</h2>
          </div>
        </Reveal>
        <Reveal width="100%" delay="0.2">
          <div className="home_events">
            <EventList limit={3} />
          </div>
        </Reveal>
      </div>
      <Reveal width="100%" delay="0.2" amount="0.75">
        <div className="slider_section">
          <div className="swiper_div">
            <TestimonialsSlider reviews={home.reviews} />
          </div>
        </div>
      </Reveal>
      <Reveal width="100%" delay="0.2" amount="0.5">
        <div className="promote_section">
          <div className="promote_div">
            <img src={home.section_three.img1} alt="" />

            <div className="promote_content">
              <h2>{home.section_three.title1}</h2>

              <div className="checks">
                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description1}</p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description2}</p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description3}</p>
                </div>
              </div>

              <div className="promote_btn">
                <Link to="/register" className="global_button_one">
                  <span>{home.section_three.btn1}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal width="100%" delay="0.2" amount="0.5">
        <div className="promote_section promote_second">
          <div className="promote_div">
            <img src={home.section_three.img2} alt="" />

            <div className="promote_content">
              <h2>{home.section_three.title2}</h2>

              <div className="checks">
                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description4}</p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description5}</p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>{home.section_three.description6}</p>
                </div>
              </div>
              <div className="promote_btn">
                <Link to="/about" className="global_button_one">
                  <span>{home.section_three.btn2}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay=".2" width="100%">
        <div className="promote_section blank_section">
          <div className="promote_div">
            <img
              src={home.section_four.img}
              className="blank_img"
              alt="Bounce App"
            />
            <div className="blank_grid">
              <div className="grid_block">
                <img src={analyticsIcon} alt="Analytics" />
                <h3>{home.section_four.title1}</h3>
                <p>{home.section_four.description1}</p>
                {/* <a href="#">
                  {home.section_four.btn}{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a> */}
              </div>
              <div className="grid_block">
                <img src={marketingIcon} alt="Marketing" />
                <h3>{home.section_four.title2}</h3>
                <p>{home.section_four.description2}</p>
                {/* <a href="#">
                  {home.section_four.btn}{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a> */}
              </div>
              <div className="grid_block">
                <img src={listingsIcon} alt="Listings" />
                <h3>{home.section_four.title3}</h3>
                <p>{home.section_four.description3}</p>
                {/* <a href="#">
                  {home.section_four.btn}{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a> */}
              </div>
              <div className="grid_block">
                <img src={secureIcon} alt="Secure" />
                <h3>{home.section_four.title4}</h3>
                <p>{home.section_four.description4}</p>
                {/* <a href="#">
                  {home.section_four.btn}{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <div className="accordion_section">
        <Reveal delay=".2" width="100%">
          <div className="faqs">
            <h2>{home.section_four.faq_title}</h2>
            <p>{home.section_four.faq_description}</p>
          </div>
        </Reveal>
        <Reveal delay=".2" width="100%">
          <FAQs FAQs={home.faqs} />
        </Reveal>
        <Reveal delay=".2" width="100%">
          <div className="faq_content">
            <h3>{home.section_four.contact_title}</h3>
            <p>{home.section_four.contact_description}</p>
            <Link to="/contact" className="global_button_one">
              <span>{home.section_four.contact_btn}</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}

export default Home;
