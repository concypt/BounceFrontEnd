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
const handleRemoveFromOrder = (ticket_id) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.filter((item) => item.ticket_id !== ticket_id);
    // Recalculate the total price after item removal
    const newTotalPrice = updatedCart.reduce((total, item) => total + item.total_price, 0);   
  // Apply the coupon discount to the new total price if a coupon is applied
  if (discountApplied) {
    const discount = discountDigit.discount; // Existing discount percentage
    const couponDiscountAmount = newTotalPrice * discount; // Calculate new coupon discount amount
    const updatedPrice = newTotalPrice - couponDiscountAmount; // Apply discount to new total price
    setUpdatedPrice(updatedPrice);
     const updatedTicketCart = {
      ...ticket_cart, // Maintain previous state properties
      total_price: updatedPrice,
      coupon_id: discountDigit.id,
      coupon_discount: couponDiscountAmount,
    };
    setTicket(updatedTicketCart);
    // console.log(updatedTicketCart);
    console.log(ticket_cart);
  }  
  
    return updatedCart;
    
  });
};

const handleAddToOrder = (ticket, quantity) => {
  setCart((prevCart) => {
    const existingTicketIndex = prevCart.findIndex(
      (item) => item.ticket_id === ticket.id
    );
    if (existingTicketIndex !== -1) {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart[existingTicketIndex];
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > ticket.ticket_per_order) {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You cannot order more than ${ticket.ticket_per_order} tickets of this type.`,
        });
        return prevCart;
      }
      updatedCart[existingTicketIndex] = {
        ...existingItem,
        quantity: newQuantity,
        total_price: ticket.price * newQuantity,
      };
      const newTotalPrice = updatedCart.reduce((total, item) => total + item.total_price, 0);   
      // Apply the coupon discount to the new total price if a coupon is applied
      if (discountApplied) {
        const discount = discountDigit.discount; // Existing discount percentage
        const couponDiscountAmount = newTotalPrice * discount; // Calculate new coupon discount amount
        const updatedPrice = newTotalPrice - couponDiscountAmount; // Apply discount to new total price
        console.log(updatedPrice);
        setUpdatedPrice(updatedPrice);
         const updatedTicketCart = {
          ...ticket_cart, // Maintain previous state properties
          total_price: updatedPrice,
          coupon_id: discountDigit.id,
          coupon_discount: couponDiscountAmount,
        };
        
        setTicket(updatedTicketCart);
      }

      return updatedCart;
    }
  
    return [
      ...prevCart,
      {
        quantity,
        ticket_id: ticket.id,
        ticket_name: ticket.name,
        price_per_ticket: ticket.price,
        total_price: ticket.price * quantity,
        type: ticket.type,
      },
    ];
  });  

};