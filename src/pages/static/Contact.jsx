import { useEffect, useState } from "react";
import styles from "./contact.module.css";
import { Link, NavLink } from "react-router-dom";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

// imaages
import promoteImg2 from "../../assets/images/promote_img2.png";
import calender from "../../assets/images/calender.svg";
import promoteImg from "../../assets/images/promote_img.png";

function News() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <dir className={`header_div ${styles.headerBlog}`}>
            <div class={styles.cardContainer}>
              <h1>Contact Us</h1>
              <div className={styles.contactForm}>
                <form action="submit" className={styles.formInput}>
                  <div className={styles.contactInput}>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Name</label>
                      <input type="text" placeholder="Name" required />
                    </div>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Email</label>
                      <input type="email" placeholder="Email" required />
                    </div>
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Subject</label>
                    <input type="text" />
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Message</label>
                    <textarea name="" id=""></textarea>
                  </div>
                  <div className={styles.contactInfo}>
                    <Link>
                      <b>Addreess:</b> BOUNCE INC LTD 7 Bell Yard London WC2A
                      2JR
                    </Link>
                    <Link>
                      <b>Email:</b> Info@bounce.live
                    </Link>
                    <Reveal width="100%" delay=".6">
                      <button
                        type="submit"
                        className={`global_button_one ${styles.submitBtn}`}
                      >
                        {" "}
                        <span>Send Message</span>
                      </button>
                    </Reveal>
                  </div>
                </form>
              </div>
            </div>
          </dir>
        </div>
      </div>
    </>
  );
}

export default News;
