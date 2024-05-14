import { Link } from "react-router-dom";
import styles from "./footer.module.css";

//images
import logoImage from "../assets/images/logo.svg";
import facebookImage from "../assets/images/facebook.svg";
import instaImage from "../assets/images/insta.svg";
import twitterImage from "../assets/images/twitter.svg";
import linkdinImage from "../assets/images/linkdin.svg";
import youtubeImage from "../assets/images/youtube.svg";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footer_div}>
        <div className={styles.footer_main}>
          <div className={`row ${styles.footer_row}`}>
            <div className="col-sm-4 col-md-6 col-lg-8">
              <div className={styles.footerdiv_one}>
                <Link to="/" className={styles.logo}>
                  <img src={logoImage} alt="Bounce" />
                </Link>
                <div className={styles.address}>
                  <h3>Address:</h3>
                  <p>BOUNCE INC LTD 7 Bell Yard London WC2A 2JR</p>
                </div>
                <div className={`${styles.address} ${styles.contact}`}>
                  <h3>Contact:</h3>
                  <Link to="tel:">1800 123 4567</Link>
                  <Link to="mailto:info@bounce.live">Info@bounce.live</Link>
                </div>
                <div className={`${styles.address} ${styles.contact}`}>
                  <div className={styles.social_icons}>
                    <Link to="#">
                      <img src={facebookImage} alt="Facebook" />
                    </Link>
                    <Link
                      to="https://www.instagram.com/bounce.hub/"
                      target="blank"
                    >
                      <img src={instaImage} alt="instaImage" />
                    </Link>
                    <Link to="#">
                      <img src={twitterImage} alt="Twitter" />
                    </Link>
                    <Link to="#">
                      <img src={linkdinImage} alt="LinkedIn" />
                    </Link>
                    <Link to="#">
                      <img src={youtubeImage} alt="Youtube" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <div className={styles.list_items}>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li>
                    <Link to="#">Explore Categories</Link>
                  </li>
                  <li>
                    <Link to="/News">News</Link>
                  </li>
                  <li>
                    <Link to="/Contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <div className={styles.list_items}>
                <ul>
                  <li>
                    <Link to="/PrivacyPolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/TermsConditions">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link to="/CookiePolicy">Cookie Policy</Link>
                  </li>
                  <li>
                    <Link to="/About">About Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.last_footer}>
            <div className={styles.copyright}>
              <p>© 2023 Bounce. All rights reserved.</p>
              <div className={styles.footer_links}>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/tos">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
