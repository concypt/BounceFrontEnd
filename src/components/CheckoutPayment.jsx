import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./CheckoutPayment.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrders } from "../api/publicService";
//images
import cardIcon from "../assets/images/checkout-card-icon.svg";
import visaImg from "../assets/images/checkout-visa.svg";
import masterImg from "../assets/images/checkout-mastercard.svg";
import americanImg from "../assets/images/checkout-american.svg";
import dummyImg from "../assets/images/dummy.png";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#4F4B5C",
      fontFamily: "Outfit, sans-serif",
      fontSize: "18px",
      "::placeholder": {
        color: "#000",
      },
    },
  },
  hidePostalCode: true,
};

const schema = z.object({
  cardName: z.string().min(1, "Card Name is required"),
  email: z.string().email("Invalid email address"),
});

const Checkout = ({ cartData }) => {
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const imageSrc = cartData.event?.image || dummyImg;
  const commission = cartData.orgCommissionSetting.org_commission / 100;
  const clientSecret = cartData.intent;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    payment: cartData.total_price,
    coupon_discount: cartData.coupon_discount || 0,
    coupon_id: cartData.coupon_id || 0,
    quantity: cartData.quantity || [], // Example values for the quantity field
    ticket_id: cartData.ticket_id || [], // Example values for the ticket_id field
    payment_type: cartData.payment_type || [], // Example values for payment_type
    payment_token: cartData.payment_token,
    instagram: "",
    org_commission: cartData.total_price * commission,
  });
  useEffect(() => {
    if (clientSecret) {
      // Reset any errors when a new clientSecret is received
      setError(null);
    }
  }, [clientSecret]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "quantity" ||
      name === "ticket_id" ||
      name === "payment_type"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((val) => val.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: createOrders,
    mutationKey: ["createOrders"],
    onSuccess: (data) => {
      if (data.success === true) {
        // console.log('console'+JSON.stringify(data.msg, null, 2));
        navigate("/events");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Order Create successfully!",
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.msg,
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error submitting form: ${error.message}`,
      });
    },
  });

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      // Confirm the payment with the client secret from the backend
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // // Payment successful, handle post-payment actions here
        // alert('Payment successful!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
    mutation.mutate(formData);

    //     console.log('Data:', JSON.stringify(data, null, 2));  // Pretty print with 2 spaces
    // console.log('FormData:', JSON.stringify(formData, null, 2));
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.largeColumn}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formCheckout}>
          <div className="billingDetails">
            <h5 className={styles.textWithLines}>Billing Details</h5>
            <div className={styles.formGroup}>
              <input {...register("cardName")} placeholder="Name on Card" />
            </div>
            <div className={styles.formGroup}>
              <input {...register("email2")} placeholder="Email" />
            </div>
            <div className={styles.cardElementWrapper}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            {error && <div className="error">{error}</div>}
          </div>
          <div className={styles.paymentOptions}>
            <p className={styles.paymentSupportedTextWrap}>Supported</p>
            <div className={styles.paymentImages}>
              <img src={visaImg} alt="Visa" className={styles.paymentImage} />
              <img
                src={masterImg}
                alt="Mastercard"
                className={styles.paymentImage}
              />
              <img
                src={americanImg}
                alt="American Express"
                className={styles.paymentImage}
              />
            </div>
          </div>
          <div className="userDetails">
            <h5 className={styles.textWithLines}>User Details</h5>
            <div className={styles.twoFormGroups}>
              <div className={styles.formGroup}>
                <input
                  {...register("first_name")}
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  {...register("last_name")}
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className={styles.twoFormGroups}>
              <div className={styles.formGroup}>
                <input
                  {...register("email")}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  {...register("phone")}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                {...register("instagram")}
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram Handle"
              />
            </div>
            <button
              className="loginButton remove-margin"
              type="submit"
              disabled={!stripe || isProcessing}
            >
              <span>{isProcessing ? "Processing…" : "Pay with card"}</span>
            </button>
          </div>
        </form>
      </div>
      <div className={styles.smallColumn}>
        <div className={styles.eventInfoCheckout}>
          <img
            src={imageSrc}
            alt={cartData.event?.name || "Default Event Image"}
          />
          <div className={styles.eventAbout}>
            <h3>{cartData.event.name || "-"}</h3>
            <p>{cartData.event.location || "-"}</p>
          </div>
        </div>
        {cartData.tickets.map((ticket, index) => (
          <div key={index} className={styles.ticketAbout}>
            <h3>{ticket.name}</h3>
            {ticket.absorbe_fees === 0 && ticket.type === "paid" ? (
              <h5>
                {cartData.quantity[index]} * £
                {(ticket.price * commission).toFixed(2)}
                <span className={styles.feeDetails}>
                  + £{(ticket.price - ticket.price * commission).toFixed(2)} Fee
                </span>
              </h5>
            ) : (
              <h5>
                {cartData.quantity[index]} * £{ticket.price} Fee
              </h5>
            )}
          </div>
        ))}

        {cartData.coupon_discount !== 0 && (
          <div className={styles.ticketTotal}>
            <span>Grand Total</span>
            <span>
              £ {(cartData.coupon_discount + cartData.total_price).toFixed(2)}
            </span>
            <span>Coupon Discount</span>
            <span>£ {cartData.coupon_discount.toFixed(2)}</span>
            <span>Original Total</span>
            <span>£ {cartData.total_price.toFixed(2)}</span>
          </div>
        )}

        {/* Show Total section only when coupon_discount is not zero */}
        {cartData.coupon_discount == 0 ? (
          <div className={styles.ticketTotal}>
            <span>Total</span>
            <span>£ {cartData.total_price.toFixed(2)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
