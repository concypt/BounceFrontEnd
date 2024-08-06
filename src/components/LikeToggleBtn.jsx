import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { likeToggle } from "../api/secureService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./likeToggleBtn.module.css";
import likeActive from "../assets/images/likeactive.svg";
import likeInActive from "../assets/images/likeInactive.svg";

const LikeToggleBtn = ({ eventId }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isUserNav") === "true"
  );
  const [isEventLiked, setIsEventLiked] = useState(null);

  useEffect(() => {
    // Retrieve the favEvents from local storage
    let userLikedEvents = [];
    const favEventsFromStorage = localStorage.getItem("favEvents");
    if (favEventsFromStorage && favEventsFromStorage !== "undefined") {
      userLikedEvents = JSON.parse(favEventsFromStorage);
    }

    if (isLoggedIn) {
      const isFollowing = userLikedEvents.includes(eventId);
      setIsEventLiked(isFollowing);
    }
  }, [eventId, isLoggedIn]);

  const mutation = useMutation({
    mutationFn: likeToggle,
    onMutate: () => {
      let userLikedEvents = [];

      if (localStorage.getItem("favEvents").length > 0) {
        userLikedEvents = JSON.parse(localStorage.getItem("favEvents"));
      }

      const updatedfavEvents = isEventLiked
        ? userLikedEvents.filter((id) => id !== eventId)
        : [...userLikedEvents, eventId];
      // if array is not empty

      if (updatedfavEvents.length > 0) {
        localStorage.setItem("favEvents", JSON.stringify(updatedfavEvents));
      } else {
        localStorage.setItem("favEvents", "");
      }

      // Optionally return a context with the previous following state
      return { previousfavEvents: userLikedEvents };
    },
    onError: (error, variables, context) => {
      // Revert to the previous following state
      if (context.previousfavEvents.length > 0) {
        localStorage.setItem(
          "favEvents",
          JSON.stringify(context.previousfavEvents)
        );
      } else {
        localStorage.setItem("favEvents", "");
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
    onSuccess: (data, variables, context) => {
      const message = isEventLiked
        ? "Removed from favourites!"
        : "Added to favourites!";
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEventLiked((prevState) => !prevState); // Update state after successful toggle
    },
    onSettled: () => {
      // Any additional logic after mutation is completed (either success or error)
    },
  });

  const handleLike = () => {
    if (isLoggedIn) {
      mutation.mutate(eventId);
    } else {
      localStorage.setItem("redirectPath", window.location.pathname);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className={styles.heart_icon} onClick={handleLike}>
      {isEventLiked ? (
        <img src={likeActive} alt="" />
      ) : (
        <img src={likeInActive} alt="" />
      )}
    </div>
  );
};

LikeToggleBtn.propTypes = {
  eventId: PropTypes.number,
};

export default LikeToggleBtn;
