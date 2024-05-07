import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/events.module.css";
import LoadingBar from "react-top-loading-bar";
import Swal from "sweetalert2";

const FollowUnfollowBtn = ({ organisationId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(null);

  useEffect(() => {
    // Retrieve the followingArray from local storage
    const userFollowingArray =
      JSON.parse(localStorage.getItem("followingArray")) || [];
    const isFollowing = userFollowingArray.includes(organisationId);
    setIsFollowingState(isFollowing);
  }, [organisationId]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const toggleFollow = async () => {
    try {
      const url = `https://bounce.extrasol.co.uk/api/user/add-followList/${organisationId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle follow status");
      }

      const userFollowingArray =
        JSON.parse(localStorage.getItem("followingArray")) || [];
      const updatedFollowingArray = isFollowingState
        ? userFollowingArray.filter((id) => id !== organisationId)
        : [...userFollowingArray, organisationId];
      localStorage.setItem(
        "followingArray",
        JSON.stringify(updatedFollowingArray)
      );

      return true;
    } catch (error) {
      console.error("Toggle follow API error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return false;
    }
  };

  const handleFollow = () => {
    if (isLoggedIn) {
      toggleFollow().then((success) => {
        if (success) {
          const message = isFollowingState
            ? "Unfollowed successfully!"
            : "Followed successfully!";
          Swal.fire({
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setIsFollowingState((prevState) => !prevState); // Update state after successful toggle
        }
      });
    } else {
      localStorage.setItem("redirectEventPage", window.location.pathname);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="header_btn">
      <button
        className={`global_button_one ${styles.followBtn}`}
        onClick={handleFollow}
      >
        <span>{isFollowingState ? "Unfollow" : "Follow"}</span>
      </button>
    </div>
  );
};

export default FollowUnfollowBtn;
