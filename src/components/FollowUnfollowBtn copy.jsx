import { useEffect, useState } from "react";
import { followUnfollow } from "../api/secureService";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FollowUnfollowBtn = ({ organisationId }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(null);

  useEffect(() => {
    // Retrieve the followingArray from local storage
    const userFollowingArray =
      JSON.parse(localStorage.getItem("followingArray")) || [];
    if (userFollowingArray.length) {
      const isFollowing = userFollowingArray.includes(organisationId);
      setIsFollowingState(isFollowing);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [organisationId]);

  const toggleFollow = async () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ["followUnfollow"],
      queryFn: () => followUnfollow(followUnfollow),
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <p>Errors: {error.message}</p>;
    }

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
      //console.error("Toggle follow API error:", error);
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
      <button className="global_button_one follow_btn" onClick={handleFollow}>
        <span>{isFollowingState ? "Unfollow" : "Follow"}</span>
      </button>
    </div>
  );
};

export default FollowUnfollowBtn;
