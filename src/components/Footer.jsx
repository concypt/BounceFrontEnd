import React, { useState } from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footer_div}>
        <div className={styles.footer_main}>
          <div className={`row ${styles.footer_row}`}>
            <div className="col-sm-4 col-md-6 col-lg-8">
              <div className={styles.footerdiv_one}>
                <a href="#" className={styles.logo}>
                  <img src="../images/logo.svg" alt="" />
                </a>
                <div className={styles.address}>
                  <h3>Address:</h3>
                  <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
                </div>
                <div className={`${styles.address} ${styles.contact}`}>
                  <h3>Contact:</h3>
                  <a href="#">1800 123 4567</a>
                  <a href="#">info@relume.io</a>
                </div>
                <div className={`${styles.address} ${styles.contact}`}>
                  <div className={styles.social_icons}>
                    <a href="#">
                      <img src="../images/facebook.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="../images/insta.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="../images/twitter.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="../images/linkdin.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="../images/youtube.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <div className={styles.list_items}>
                <ul>
                  <li>
                    <a href="#">link one</a>
                  </li>
                  <li>
                    <a href="#">link two</a>
                  </li>
                  <li>
                    <a href="#">link three</a>
                  </li>
                  <li>
                    <a href="#">link four</a>
                  </li>
                  <li>
                    <a href="#">link five</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <div className={styles.list_items}>
                <ul>
                  <li>
                    <a href="#">link six</a>
                  </li>
                  <li>
                    <a href="#">link seven</a>
                  </li>
                  <li>
                    <a href="#">link eight</a>
                  </li>
                  <li>
                    <a href="#">link nine</a>
                  </li>
                  <li>
                    <a href="#">link ten</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.last_footer}>
            <div className={styles.copyright}>
              <p>© 2023 Relume. All rights reserved.</p>
              <div className={styles.footer_links}>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
