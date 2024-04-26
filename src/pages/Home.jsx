import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import EventList from "../components/EventList";


function Home() {
  return (
    <>
      <Navbar />
      <div className="header bounce_bg_circle">
        <div className="header_div">
          <h1>Exclusive live music events brought to you by Bounce.</h1>
          <div className="users">
            <div className="user_imgs">
              <img src="../images/userOne.svg" alt="" />
              <img src="../images/userTwo.svg" alt="" />
              <img src="../images/userThree.svg" alt="" />
              <img src="../images/userFour.svg" alt="" />
              <img src="../images/userFive.svg" alt="" />
              <div className="user_count">
                <p>268+</p>
              </div>
            </div>
          </div>
          <div className="hader_text">
            <p>
              Join hundreds of others and immerse yourself in captivating
              performances. Fill up your cup and embrace rhythmic bliss with
              friends.
            </p>
          </div>
          <div className="header_btn">
            <a href="#" className="global_button_one">
              {" "}
              <span>Browse events</span>
            </a>
          </div>
        </div>
        <div className="party_imgs">
          <img src="images/party.jpg" className="img1" alt="" />
          <img src="images/part2.jpg" className="img2" alt="" />
          <img src="images/party3.jpg" className="img3" alt="" />
          <img src="images/party4.jpg" className="img4" alt="" />
          <img src="images/party5.jpg" className="img5" alt="" />
          <img src="images/party6.jpg" className="img6" alt="" />
        </div>
      </div>

      <div className="event_div">
        <div className="event_heading">
          <h2>Featured Events</h2>
        </div>
        <div className="home_events">
          <EventList limit={3} />
        </div>
      </div>

      <div className="slider_section">
        <div className="swiper_div">
          <Slider />
        </div>
      </div>
      <div className="promote_section">
        <div className="promote_div">
          <img src="images/promote_img.png" alt="" />
          <div className="promote_content">
            <h2>Promote events. Get paid</h2>
            <div className="checks">
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>
                  It’s simple to get started. Sign up to an account and with one
                  click send a request to event hosts to promote their event.
                </p>
              </div>
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>
                  Once approved, your special link goes live! Invite your
                  friends using your link and if they checkout, you get paid a
                  small portion of their ticket sale!
                </p>
              </div>
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>
                  Get rewarded and increase your earnings by promoting events on
                  Bounce, today.
                </p>
              </div>
            </div>
            <div className="promote_btn">
              <a href="#" className="global_button_one">
                {" "}
                <span>Create an account</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="promote_section promote_second">
        <div className="promote_div">
          <img src="images/promote_img2.png" alt="" />
          <div className="promote_content">
            <h2>Sell tickets on Bounce!</h2>
            <div className="checks">
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>The all in one ticketing platform that keeps i t simple.</p>
              </div>
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>
                  To get started, we just need a few details from yourself. Once
                  approved, you’re ready to sell out your event on Bounce.
                </p>
              </div>
              <div className="promote_checks">
                <img src="images/tick.svg" alt="" />
                <p>
                  With a generous industry beating 7.5% fee, you can rely on
                  Bounce to bring you simple, intuitive ticketing solutions for
                  your event brand.
                </p>
              </div>
            </div>
            <div className="promote_btn">
              <a href="" className="global_button_one">
                {" "}
                <span>Discover more</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="promote_section blank_section">
        <div className="promote_div">
          <img src="images/blank.png" className="blank_img" alt="" />
          <div className="blank_grid">
            <div className="grid_block">
              .
              <img src="images/block.svg" alt="" />
              <h3>Short heading here</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <a href="#">
                Button{" "}
                <img
                  src="images/right_arrow.svg"
                  className="arrow_right"
                  alt=""
                />
              </a>
            </div>
            <div className="grid_block">
              .
              <img src="images/block.svg" alt="" />
              <h3>Short heading here</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <a href="#">
                Button{" "}
                <img
                  src="images/right_arrow.svg"
                  className="arrow_right"
                  alt=""
                />
              </a>
            </div>
            <div className="grid_block">
              .
              <img src="images/block.svg" alt="" />
              <h3>Short heading here</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <a href="#">
                Button{" "}
                <img
                  src="images/right_arrow.svg"
                  className="arrow_right"
                  alt=""
                />
              </a>
            </div>
            <div className="grid_block">
              .
              <img src="images/block.svg" alt="" />
              <h3>Short heading here</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
              <a href="#">
                Button{" "}
                <img
                  src="images/right_arrow.svg"
                  className="arrow_right"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion_section">
        <div className="faqs">
          <h2>FAQs</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="faq_accordians">
          <ul>
            <div className="accordian_main" id="5">
              <li className="question que5">
                <span>How do I use Bounce?</span>
                <div className="expand-bar"></div>
              </li>
              <li className="answer ans5">
                Get started on Bounce by signing up and creating your account.
                Join a vibrant community of event creators and attendees,
                leveraging Bounce’s user-friendly platform to effortlessly
                manage, promote, and sell your event tickets. With advanced
                tools for email marketing, and streamlined event management,
                Bounce is your all-in-one solution to boost ticket sales and
                elevate your event business. Discover the simplicity and power
                of Bounce for a seamless event planning experience!
              </li>
            </div>
            <div className="accordian_main" id="1">
              <li className="question que1" id="question">
                <span>
                  How do I get started selling tickets online for free?
                </span>
                <div className="expand-bar"></div>
              </li>
              <li className="answer ans1">
                To begin selling tickets online for free, simply kickstart your
                event on Bounce. Our platform offers a seamless experience in
                crafting, advertising, and overseeing your event without any
                cost. Dive in effortlessly to start selling your event tickets
                hassle-free!{" "}
              </li>
            </div>
            <div className="accordian_main" id="2">
              <li className="question que2">
                <span>
                  Can I offer discounts or promo codes on event tickets?
                </span>
                <div className="expand-bar"></div>
              </li>
              <li className="answer ans2 ">
                {" "}
                Yes! You can boost your ticket sales by offering discounts or
                promo codes. With Bounce’s ticket management tools, you can
                easily create tickets and provide discounts to encourage more
                people to buy them. These promo codes also help you track how
                well your online ads are performing and figure out which
                customer groups are spreading the word about your event. It’s
                like giving a special offer to your audience while also keeping
                track of how effective your marketing efforts are!
              </li>
            </div>
            <div className="accordian_main" id="3">
              <li className="question que3">
                <span>How do I create multiple ticket types on Bounce?</span>
                <div className="expand-bar"></div>
              </li>
              <li className="answer ans3">
                On Bounce, creating multiple ticket types is straightforward.
                You have the flexibility to set up various ticket options like
                Early Bird, VIP, or any other category that fits your event.
                This helps you cater to different preferences and budgets,
                enticing more people to purchase tickets based on their desired
                experience.
              </li>
            </div>
            <div className="accordian_main" id="4">
              <li className="question que4">
                <span>
                  Can I sell tickets online for a charity event on Bounce?
                </span>
                <div className="expand-bar"></div>
              </li>
              <li className="answer ans4">
                Absolutely! Bounce is a fantastic platform for selling tickets
                for charity events. Through our dedicated feature called “Bounce
                for Nonprofits,” you can expand your audience, increase event
                attendance, and successfully reach your fundraising objectives
                using our advanced online ticketing system.
              </li>
            </div>
          </ul>
        </div>

        <div className="faq_content">
          <h3>Still have a question?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="#" className="global_button_one">
            {" "}
            <span>Contact</span>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
