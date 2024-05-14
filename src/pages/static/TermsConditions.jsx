import { useEffect, useState } from "react";
import styles from "./privacy.module.css";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

function TermsConditions() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className="header_div">
          <Reveal width="100%" delay=".2">
            <div className={styles.privacy}>
              <h1 className={styles.privacyHeading}>Terms&Conditions</h1>
              <div className={styles.privacyContent}>
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Bounce (referred to as “we,” “us,” or “our”), a
                  ticketing platform providing services to facilitate the
                  purchase and sale of event tickets. By using our website (the
                  “Site” or “Service”), you agree to abide by these terms and
                  conditions (“Terms of Service”). If you do not agree to these
                  terms, please refrain from using the Site.
                </p>
                <h2>2. Account Registration and Eligibility</h2>
                <p>
                  Users must create an account to access certain features of the
                  Service. By registering, you confirm that you are at least 18
                  years old or have the consent of a legal guardian. You agree
                  to provide accurate and current information during the
                  registration process and maintain the confidentiality of your
                  account credentials.
                </p>
                <h2>3. Ticket Sales and Purchases</h2>
                <p>
                  Bounce acts as an intermediary connecting buyers and event
                  organisers. We do not control the quality, content, or
                  availability of events listed on our platform. All ticket
                  sales are final and subject to the terms and conditions
                  established by the event organiser. Users acknowledge that
                  ticket prices may include additional fees imposed by
                  organisers or Bounce.
                </p>
                <h2>4. Event Listings and Information Accuracy</h2>
                <p>
                  While we strive to provide accurate event information, we do
                  not warrant the accuracy, completeness, or reliability of the
                  details posted on our Site. Event organisers are responsible
                  for the accuracy and timeliness of their event listings,
                  including event descriptions, dates, times, venues, and ticket
                  availability.
                </p>
                <h2>5. Payment Processing and Refunds</h2>
                <p>
                  Users agree to pay the specified ticket price and any
                  associated fees at the time of purchase. Payments are
                  processed securely through our platform. All transactions are
                  final unless explicitly stated otherwise by the event
                  organiser. Refunds, if applicable, are subject to the refund
                  policy of the event organiser.
                </p>
                <h2>6. Intellectual Property Rights</h2>
                <p>
                  All content, trademarks, logos, and intellectual property
                  displayed on Bounce are owned by or licensed to us. Users
                  agree not to use, reproduce, modify, distribute, or display
                  any content from the Site without prior written consent.
                </p>
                <h2>7. Limitation of Liability</h2>
                <p>
                  Bounce shall not be liable for any direct, indirect,
                  incidental, special, or consequential damages arising from the
                  use or inability to use the Service, including but not limited
                  to loss of profits, data, or goodwill. Our liability is
                  limited to the extent permitted by law.
                </p>
                <h2>8. Modifications and Termination</h2>
                <p>
                  We reserve the right to modify, suspend, or terminate the
                  Service, accounts, or these Terms of Service at our discretion
                  without prior notice. Continued use of the Service after
                  modifications constitutes acceptance of the revised terms.
                </p>
                <h2>9. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms of Service shall be governed by the laws of the
                  United Kingdom. Any dispute arising from these terms shall be
                  resolved through binding arbitration or in a court of law in
                  United Kingdom
                </p>
                <h2>10. Contact Information</h2>
                <p>
                  For inquiries regarding these Terms of Service or our Service,
                  please contact us at info@bounce.live
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default TermsConditions;
