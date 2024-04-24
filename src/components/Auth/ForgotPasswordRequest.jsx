import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
        {infoMessage && <div className="info">{infoMessage}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPasswordRequest;
