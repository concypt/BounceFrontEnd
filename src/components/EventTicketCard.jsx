import PropTypes from "prop-types";
import styles from "./eventTicketCard.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { fetchSetting } from "../api/publicService";

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
  const {
    data: settings
  } = useQuery({
    queryKey: ["fetchSetting "],
    queryFn: fetchSetting 
  });
 const orgCommisition = settings?.org_commission || 91;
 const resultOrgCommisition = (1 + (100 - orgCommisition) / 100);
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
const netPrice = ticket.price / resultOrgCommisition
  return (
    <div className={styles.cardTicket}>
      <div className={styles.cardHeaderTicket}>
        <div className={styles.cardHeaderTicketContent}>
          {ticket.type === "paid" ? (
            <>
              <div className={styles.priceEuro}>
                £{(netPrice).toFixed(2)}
              </div>
              <div className={styles.feeEuro}>
                + £{(ticket.price - netPrice).toFixed(2)} Fee
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
                {ticket.available_qty > 0 ? (
            <button type="submit" className="bgGlobalBtn borderGlobalBtn">
              <span>Add to order</span>
            </button>
          ) : (
            <button type="button" className="bgGlobalBtn borderGlobalBtn" disabled>
              <span>Sold Out</span>
            </button>
          )}
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
