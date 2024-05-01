import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./auth.module.css";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    // Access token from location state
    const token = location.state && location.state.token;
    if (!token) {
      // Handle case when token is not available
      navigate("/login"); // Redirect to login page
    }
    console.log("token=>" + token);
  }, [location, navigate]);

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Disable button and set loading state
    setLoading(true);

    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${location.state.token}`,
          },
          body: JSON.stringify({ otp }),
        }
      );

      const responseData = await response.json();
      console.log("response =>", responseData);

      if (!responseData.success) {
        // If OTP verification fails, display error message
        throw new Error(responseData.msg);
      }

      // OTP verification successful
      setVerificationStatus("success");

      // Clear the token from local storage
      localStorage.removeItem("token");

      // Redirect after 2 seconds only if verification is successful
      const redirectTimer = setTimeout(() => {
        navigate("/login"); // Redirect to home page
      }, 3000);

      // Clean up timer to prevent memory leaks
      return () => clearTimeout(redirectTimer);
    } catch (error) {
      // If OTP verification fails, display error message
      setError(error.message);
      // Clear success status if verification fails
      setVerificationStatus(null);
    } finally {
      // Re-enable button and clear loading state
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    // Clear previous errors
    setError(null);

    // Clear the OTP input field
    setOTP("");

    // Disable button and set loading state
    setLoading2(true);

    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/resend-otp",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${location.state.token}`, // Pass token in header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resend OTP. Please try again later.");
      }

      // OTP resent successfully
      setResendCount((prevCount) => prevCount + 1);
      // You can set a success message or update the UI as needed

      // Now verify the resent OTP
    } catch (error) {
      setError(error.message);
    } finally {
      // Re-enable button and clear loading state
      setLoading2(false);
    }
  };

  return (
    <div className={styles.registerbg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="/">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>OTP Verification</h2>
              <p>Enter the OTP sent to your email or phone number.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={`${styles.formsSection} ${styles.otpSection}`}>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleChange}
                      required
                      placeholder="Enter OTP"
                      disabled={loading} // Disable input during loading
                    />
                  </div>
                  <div className={styles.forgetDiv}>
                    <button
                      type="button"
                      className={styles.resendOTP}
                      disabled={loading}
                      onClick={handleResendOTP}
                    >
                      {loading2 ? "Resending..." : "Resend OTP"}
                    </button>
                  </div>
                </div>
                <div className={styles.header_btn}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {verificationStatus === "success" && (
                  <p className={styles.success}>
                    OTP verification successful! Redirecting...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
