import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>Phone:</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onClick={clearError}>
          Create account
        </button>
        {error && <div className="error">{error}</div>}
        {registrationStatus === "success" && (
          <p>Registration successful! Redirecting...</p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
