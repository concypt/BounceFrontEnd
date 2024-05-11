import TestimonialsSlider from "../components/TestimonialsSlider";
import EventList from "../components/EventList";
import Reveal from "../components/utils/Reveal.jsx";
import PartySlider from "../components/PartySlider";
//images below
import userOne from "../assets/images/userOne.svg";
import userTwo from "../assets/images/userTwo.svg";
import userThree from "../assets/images/userThree.svg";
import userFour from "../assets/images/userFour.svg";
import userFive from "../assets/images/userFive.svg";
import tick from "../assets/images/tick.svg";
import promoteImg from "../assets/images/promote_img.png";
import promoteImg2 from "../assets/images/promote_img2.png";
import blank from "../assets/images/blank.png";
import block from "../assets/images/block.svg";
import rightArrow from "../assets/images/right_arrow.svg";

function Home() {
  return (
    <>
      <div className="header bounce_bg_circle">
        <div className="header_div">
          <Reveal width="100%" delay="0">
            <h1>Exclusive live music events brought to you by Bounce.</h1>
          </Reveal>
          <Reveal width="100%" delay=".2">
            <div className="users">
              <div className="user_imgs">
                <img src={userOne} alt="Picture of Happy Attendee" />
                <img src={userTwo} alt="Picture of Happy Host" />
                <img src={userThree} alt="Picture of Happy Attendee" />
                <img src={userFour} alt="Picture of Happy Attendee" />
                <img src={userFive} alt="Picture of Happy Host" />
                <div className="user_count">
                  <p>268+</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="hader_text">
            <Reveal width="100%" delay=".4">
              <p>
                Join hundreds of others and immerse yourself in captivating
                performances. Fill up your cup and embrace rhythmic bliss with
                friends.
              </p>
            </Reveal>
          </div>
          <div className="header_btn">
            <Reveal width="100%" delay=".6">
              <a href="#" className="global_button_one">
                {" "}
                <span>Browse events</span>
              </a>
            </Reveal>
          </div>
        </div>
        <PartySlider />
      </div>

      <div className="event_div">
        <Reveal width="100%" delay=".2" amount="1">
          <div className="event_heading">
            <h2>Featured Events</h2>
          </div>
        </Reveal>
        <Reveal width="100%" delay="0.2">
          <div className="home_events">
            <div className="custom-wrapper">
              <EventList limit={3} />
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal width="100%" delay="0.2" amount="0.75">
        <div className="slider_section">
          <div className="swiper_div">
            <TestimonialsSlider />
          </div>
        </div>
      </Reveal>
      <Reveal width="100%" delay="0.2" amount="0.5">
        <div className="promote_section">
          <div className="promote_div">
            <img src={promoteImg} alt="" />

            <div className="promote_content">
              <h2>Promote events. Get paid</h2>

              <div className="checks">
                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    It’s simple to get started. Sign up to an account and with
                    one click send a request to event hosts to promote their
                    event.
                  </p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    Once approved, your special link goes live! Invite your
                    friends using your link and if they checkout, you get paid a
                    small portion of their ticket sale!
                  </p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    Get rewarded and increase your earnings by promoting events
                    on Bounce, today.
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
      </Reveal>
      <Reveal width="100%" delay="0.2" amount="0.5">
        <div className="promote_section promote_second">
          <div className="promote_div">
            <img src={promoteImg2} alt="" />

            <div className="promote_content">
              <h2>Sell tickets on Bounce!</h2>

              <div className="checks">
                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    The all in one ticketing platform that keeps i t simple.
                  </p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    To get started, we just need a few details from yourself.
                    Once approved, you’re ready to sell out your event on
                    Bounce.
                  </p>
                </div>

                <div className="promote_checks">
                  <img src={tick} alt="" />
                  <p>
                    With a generous industry beating 7.5% fee, you can rely on
                    Bounce to bring you simple, intuitive ticketing solutions
                    for your event brand.
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
      </Reveal>
      <Reveal delay=".2">
        <div className="promote_section blank_section">
          <div className="promote_div">
            <img src={blank} className="blank_img" alt="" />
            <div className="blank_grid">
              <div className="grid_block">
                <img src={block} alt="" />
                <h3>Analytics Dashboard</h3>
                <p>
                  Gain instant insights into your sales data with our
                  comprehensive analytics dashboard.
                </p>
                <a href="#">
                  Learn more{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a>
              </div>
              <div className="grid_block">
                <img src={block} alt="" />
                <h3>Marketing Tools</h3>
                <p>
                  Effortlessly manage email campaigns and create enticing
                  discounts to boost event attendance.
                </p>
                <a href="#">
                  Learn more{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a>
              </div>
              <div className="grid_block">
                <img src={block} alt="" />
                <h3>Event Listings</h3>
                <p>
                  Explore a diverse range of live events, from intimate gigs to
                  large-scale concerts.
                </p>
                <a href="#">
                  Learn more{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a>
              </div>
              <div className="grid_block">
                <img src={block} alt="" />
                <h3>Secure Transactions</h3>
                <p>
                  Rest assured with our secure transaction system, ensuring
                  peace of mind with every ticket purchase.
                </p>
                <a href="#">
                  Learn more{" "}
                  <img src={rightArrow} className="arrow_right" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="accordion_section">
        <Reveal delay=".2" width="100%">
          <div className="faqs">
            <h2>FAQs</h2>
            <p>
              Explore our comprehensive FAQ section where you'll find answers to
              common questions and detailed information on various aspects of
              our platform.
            </p>
          </div>
        </Reveal>
        <Reveal delay=".2" width="100%">
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
                  To begin selling tickets online for free, simply kickstart
                  your event on Bounce. Our platform offers a seamless
                  experience in crafting, advertising, and overseeing your event
                  without any cost. Dive in effortlessly to start selling your
                  event tickets hassle-free!{" "}
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
                  like giving a special offer to your audience while also
                  keeping track of how effective your marketing efforts are!
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
                  enticing more people to purchase tickets based on their
                  desired experience.
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
                  for charity events. Through our dedicated feature called
                  “Bounce for Nonprofits,” you can expand your audience,
                  increase event attendance, and successfully reach your
                  fundraising objectives using our advanced online ticketing
                  system.
                </li>
              </div>
            </ul>
          </div>
        </Reveal>
        <Reveal delay=".2" width="100%">
          <div className="faq_content">
            <h3>Still have a question?</h3>
            <p>
              Don't hesitate to reach out – we're here to help with any queries
              you may have.
            </p>
            <a href="/contact" className="global_button_one">
              {" "}
              <span>Contact</span>
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}

export default Home;
