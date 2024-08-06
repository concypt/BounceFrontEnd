import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { followUnfollow } from "../api/secureService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FollowUnfollowBtn = ({ organisationId }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isUserNav") === "true"
  );
  const [isFollowingState, setIsFollowingState] = useState(null);

  useEffect(() => {
    // Retrieve the followingArray from local storage
    let userFollowingArray = [];
    const followingArrayFromStorage = localStorage.getItem("followingArray");
    // Check if followingArrayFromStorage is neither null nor the string "undefined"
    if (
      followingArrayFromStorage &&
      followingArrayFromStorage !== "undefined"
    ) {
      userFollowingArray = JSON.parse(followingArrayFromStorage);
    }

    if (isLoggedIn) {
      const isFollowing = userFollowingArray.includes(organisationId);
      setIsFollowingState(isFollowing);
    }
  }, [organisationId, isLoggedIn]);

  const mutation = useMutation({
    mutationFn: followUnfollow,
    onMutate: () => {
      let userFollowingArray = [];
      if (localStorage.getItem("followingArray").length > 0) {
        userFollowingArray = JSON.parse(localStorage.getItem("followingArray"));
      }

      const updatedFollowingArray = isFollowingState
        ? userFollowingArray.filter((id) => id !== organisationId)
        : [...userFollowingArray, organisationId];
      // if array is not empty
      if (updatedFollowingArray.length > 0) {
        localStorage.setItem(
          "followingArray",
          JSON.stringify(updatedFollowingArray)
        );
      } else {
        localStorage.setItem("followingArray", "");
      }

      // Optionally return a context with the previous following state
      return { previousFollowingArray: userFollowingArray };
    },
    onError: (error, variables, context) => {
      // Revert to the previous following state
      if (context.previousFollowingArray.length > 0) {
        localStorage.setItem(
          "followingArray",
          JSON.stringify(context.previousFollowingArray)
        );
      } else {
        localStorage.setItem("followingArray", "");
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
    onSuccess: (data, variables, context) => {
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
    },
    onSettled: () => {
      // Any additional logic after mutation is completed (either success or error)
    },
  });

  const handleFollow = () => {
    if (isLoggedIn) {
      mutation.mutate(organisationId);
    } else {
      localStorage.setItem("redirectPath", window.location.pathname);
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

FollowUnfollowBtn.propTypes = {
  organisationId: PropTypes.number,
};

export default FollowUnfollowBtn;
