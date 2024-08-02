// export default HostCreateTickets;
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "./DateTimePicker";
import { getTicketsByEventId } from "../../api/secureService";
import {
  useCreateTickets,
  useUpdateTicket,
  useDeleteTicket,
  useUpdateTicketOrder,
} from "./HostTicketsMutations";

import HostTicketCard from "./HostTicketCard";
import iconPlus from "../../assets/images/plusgrey.svg";

function separateDateTime(datetimeString) {
  if (!datetimeString || !datetimeString.includes("T")) return "";

  // Split the datetime string into date and time components
  const [date, timeWithMs] = datetimeString.split("T");

  // Remove the milliseconds and timezone part from the time component
  const time = timeWithMs.split(".")[0].slice(0, 5);

  const dateTime = date + " " + time;

  return dateTime;
}

const getDefaultStartDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // Extract date part
  return `${date}T00:00`; // Append "T00:00"
};

const getDefaultEndDateTime = () => {
  const now = new Date();
  now.setDate(now.getDate() + 7); // Add 7 days
  const date = now.toISOString().split("T")[0]; // Extract date part
  return `${date}T00:00`; // Append "T00:00"
};

const ticketSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  type: z.enum(["paid", "free"]),
  price: z.coerce.number().nonnegative(),
  service_fee: z.number().nonnegative().optional(),
  ticket_per_order: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
  absorbe_fees: z.enum(["0", "1"]),
  status: z.coerce.number().default(0),
  is_deleted: z.number().nonnegative().optional(),
  order: z.number().nonnegative().optional(),
  id: z.coerce.number().nonnegative().optional(),
});

const HostCreateTickets = ({ setFormStep, eventId }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      type: "paid",
      price: 0,
      dummyprice: 0,
      ticket_per_order: 1,
      quantity: 1,
      absorbe_fees: "0",
      status: "0",
      is_deleted: 0,
      order: 0,
      id: 0,
    },
  });

  const [tickets, setTickets] = useState([]);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(null);

  const type = watch("type");
  const absorbeFees = watch("absorbe_fees");
  const price = watch("price");
  const navigate = useNavigate();

  // Fetch existing tickets data using React Query
  const { data: existingTickets, refetch } = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => getTicketsByEventId(eventId),
    enabled: !!eventId,
  });

  if (existingTickets && existingTickets.length == 0) {
    //navigate(`/dashboard-event`);
    Swal.fire({
      icon: "error",
      title: "Unauthorized Access",
      text: "You do not have permission to access this ticket.",
      confirmButtonText: "Okay",
    });
  }

  const { mutate: createTicketsMutate } = useCreateTickets(eventId);
  const { mutate: updateTicketMutate } = useUpdateTicket();
  const { mutate: deleteTicketMutate } = useDeleteTicket(eventId);
  const { mutate: updateTicketOrderMutate } = useUpdateTicketOrder(eventId);

  // useEffect(() => {
  //   if (existingTickets) {
  //     setTickets(
  //       existingTickets.map((ticket, index) => ({ ...ticket, order: index }))
  //     );
  //   }
  // }, [existingTickets]);

  useEffect(() => {
    if (existingTickets) {
      const updatedTickets = existingTickets.map((ticket, index) => ({
        ...ticket,
        absorbe_fees: String(ticket.absorbe_fees), // Convert absorbe_fees to string
        order: index,
      }));
      setTickets(updatedTickets);
    }
  }, [existingTickets]);

  const handleDateTimeChange = useCallback(
    ({ startDate, endDate }) => {
      setValue("start_time", startDate);
      setValue("end_time", endDate);
    },
    [setValue]
  );

  const handleAddOrUpdateTicket = (data) => {
    console.log("handleAddOrUpdateTicket::: data:::", data);
    if (currentTicketIndex !== null) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this ticket?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTickets = tickets.map((ticket, index) =>
            index === currentTicketIndex ? { ...data, order: index } : ticket
          );
          setTickets(updatedTickets);
          updateTicketMutate({ updatedTicket: data, ticketId: data.id });

          resetForm();
        }
      });
    } else {
      setTickets([...tickets, { ...data, order: tickets.length }]);
      createTicketsMutate(data);
      resetForm();
    }
  };

  const handleSaveAllTickets = () => {
    createTicketsMutate(tickets);
  };

  const handleEditTicket = (index) => {
    const ticket = tickets[index];
    for (const [key, value] of Object.entries(ticket)) {
      setValue(key, value);
    }
    const tPrice = parseFloat(ticket.price);
    setValue(
      "dummyprice",
      ticket.absorbe_fees === "1" || ticket.absorbe_fees === 1
        ? tPrice.toFixed(2)
        : (tPrice / 1.1).toFixed(2)
    );

    setCurrentTicketIndex(index);
  };

  const resetForm = () => {
    // reset();
    reset({
      name: "",
      description: "",
      start_time: getDefaultStartDateTime(),
      end_time: getDefaultEndDateTime(),
      type: "paid",
      price: 0,
      ticket_per_order: 1,
      quantity: 1,
      absorbe_fees: "0",
      status: "0",
      order: tickets.length,
    });
    setCurrentTicketIndex(null);
  };

  const handleDeleteTicket = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTicketMutate(tickets[index].id);
        setTickets(tickets.filter((_, i) => i !== index));
        //Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
      }
    });
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newTickets = [...tickets];
      [newTickets[index], newTickets[index - 1]] = [
        newTickets[index - 1],
        newTickets[index],
      ];
      setTickets(newTickets);
      updateTicketOrderMutate(newTickets.map((ticket) => ticket.id));
      resetForm();
    }
  };

  const handleMoveDown = (index) => {
    if (index < tickets.length - 1) {
      const newTickets = [...tickets];
      [newTickets[index], newTickets[index + 1]] = [
        newTickets[index + 1],
        newTickets[index],
      ];
      setTickets(newTickets);
      updateTicketOrderMutate(newTickets.map((ticket) => ticket.id));
      resetForm();
    }
  };

  const handleEventEdit = () => {
    navigate(`/host-event/edit/${eventId}`);
  };

  useEffect(() => {
    if (type === "free") {
      setValue("price", 0);
      setValue("absorbe_fees", "0");
    } else {
      const dummyprice = parseFloat(getValues("dummyprice"));
      //console.log(typeof dummyprice, "  -  ", absorbeFees);
      setValue(
        "price",
        absorbeFees === 0 || absorbeFees === "0"
          ? (dummyprice * 1.1).toFixed(2)
          : dummyprice.toFixed(2)
      );
    }
  }, [type, absorbeFees, setValue, getValues]);

  return (
    <form onSubmit={handleSubmit(handleAddOrUpdateTicket)}>
      <div className="form-card">
        <h2 className="fs-title">Manage Tickets</h2>
        <div className="row">
          <div className="col-xl-6">
            <div className="manageTickets">
              {tickets.map((ticket, index) => (
                <HostTicketCard
                  key={index}
                  ticket={ticket}
                  onDelete={() => handleDeleteTicket(index)}
                  onEdit={() => handleEditTicket(index)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  isCurrent={currentTicketIndex === index ? "active" : ""}
                />
              ))}
              <button
                className="plus-icon-box"
                type="button"
                onClick={() => resetForm()}
              >
                <div className="plus-icon-circle">
                  <img src={iconPlus} alt="Plus Icon" className="plus-icon" />
                </div>
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ticketDetails">
              <div className="eventFields">
                <div className="eventLables">
                  <label className="fieldlabels">Ticket details</label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Enter a descriptive name..."
                        {...field}
                      />
                    )}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="eventLables status">
                  <label className="fieldlabels">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="form-select form-select-lg">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    )}
                  />
                  {errors.status && <p>{errors.status.message}</p>}
                </div>
              </div>
              <div className="eventLables">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Describe what’s included"
                      {...field}
                    />
                  )}
                />
                {errors.description && <p>{errors.description.message}</p>}
                <div className="datetime">
                  <DateTimePicker
                    initialStartTime={separateDateTime(getValues("start_time"))}
                    initialEndTime={separateDateTime(getValues("end_time"))}
                    onDateTimeChange={handleDateTimeChange}
                  />
                  {errors.start_time && <p>{errors.start_time.message}</p>}
                  {errors.end_time && <p>{errors.end_time.message}</p>}
                </div>
                <div className="switch-container switchTickets">
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div
                          className={`ticketType ${
                            field.value === "paid" ? "selected" : ""
                          }`}
                          onClick={() => field.onChange("paid")}
                        >
                          Paid
                        </div>
                        <div
                          className={`ticketType ${
                            field.value === "free" ? "selected" : ""
                          }`}
                          onClick={() => field.onChange("free")}
                        >
                          Free
                        </div>
                        <div className={`highlight ${field.value}`}></div>
                      </>
                    )}
                  />
                  {errors.type && <p>{errors.type.message}</p>}
                </div>

                <div className="event-ticket-three-field-grid">
                  <div
                    className="eventLables"
                    style={
                      getValues("type") === "paid"
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <label className="fieldlabels">Price</label>
                    <Controller
                      name="dummyprice"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                          disabled={getValues("type") === "free"}
                          onChange={(e) => {
                            const newDummyPrice =
                              parseFloat(e.target.value) || 0;

                            const absorbeFees =
                              getValues("absorbe_fees").trim();
                            let newPrice = newDummyPrice;

                            // If absorbe_fees is "0", add 10% to the dummy price
                            if (absorbeFees === "0" || absorbeFees === 0) {
                              newPrice = (newDummyPrice * 1.1).toFixed(2);
                            }

                            // Update both dummyprice and price fields
                            setValue("dummyprice", newDummyPrice);
                            setValue("price", newPrice);
                          }}
                        />
                      )}
                    />

                    {type == "paid" ? (
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="hidden"
                            {...field}
                            disabled={getValues("type") === "free"}
                          />
                        )}
                      />
                    ) : (
                      ""
                    )}
                    {errors.price && <p>{errors.price.message}</p>}
                  </div>

                  <div className="eventLables">
                    <label className="fieldlabels">Quantity available</label>
                    <Controller
                      name="quantity"
                      control={control}
                      render={({ field }) => (
                        <input type="number" placeholder="0" {...field} />
                      )}
                    />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                  </div>
                  <div className="eventLables">
                    <label className="fieldlabels">
                      Max tickets per customer
                    </label>
                    <Controller
                      name="ticket_per_order"
                      control={control}
                      render={({ field }) => (
                        <input type="number" placeholder="0" {...field} />
                      )}
                    />
                    {errors.ticket_per_order && (
                      <p>{errors.ticket_per_order.message}</p>
                    )}
                  </div>
                </div>
                <div className="absorbFees">
                  {type == "paid" ? (
                    <div className="toggleBtn">
                      <label className="switch">
                        <Controller
                          name="absorbe_fees"
                          control={control}
                          render={({
                            field: { value, onChange, ...field },
                          }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={value === "1" || value === 1}
                              onChange={(e) =>
                                onChange(e.target.checked ? "1" : "0")
                              }
                            />
                          )}
                        />
                        <div className="slider round"></div>
                      </label>
                      <p>Absorb Fee</p>
                      {errors.absorbe_fees && (
                        <p>{errors.absorbe_fees.message}</p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <h4>Total cost: {type === "free" ? "Free" : `£ ${price}`}</h4>
                </div>
                <div className="ticketBtns">
                  <button
                    className="loginButton"
                    type="button"
                    onClick={resetForm}
                  >
                    <span>Cancel</span>
                  </button>
                  <button className="loginButton" type="submit">
                    <span>
                      {currentTicketIndex !== null ? "Update" : "Add"} ticket
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="multistep-button-wrap">
        <button
          onClick={handleEventEdit}
          className="loginButton previous-create-event"
          type="button"
        >
          <span>Edit event</span>
        </button>
      </div>
    </form>
  );
};

HostCreateTickets.propTypes = {
  setFormStep: PropTypes.func,
  eventId: PropTypes.number,
};

export default HostCreateTickets;
