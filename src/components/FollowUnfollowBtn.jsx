import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "../components/events.module.css";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FollowUnfollowBtn = ({ organisationId }) => {
  // Accept organisationId as prop
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(null);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataAndStoreArray = async () => {
      try {
        const response = await fetch(
          "https://bounce.extrasol.co.uk/api/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        const followingArray = responseData.data.following;
        localStorage.setItem("storedArray", JSON.stringify(followingArray));
        // console.log("Array stored in local storage:", followingArray);

        // Now that we have stored the array, let's update isFollowingState
        const isFollowing = followingArray.includes(organisationId);
        setIsFollowingState(isFollowing);
      } catch (error) {
        console.error("Error fetching data and storing array:", error);
      }
    };

    fetchDataAndStoreArray();
  }, [token, organisationId]);

  useEffect(() => {
    if (organisationId) {
      // Ensure organisationId is defined before fetching event details
      const fetchEventDetails = async () => {
        try {
          const response = await fetch(
            `https://bounce.extrasol.co.uk/api/host/profile/${organisationId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch organisation details");
          }

          const eventData = await response.json();
          setEvent(eventData.data);
        } catch (error) {
          console.error("Error fetching organisation details:", error);
        } finally {
          setLoadingComplete(true);
        }
      };

      fetchEventDetails();
    }

    if (token) {
      setIsLoggedIn(true);
    }
  }, [organisationId, token]);

  const toggleFollow = async (organizationId) => {
    try {
      const url = `https://bounce.extrasol.co.uk/api/user/add-followList/${organizationId}`;

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

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleFollow = () => {
    if (isLoggedIn) {
      toggleFollow(organisationId)
        .then(() => {
          setIsFollowingState((prev) => !prev);
          Swal.fire({
            icon: "success",
            title: !isFollowingState
              ? "Followed successfully!"
              : "Unfollowed successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("Toggle follow API error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    } else {
      localStorage.setItem("redirectEventPage", window.location.pathname);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  if (!event) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
    );
  }

  return (
    <>
      <div className="header_btn">
        <button
          className={`global_button_one ${styles.followBtn}`}
          onClick={handleFollow}
        >
          <span>{isFollowingState ? "Unfollow" : "Follow"}</span>
        </button>
      </div>
    </>
  );
};

export default FollowUnfollowBtn;
