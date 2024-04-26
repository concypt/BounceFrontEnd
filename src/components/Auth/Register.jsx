import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import LoadingBar from "react-top-loading-bar";

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear error message
    clearError();

    // Check if password matches confirm password
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords don't match");
      return;
    }

    // Call your API endpoint to send the registration data
    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(response);

      // Check if response is not OK
      if (!response.ok) {
        // Get error message from response
        const errorData = await response.json();
        const errorMessage = errorData.message || "Registration failed";

        // Check if there are any validation errors
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setError(`Registration failed: ${errorMessages.join(", ")}`);
        } else {
          setError(`Registration failed: ${errorMessage}`);
        }
        console.error("Registration failed:", errorMessage);
        return;
      }

      // Registration successful
      setRegistrationStatus("success");
      console.log("Registration successful");
      //   Redirect to another page after 2 seconds
      setTimeout(() => {
        navigate("/login"); // Use navigate to redirect to login page
      }, 2000);
    } catch (error) {
      setError("Error registering. Please try again later.");
      console.error("Error registering:", error);
    }
  };

  // Function to clear error message
  const clearError = () => {
    setError(null);
  };

  return (
    <div className={styles.registerbg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>Got an account?</h2>
              <p>
                Attend, promote and host events all from one place on Bounce,
                the all in one ticketing platforn.
              </p>
              <a href="#">Login</a>
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
            <div className={`${styles.formsSection} ${styles.registerSection}`}>
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.twoFields}>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                    />
                    <img
                      src="images/name.svg"
                      className={styles.inputImgs}
                      alt=""
                    />
                  </div>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                    />
                    <img
                      src="images/name.svg"
                      className={styles.inputImgs}
                      alt=""
                    />
                  </div>
                </div>
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
                <div className={styles.inputFields}>
                  <input
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone"
                  />
                  <img
                    src="images/phone.png"
                    className={styles.inputImgs}
                    alt=""
                  />
                </div>
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
                <div className={styles.inputFields}>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
                  />
                  <img
                    src="images/lock.svg"
                    className={styles.inputImgs}
                    alt=""
                  />
                </div>
                <div className={styles.header_btn}>
                  <button className={styles.loginButton} type="submit">
                    {" "}
                    <span>Create account</span>
                  </button>
                </div>
                {error && <div className="error">{error}</div>}
                {registrationStatus === "success" && (
                  <p>Registration successful! Redirecting...</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
