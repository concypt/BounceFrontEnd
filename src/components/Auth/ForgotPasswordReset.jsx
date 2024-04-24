import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ForgotPasswordReset = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Here you would handle the password reset logic
    // For demonstration purposes, let's just display a success message and redirect to login page
    setSuccessMessage("Password has been reset successfully!");
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after 2 seconds
    }, 1500);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
        {successMessage && <div className="success">{successMessage}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPasswordReset;
