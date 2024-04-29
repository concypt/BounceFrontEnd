import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

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
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Call API endpoint to register user
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

      // Check if response is not OK
      if (!response.ok) {
        let errorMessage; // Define errorMessage variable here

        // Check if response status is 400 (Bad Request) or 422 (Unprocessable Entity)
        if (response.status === 400 || response.status === 422) {
          // Get error message from response
          const errorData = await response.json();

          // Check if there are any validation errors
          if (errorData.errors) {
            const errorMessages = Object.values(errorData.errors).flat();
            errorMessage = `${errorMessages.join("<br>")}`;
          } else {
            errorMessage = `Client Error (${response.status}): Registration failed.`;
          }
        } else if (response.status >= 500) {
          errorMessage = `Server Error (${response.status}): Registration failed.`;
        } else {
          errorMessage = `Unexpected Error (${response.status}): Registration failed.`;
        }
        setError(errorMessage); // Set error message here
        console.error("Registration failed:", errorMessage);
        return;
      }

      // Registration successful
      const responseData = await response.json();
      const token = responseData.data.token;

      console.log("Token:", token);
      setToken(token); // Set the token in state

      setRegistrationStatus("success");
      console.log("Registration successful");
      // Redirect to another page after 2 seconds
      setTimeout(() => {
        navigate("/verification", { state: { token } }); // Use navigate to redirect to verification page with token
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
              <a href="/">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>Got an account?</h2>
              <p>
                Attend, promote and host events all from one place on Bounce,
                the all in one ticketing platforn.
              </p>
              <a href="/login">Login</a>
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
                  <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={isSubmitting} // Disable button when isSubmitting is true
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <span>Create account</span>
                    )}
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {registrationStatus === "success" && (
                  <p className={styles.success}>
                    Registration successful! Redirecting...
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

export default RegisterPage;
