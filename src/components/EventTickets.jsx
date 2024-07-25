// import PropTypes from "prop-types";
// import styles from "./eventTickets.module.css";
// import EventTicketCard from "./EventTicketCard";
// import { useQuery } from "@tanstack/react-query";
// import { fetchEventTickets } from "../api/publicService";

// const EventTickets = ({ toggleModal, eventId }) => {
//   const {
//     data: tickets,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["eventTickets", eventId],
//     queryFn: () => fetchEventTickets(eventId),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>error occored {error.message}</p>;

//   //console.log(tickets);
//   return (
//     <>
//       <div className={styles.modalBackground} onClick={toggleModal}>
//         <div
//           className={styles.modalContainer}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className={`${styles.column} ${styles.columnLarge}`}>
//             <div className="tabSection ticket-popup">
//               <div id="tabs">
//                 <input type="radio" id="button-1" name="tab" defaultChecked />
//                 <input type="radio" id="button-2" name="tab" />
//                 <ul id="menu">
//                   <li className="tab-1-li">
//                     <label htmlFor="button-1">Paid</label>
//                   </li>
//                   <li className="tab-2-li">
//                     <label htmlFor="button-2">Free</label>
//                   </li>
//                   {/* <li className="bg"></li> */}
//                 </ul>
//                 <div id="shadow">
//                   <div id="content">
//                     <div id="tab-1">
//                       <div className="left tickets-modal-wrapper">
//                         <div className={styles.ticketsGridModal}>
//                           {tickets.paid_ticket.length > 0 ? (
//                             tickets.paid_ticket.map((ticket, index) => (
//                               <EventTicketCard ticket={ticket} key={index} />
//                             ))
//                           ) : (
//                             <p>No paid tickets found</p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="right"></div>
//                     </div>
//                     <div id="tab-2">
//                       <div className="left tickets-modal-wrapper">
//                         <div className={styles.ticketsGridModal}>
//                           {tickets.free_ticket.length > 0 ? (
//                             tickets.free_ticket.map((ticket, index) => (
//                               <EventTicketCard ticket={ticket} key={index} />
//                             ))
//                           ) : (
//                             <p>No free tickets found</p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="right"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={`${styles.column} ${styles.columnSmall}`}>
//             <h2>Your order</h2>
//             <div className={styles.ticketTier}>
//               <p>Tier 1 </p>
//             </div>
//             <div className={styles.btnWrapper}>
//               <div className="header_btn ticket-modal">
//                 <button href="#" className="global_button_one">
//                   <span>Checkout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// EventTickets.propTypes = {
//   eventId: PropTypes.string,
//   toggleModal: PropTypes.func,
// };

// export default EventTickets;

// import { useState } from "react";
// import PropTypes from "prop-types";
// import styles from "./eventTickets.module.css";
// import EventTicketCard from "./EventTicketCard";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// import {
//   fetchEventTickets,
//   checkTicketAvailability,
//   addToCart,
// } from "../api/publicService";

// const EventTickets = ({ toggleModal, eventId }) => {
//   const [cart, setCart] = useState([]);

//   const {
//     data: tickets,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["eventTickets", eventId],
//     queryFn: () => fetchEventTickets(eventId),
//   });

//   const checkAvailabilityMutation = useMutation({
//     mutationFn: ({ ticketId, quantity }) => {
//       return checkTicketAvailability(ticketId, quantity); // Return the promise
//     },
//     mutationKey: ["checkTicketAvailability"],
//     onSuccess: (data) => {
//       console.log(data.msg);
//       if (data.msg !== "available") {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Not enough tickets available",
//         });
//       }
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error checking availability",
//         text: error.message,
//       });
//     },
//   });

//   const addToOrderMutation = useMutation({
//     mutationFn: (orderDetails) => addToCart(orderDetails),
//     mutationKey: ["addToCart"],
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Order added to cart successfully!",
//       });
//       // Optionally update the cart state here
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error adding to cart",
//         text: error.message,
//       });
//     },
//   });

//   const handleAddToOrder = (ticket, quantity) => {
//     const orderDetails = {
//       quantity,
//       ticket_id: ticket.id,
//       total_price: ticket.price * quantity,
//       actual_price: ticket.price * quantity,
//       coupon_id: null,
//       type: ticket.type,
//       ticket_name: ticket.name,
//     };
//     setCart((prevCart) => [...prevCart, orderDetails]);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error occurred: {error.message}</p>;

//   return (
//     <div className={styles.modalBackground} onClick={toggleModal}>
//       <div
//         className={styles.modalContainer}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className={`${styles.column} ${styles.columnLarge}`}>
//           <div className="tabSection ticket-popup">
//             <div id="tabs">
//               <input type="radio" id="button-1" name="tab" defaultChecked />
//               <input type="radio" id="button-2" name="tab" />
//               <ul id="menu">
//                 <li className="tab-1-li">
//                   <label htmlFor="button-1">Paid</label>
//                 </li>
//                 <li className="tab-2-li">
//                   <label htmlFor="button-2">Free</label>
//                 </li>
//               </ul>
//               <div id="shadow">
//                 <div id="content">
//                   <div id="tab-1">
//                     <div className="left tickets-modal-wrapper">
//                       <div className={styles.ticketsGridModal}>
//                         {tickets.paid_ticket.length > 0 ? (
//                           tickets.paid_ticket.map((ticket, index) => (
//                             <EventTicketCard
//                               handleAddToOrder={handleAddToOrder}
//                               checkAvailabilityMutation={
//                                 checkAvailabilityMutation
//                               }
//                               ticket={ticket}
//                               key={index}
//                             />
//                           ))
//                         ) : (
//                           <p>No paid tickets found</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="right"></div>
//                   </div>
//                   <div id="tab-2">
//                     <div className="left tickets-modal-wrapper">
//                       <div className={styles.ticketsGridModal}>
//                         {tickets.free_ticket.length > 0 ? (
//                           tickets.free_ticket.map((ticket, index) => (
//                             <EventTicketCard
//                               handleAddToOrder={handleAddToOrder}
//                               checkAvailabilityMutation={
//                                 checkAvailabilityMutation
//                               }
//                               ticket={ticket}
//                               key={index}
//                             />
//                           ))
//                         ) : (
//                           <p>No free tickets found</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="right"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.column} ${styles.columnSmall}`}>
//           <h2>Your order</h2>
//           <div>
//             {cart.length > 0 ? (
//               cart.map((order, index) => (
//                 <div key={index} className={styles.ticketTier}>
//                   <p>
//                     Ticket: {order.ticket_name} x {order.quantity}
//                   </p>
//                   <p>Total Price: £{order.total_price}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No items in your order</p>
//             )}
//           </div>
//           <div className={styles.btnWrapper}>
//             <div className="header_btn ticket-modal">
//               <button className="global_button_one">
//                 <span>Checkout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// EventTickets.propTypes = {
//   eventId: PropTypes.string,
//   toggleModal: PropTypes.func,
// };

// export default EventTickets;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./eventTickets.module.css";
import EventTicketCard from "./EventTicketCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import {
  fetchEventTickets,
  checkTicketAvailability,
  addToCart,
  couponApply
} from "../api/publicService";

const EventTickets = ({ toggleModal, eventId }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountDigit, setDiscountDigit] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [ticket_cart, setTicket] = useState({
    ticket_id: [],
    quantity: [],
    total_price:0,
    coupon_id:0,
    coupon_discount:0,
    type:[],
  });
  const [coupon_Data, couponData] = useState({
    event_id: eventId,
    coupon_code:'',
  });
  // console.log(ticket_cart);
  const [token, setToken] = useState('');
  const [errors, setError] = useState('');
  const [success, setSuccess] = useState('');
  const calculateOriginalTotalPrice = () => {
    const totalPrice = cart.reduce((sum, order) => sum + order.total_price, 0);
    setOriginalTotalPrice(totalPrice);
  };
  
  useEffect(() => {
    const updatedTicketCart = cart.reduce(
      (acc, item) => {
        acc.ticket_id.push(item.ticket_id);
        acc.quantity.push(item.quantity);
        acc.total_price += item.total_price;
        acc.type.push(item.type); // Assuming you want to keep ticket names for the type
        return acc;
      },
      {
        ticket_id: [],
        quantity: [],
        total_price: 0,
        coupon_id: 0,
        coupon_discount: 0,
        type: [],
      }
    );
    setTicket(updatedTicketCart);
    calculateOriginalTotalPrice();
  }, [cart] );
  
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
      // console.log(data.msg);
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
          type: ticket.type,
        },
      ];
    });  
   
  };
   // Function to handle button click
    const mutation = useMutation({
    mutationFn: addToCart,
    mutationKey: ["addToCart"],
    onSuccess: (data) => {
      // console.log(data.data);
      const cartData = data.data;
      navigate('/Checkout', { state: { cartData } });
    setTicket({
    ticket_id: [],
    quantity: [],
    total_price:0,
    coupon_id:0,
    coupon_discount:0,
    type:[],
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error submitting form: ${error.message}`,
      });
    },
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(ticket_cart);
  };

   // Function to handle button click
   const mutations = useMutation({
    mutationFn: couponApply,
    mutationKey: ["couponApply"],
    onSuccess: (data) => {
      const couponData = data;
      if(couponData){
        
        const discount = couponData.discount / 100; // Convert percentage to decimal
        const updatedPrice = originalTotalPrice * (1 - discount); // Apply discount
        const coupon_discount = originalTotalPrice *  discount;
      setDiscountApplied(discount);
      setDiscountDigit()
      setUpdatedPrice(updatedPrice);
      
       // Update the cart with discounted prices if neede
       const updatedTicketCart = {
        ...ticket_cart, // Maintain previous state properties
        total_price: updatedPrice,
        coupon_id: couponData.id,
        coupon_discount: coupon_discount,
      };
      
      setTicket(updatedTicketCart);
     
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
 
  const handleApplyClick = async () => {
    try {
      
      // Validate token
      if (!token) {
        setError('Token cannot be empty');
        return;
      } 
       const couponApplyData = {
        ...coupon_Data,
        event_id: eventId,
        coupon_code: token,
      };
     
       couponData(couponApplyData);
       mutations.mutate(coupon_Data);
    } catch (errors) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
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
                    <div className="left">
                      {tickets.paid_ticket.length > 0 ? (
                        <div className={styles.ticketsGridModal}>
                          {tickets.paid_ticket.map((ticket, index) => (
                            <EventTicketCard
                              handleAddToOrder={handleAddToOrder}
                              checkAvailabilityMutation={
                                checkAvailabilityMutation
                              }
                              ticket={ticket}
                              key={index}
                            />
                          ))}
                        </div>
                      ) : (
                        <p>No paid tickets found</p>
                      )}
                    </div>
                    <div className="right"></div>
                  </div>
                  <div id="tab-2">
                    <div className="left">
                      {tickets.free_ticket.length > 0 ? (
                        <div className={styles.ticketsGridModal}>
                          {tickets.free_ticket.map((ticket, index) => (
                            <EventTicketCard
                              handleAddToOrder={handleAddToOrder}
                              checkAvailabilityMutation={
                                checkAvailabilityMutation
                              }
                              ticket={ticket}
                              key={index}
                            />
                          ))}
                        </div>
                      ) : (
                        <p>No free tickets found</p>
                      )}
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
          <form onSubmit={handleSubmit}>
          <div>
            {cart.length > 0 ? (
              <>
                <table className={styles.ticketTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qt</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((order, index) => (
                      <tr key={index}>
                        <td>{order.ticket_name}</td>
                        <td>£{order.price_per_ticket}</td>
                        <td>{order.quantity}</td>
                        <td>£{order.total_price.toFixed(2)}</td>
                        <td className="text-center">
                          <button type="button" className={styles.removeButton}>
                            <FontAwesomeIcon icon={faMinusCircle} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.grandTotal}>
                  <p>
                    Grand Total Quantity:{" "}
                    {cart.reduce((sum, order) => sum + order.quantity, 0)}
                  </p>
                  <p>
                  Grand Total Price: £{originalTotalPrice.toFixed(2)}
                </p>

                {discountApplied && (
                  <div>
                    <p>Discounted Price: £{updatedPrice.toFixed(2)}</p>
                  </div>
                )}
                </div>
                <div className={styles.coupenWrapper}>
                 <input type="text" placeholder="Enter Token" value={token} onChange={(e) => setToken(e.target.value)} disabled={discountApplied}/>
                 <span onClick={handleApplyClick}>Apply</span>
                  {errors && <p className={styles.error}>{error}</p>}
                  {success && <p className={styles.success}>{success}</p>}
                </div>
                <div className={styles.btnWrapper}>
                  <button className="global_button_one" type="submit">
                    <span>Checkout</span>
                  </button>
                </div>
                
              </>
            ) : (
              <p>No items in your order</p>
            )}
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EventTickets.propTypes = {
  eventId: PropTypes.string,
  toggleModal: PropTypes.func,
};

export default EventTickets;
