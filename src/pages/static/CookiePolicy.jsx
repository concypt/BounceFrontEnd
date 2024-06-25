import styles from "./privacy.module.css";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

function CookiePolicy() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className="header_div">
          <Reveal width="100%" delay=".2">
            <div className={styles.privacy}>
              <h1 className={styles.privacyHeading}>Cookie Policy</h1>
              <div className={styles.privacyContent}>
                <h2>What are cookies?</h2>
                <p>
                  Cookies are small text files that are stored on your device
                  when you visit a website. They are commonly used to enable
                  websites to function more efficiently by storing information
                  about your preferences, activities, and settings.
                </p>
                <h2>Why do we use cookies?</h2>
                <p>
                  We use cookies to enhance your browsing experience, improve
                  the functionality of our website, analyse trends, and
                  administer the Site. Cookies help us understand how you
                  interact with our platform and enable us to tailor your
                  experience based on your preferences.
                </p>
                <h2>Types of cookies we use</h2>
                <p>We use different types of cookies:</p>
                <ul>
                  <li>
                    {" "}
                    Essential cookies: Necessary for the basic functionality of
                    the website and cannot be switched off in our systems.
                  </li>
                  <li>
                    {" "}
                    Performance cookies: Allow us to analyse how visitors use
                    our website and help us improve its performance.
                  </li>
                  <li>
                    {" "}
                    Functionality cookies: Enable enhanced features and
                    personalisation, such as remembering your preferences.
                  </li>
                  <li>
                    {" "}
                    Advertising cookies: Used to deliver more relevant
                    advertisements and measure the effectiveness of advertising
                    campaigns.
                  </li>
                </ul>
                <h2>Duration of cookies stored on your device</h2>
                <p>Cookies can have varying durations:</p>
                <ul>
                  <li>
                    {" "}
                    Session cookies: Temporary and deleted once you close your
                    browser.
                  </li>
                  <li>
                    {" "}
                    Persistent cookies: Remain on your device for a specified
                    period or until manually deleted.
                  </li>
                </ul>
                <h2>Cookie management</h2>
                <p>
                  You can manage your cookie preferences through your browser
                  settings. Most browsers allow you to control cookies,
                  including blocking or deleting them. However, please note that
                  disabling certain cookies may affect the functionality and
                  user experience of our website.
                </p>
                <h2>How often will you update this Cookie Statement?</h2>
                <p>
                  We regularly review and update our Cookie Statement to ensure
                  transparency and compliance with relevant regulations. Any
                  changes to our use of cookies will be reflected in this
                  statement.
                </p>
                <h2>Where can I get further information?</h2>
                <p>
                  For further information or inquiries about our use of cookies
                  or this Cookie Statement, please contact us at
                  info@bounce.live or refer to our Privacy Policy for more
                  details on how we handle your personal data.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default CookiePolicy;
