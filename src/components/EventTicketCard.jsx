import PropTypes from "prop-types";
import styles from "./eventTicketCard.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const quantitySchema = (maxQuantity) =>
  z.object({
    quantity: z.coerce
      .number()
      .min(1, "Minimum quantity is 1")
      .max(maxQuantity, `Maximum quantity is ${maxQuantity}`),
  });

const EventTicketCard = ({
  ticket,
  handleAddToOrder,
  checkAvailabilityMutation,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quantitySchema(ticket.ticket_per_order)),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity");

  useEffect(() => {
    if (quantity > 0) {
      checkAvailabilityMutation.mutate({
        ticketId: ticket.id,
        quantity,
      });
    }
  }, [quantity]);

  const onSubmit = (data) => {
    handleAddToOrder(ticket, data.quantity);
  };

  return (
    <div className={styles.cardTicket}>
      <div className={styles.cardHeaderTicket}>
        <div className={styles.cardHeaderTicketContent}>
          {ticket.absorbe_fees === 0 && ticket.type === "paid" ? (
            <>
              <div className={styles.priceEuro}>
                £{(ticket.price - ticket.price * 0.9).toFixed(2)}
              </div>
              <div className={styles.feeEuro}>
                + £{(ticket.price * 0.9).toFixed(2)} Fee
              </div>
            </>
          ) : (
            <div className={styles.priceEuro}>£{ticket.price}</div>
          )}
        </div>
      </div>
      <div className={styles.cardBodyTicket}>
        <p className={styles.ticketName}>{ticket.name}</p>
        <p className={styles.ticketDescription}>{ticket.description}</p>
        <div className={styles.orderDiv}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              {...register("quantity")}
              placeholder="1"
              className={errors.quantity ? styles.inputError : ""}
            />
            <button type="submit" className="bgGlobalBtn borderGlobalBtn">
              <span>Add to order</span>
            </button>
            {errors.quantity && (
              <p className={styles.errorText}>{errors.quantity.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

EventTicketCard.propTypes = {
  ticket: PropTypes.object.isRequired,
  handleAddToOrder: PropTypes.func.isRequired,
  checkAvailabilityMutation: PropTypes.object.isRequired,
};

export default EventTicketCard;
