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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
