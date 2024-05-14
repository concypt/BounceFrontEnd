import { useEffect, useState } from "react";
import styles from "./privacy.module.css";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

function PrivacyPolicy() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className="header_div">
          <Reveal width="100%" delay=".2">
            <div className={styles.privacy}>
              <h1 className={styles.privacyHeading}>Privacy Policy</h1>
              <div className={styles.privacyContent}>
                <h2>1. Bounce Services</h2>
                <p>
                  Bounce provides a platform for ticket sales and event
                  management, facilitating transactions between event organisers
                  and users. Our services include the sale, purchase, and
                  promotion of event tickets, managing event listings, and
                  facilitating communication between parties involved in event
                  hosting and attendance.
                </p>
                <h2>
                  2. Personal Data That We Collect and Information Collected
                  From All Users
                </h2>
                <p>
                  We collect various types of personal information from users,
                  such as name, email address, billing details, and browsing
                  activity. Additionally, we gather non-personal data like
                  browser type, IP address, and cookies for analytical and
                  operational purposes. This information is collected when users
                  register accounts, purchase tickets, interact with our Site,
                  or engage with our services.
                </p>
                <h2>3. How We Disclose And Transfer Your Personal Data</h2>
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties without your consent, except when necessary to
                  provide the requested services or as required by law. However,
                  we may share information with trusted third-party service
                  providers assisting us in website operation or business
                  conduct. Your data may be transferred and stored in locations
                  outside of your country of residence, subject to the
                  protections outlined in this Privacy Policy.
                </p>
                <h2>
                  4. How You Can Access, Update, Correct or Delete Your Personal
                  Data
                </h2>
                <p>
                  Users have the right to access, update, correct, or delete
                  their personal information stored by Bounce. You can review
                  and modify your account details or preferences by logging into
                  your account settings. If you encounter difficulties or
                  require assistance in managing your data, please contact us
                  using the information provided in this Privacy Policy.
                </p>
                <h2>
                  5. Cookies, Pixels Tags, Local Shared Objects, Web Storage And
                  Similar Technologies
                </h2>
                <p>
                  We utilise cookies and similar technologies to enhance user
                  experience, analyse trends, and administer the Site. Users can
                  manage cookie preferences through browser settings; however,
                  disabling cookies may limit certain functionalities of the
                  website.
                </p>
                <h2>6. Personal Data Provided to Others</h2>
                <p>
                  We do not disclose your personal data to external parties for
                  their marketing purposes without your explicit consent. We may
                  share data with third-party service providers to fulfil
                  services requested or improve our operations. These entities
                  are obligated to maintain the confidentiality and security of
                  your personal information.
                </p>
                <h2>7. International Privacy Laws</h2>
                <p>
                  Our data collection and processing practices are designed to
                  comply with UK data protection laws and regulations. If your
                  personal data is transferred internationally, we ensure
                  appropriate safeguards are in place to protect your
                  information consistent with this Privacy Policy.
                </p>
                <h2>8. Dispute Resolution</h2>
                <p>
                  Any disputes regarding this Privacy Policy or our data
                  practices will be addressed according to applicable UK privacy
                  laws. We encourage users to contact us first to resolve any
                  concerns or queries regarding their personal data.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
4;
