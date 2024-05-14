import { useEffect, useState } from "react";
import styles from "./about.module.css";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

// imaages
import promoteImg2 from "../../assets/images/promote_img2.png";
import tick from "../../assets/images/tick.svg";

function About() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <Reveal width="100%" delay="0.2" amount="0.5">
            <div className={`promote_section ${styles.aboutPromote}`}>
              <div className="promote_div">
                <img src={promoteImg2} alt="" />

                <div className="promote_content">
                  <h2>Our Services</h2>

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
                        To get started, we just need a few details from
                        yourself. Once approved, you’re ready to sell out your
                        event on Bounce.
                      </p>
                    </div>

                    <div className="promote_checks">
                      <img src={tick} alt="" />
                      <p>
                        With a generous industry beating 7.5% fee, you can rely
                        on Bounce to bring you simple, intuitive ticketing
                        solutions for your event brand.
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
          <div className="accordion_section">
            <Reveal delay=".2" width="100%">
              <div className="faqs">
                <h2>FAQs</h2>
                <p>
                  Explore our comprehensive FAQ section where you'll find
                  answers to common questions and detailed information on
                  various aspects of our platform.
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
                      Get started on Bounce by signing up and creating your
                      account. Join a vibrant community of event creators and
                      attendees, leveraging Bounce’s user-friendly platform to
                      effortlessly manage, promote, and sell your event tickets.
                      With advanced tools for email marketing, and streamlined
                      event management, Bounce is your all-in-one solution to
                      boost ticket sales and elevate your event business.
                      Discover the simplicity and power of Bounce for a seamless
                      event planning experience!
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
                      experience in crafting, advertising, and overseeing your
                      event without any cost. Dive in effortlessly to start
                      selling your event tickets hassle-free!{" "}
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
                      Yes! You can boost your ticket sales by offering discounts
                      or promo codes. With Bounce’s ticket management tools, you
                      can easily create tickets and provide discounts to
                      encourage more people to buy them. These promo codes also
                      help you track how well your online ads are performing and
                      figure out which customer groups are spreading the word
                      about your event. It’s like giving a special offer to your
                      audience while also keeping track of how effective your
                      marketing efforts are!
                    </li>
                  </div>
                  <div className="accordian_main" id="3">
                    <li className="question que3">
                      <span>
                        How do I create multiple ticket types on Bounce?
                      </span>
                      <div className="expand-bar"></div>
                    </li>
                    <li className="answer ans3">
                      On Bounce, creating multiple ticket types is
                      straightforward. You have the flexibility to set up
                      various ticket options like Early Bird, VIP, or any other
                      category that fits your event. This helps you cater to
                      different preferences and budgets, enticing more people to
                      purchase tickets based on their desired experience.
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
                      Absolutely! Bounce is a fantastic platform for selling
                      tickets for charity events. Through our dedicated feature
                      called “Bounce for Nonprofits,” you can expand your
                      audience, increase event attendance, and successfully
                      reach your fundraising objectives using our advanced
                      online ticketing system.
                    </li>
                  </div>
                </ul>
              </div>
            </Reveal>
            <Reveal delay=".2" width="100%">
              <div className="faq_content">
                <h3>Still have a question?</h3>
                <p>
                  Don't hesitate to reach out – we're here to help with any
                  queries you may have.
                </p>
                <a href="/contact" className="global_button_one">
                  {" "}
                  <span>Contact</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
