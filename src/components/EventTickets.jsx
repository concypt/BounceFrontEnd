import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./eventTickets.module.css";
import EventTicketCard from "./EventTicketCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
  fetchEventTickets,
  checkTicketAvailability,
  addToCart,
} from "../api/publicService";

const EventTickets = ({ toggleModal, eventId }) => {
  const [cart, setCart] = useState([]);

  const {
    data: tickets,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventTickets", eventId],
    queryFn: () => fetchEventTickets(eventId),
  });

  const checkAvailabilityMutation = useMutation({
    mutationFn: ({ ticketId, quantity }) => {
      return checkTicketAvailability(ticketId, quantity); // Return the promise
    },
    mutationKey: ["checkTicketAvailability"],
    onSuccess: (data) => {
      console.log(data.msg);
      if (data.msg !== "available") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not enough tickets available",
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error checking availability",
        text: error.message,
      });
    },
  });

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
        },
      ];
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <div className={styles.modalBackground} onClick={toggleModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.column} ${styles.columnLarge}`}>
          <div className="tabSection ticket-popup">
            <div id="tabs">
              <input type="radio" id="button-1" name="tab" defaultChecked />
              <input type="radio" id="button-2" name="tab" />
              <ul id="menu">
                <li className="tab-1-li">
                  <label htmlFor="button-1">Paid</label>
                </li>
                <li className="tab-2-li">
                  <label htmlFor="button-2">Free</label>
                </li>
              </ul>
              <div id="shadow">
                <div id="content">
                  <div id="tab-1">
                    <div className="left tickets-modal-wrapper">
                      <div className={styles.ticketsGridModal}>
                        {tickets.paid_ticket.length > 0 ? (
                          tickets.paid_ticket.map((ticket, index) => (
                            <EventTicketCard
                              handleAddToOrder={handleAddToOrder}
                              checkAvailabilityMutation={
                                checkAvailabilityMutation
                              }
                              ticket={ticket}
                              key={index}
                            />
                          ))
                        ) : (
                          <p>No paid tickets found</p>
                        )}
                      </div>
                    </div>
                    <div className="right"></div>
                  </div>
                  <div id="tab-2">
                    <div className="left tickets-modal-wrapper">
                      <div className={styles.ticketsGridModal}>
                        {tickets.free_ticket.length > 0 ? (
                          tickets.free_ticket.map((ticket, index) => (
                            <EventTicketCard
                              handleAddToOrder={handleAddToOrder}
                              checkAvailabilityMutation={
                                checkAvailabilityMutation
                              }
                              ticket={ticket}
                              key={index}
                            />
                          ))
                        ) : (
                          <p>No free tickets found</p>
                        )}
                      </div>
                    </div>
                    <div className="right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.column} ${styles.columnSmall}`}>
          <h2>Your order</h2>
          <div>
            {cart.length > 0 ? (
              <>
                {cart.map((order, index) => (
                  <div key={index} className={styles.ticketTier}>
                    <div> {order.ticket_name}</div>
                    <div> £{order.price_per_ticket}</div>
                    <div> {order.quantity}</div>
                    <div>£{order.total_price.toFixed(2)}</div>
                  </div>
                ))}
                <div className={styles.grandTotal}>
                  <p>
                    Grand Total Quantity:{" "}
                    {cart.reduce((sum, order) => sum + order.quantity, 0)}
                  </p>
                  <p>
                    Grand Total Price: £
                    {cart
                      .reduce((sum, order) => sum + order.total_price, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <p>No items in your order</p>
            )}
          </div>
          <div className={styles.btnWrapper}>
            <input type="text" placeholder="Enter token" />
            <button className="global_button_one">
              <span>Apply Token</span>
            </button>
          </div>
          <div className={styles.btnWrapper}>
            <button className="global_button_one">
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EventTickets.propTypes = {
  eventId: PropTypes.number,
  toggleModal: PropTypes.func,
};

export default EventTickets;
