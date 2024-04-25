import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);

  //   useEffect(() => {
  //     const requestNotificationPermission = async () => {
  //       try {
  //         // Request permission for notifications
  //         await Notification.requestPermission();
  //         // Get the device token (browser may manage this internally)
  //         const registration = await navigator.serviceWorker.getRegistration();
  //         if (registration) {
  //           const subscription = await registration.pushManager.getSubscription();
  //           if (subscription) {
  //             const token = subscription.endpoint.split("/").slice(-1)[0];
  //             setDeviceToken(token);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error requesting notification permission:", error);
  //       }
  //     };

  //     requestNotificationPermission();
  //   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Append device token to formData
      const formDataWithToken = {
        ...formData,
        device_token: "gsdgdgrt452345dwtegwdg334",
      };

      const response = await fetch("https://bounce.extrasol.co.uk/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataWithToken), // Send formDataWithToken in the request body
      });

      if (!response.ok) {
        // Get error message from response
        const errorData = await response.json();
        const errorMessage = "Invalid email or password. Please try again.";

        // Check if there are any validation errors
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setError(`Login failed: ${errorMessages.join(", ")}`);
        } else {
          // If there is no specific error message, display "Password incorrect"
          setError(`Login failed: ${errorMessage || "Password incorrect"}`);
        }
        console.error("Login failed:", errorMessage);
        return;
      }

      // Login successful, navigate to dashboard or desired page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred. Please try again later.");
    }
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
              <a href="#">Sign up</a>
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
                Create an account
              </a>
            </div>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.formsSection}>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
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
                <div>
                  <div className={styles.inputFields}>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                    />
                    <img
                      src="images/lock.svg"
                      className={styles.inputImgs}
                      alt=""
                    />
                  </div>
                  <div className={styles.forgetDiv}>
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                <div className={styles.header_btn}>
                  <button className={styles.loginButton}>
                    {" "}
                    <span>Sign in</span>
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

export default LoginPage;
