import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { followUnfollow } from "../api/secureService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FollowUnfollowBtn = ({ organisationId }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(null);

  useEffect(() => {
    // Retrieve the followingArray from local storage
    let userFollowingArray = [];
    const followingArrayFromStorage = localStorage.getItem("followingArray");
    // Check if followingArrayFromStorage is neither null nor the string "undefined"
    if (followingArrayFromStorage && followingArrayFromStorage !== "undefined") {
      userFollowingArray = JSON.parse(followingArrayFromStorage);
    }
    if (userFollowingArray.length) {
      const isFollowing = userFollowingArray.includes(organisationId);
      setIsFollowingState(isFollowing);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [organisationId]);

  const mutation = useMutation({
    mutationFn: followUnfollow,
    onMutate: () => {
      const userFollowingArray =
        JSON.parse(localStorage.getItem("followingArray")) || [];
      console.log(userFollowingArray);
      const updatedFollowingArray = isFollowingState
        ? userFollowingArray.filter((id) => id !== organisationId)
        : [...userFollowingArray, organisationId];
      localStorage.setItem(
        "followingArray",
        JSON.stringify(updatedFollowingArray)
      );

      // Optionally return a context with the previous following state
      return { previousFollowingArray: userFollowingArray };
    },
    onError: (error, variables, context) => {
      // Revert to the previous following state
      localStorage.setItem(
        "followingArray",
        JSON.stringify(context.previousFollowingArray)
      );

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
