import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const ForgotPasswordRequest = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [success, setSuccess] = useState(false); // Add success state
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to track form submission

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable form submission

    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.msg);
      }
      setSuccess(true); // Set success state to true
      setInfoMessage(responseData.msg);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false); // Enable form submission
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="/">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>Looking to sign up?</h2>
              <p>
                Start attending incredible club nights, festivals and live music
                events near you by signing up for a free account today.
              </p>
              <a href="/login">Back to login</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.conditionsText}>
              <p className={styles.terms}>
                <a href="#">Terms </a> | <a href="#">Privacy</a>
              </p>
              <a href="/login" className={styles.createAccount}>
                Back to login
              </a>
            </div>
            <div className={styles.secondLogo}>
              <a href="/">
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
                    disabled={isSubmitting} // Disable input during form submission
                  />
                  <img
                    src="images/mailIcon.svg"
                    className={styles.inputImgs}
                    alt=""
                  />
                </div>
                <div className={styles.header_btn}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={isSubmitting} // Disable button during form submission
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <span>Get a reset code</span>
                    )}
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {success && !error && (
                  <div className={styles.success}>
                    New Password Send Successfully, Please check your email and
                    login via new password.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;
