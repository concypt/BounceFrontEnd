import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const ForgotPasswordRequest = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would handle the forgot password request logic
    // For demonstration purposes, let's just display an info message and redirect to another page
    setInfoMessage(
      "An email with instructions to reset your password has been sent."
    );
    // Redirect to another page after 2 seconds
    setTimeout(() => {
      navigate("/forgot-password-reset");
    }, 1500);
  };

  return (
    <div className={styles.loginBg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>Looking to sign up?</h2>
              <p>
                Start attending incredible club nights, festivals and live music
                events near you by signing up for a free account today.
              </p>
              <a href="#">Back to login</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.conditionsText}>
              <p className={styles.terms}>
                <a href="#">Terms </a> | <a href="#">Privacy</a>
              </p>
              <a href="#" className={styles.createAccount}>
                Back to login
              </a>
            </div>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.formsSection}>
              <h2>Need to reset?</h2>
              <p className={styles.resetText}>
                Enter your email address to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  <img
                    src="images/mailIcon.svg"
                    className={styles.inputImgs}
                    alt=""
                  />
                </div>
                <div className={styles.header_btn}>
                  <button className={styles.loginButton} type="submit">
                    {" "}
                    <span>Get a reset code</span>
                  </button>
                </div>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;
