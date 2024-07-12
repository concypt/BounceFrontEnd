import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import DateTimePicker from "./DateTimePicker";
import { createTickets } from "../../api/secureService";
import HostTicketCard from "./HostTicketCard";
import iconPlus from "../../assets/images/plusgrey.svg";

const HostCreateTickets = ({ setFormStep, eventId }) => {
  const [tickets, setTickets] = useState([]);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(null);
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    ticket_start_time: "",
    ticket_end_time: "",
    ticket_type: "paid",
    price: 0,
    ticket_per_order: 1,
    quantity: 1,
    absorbe_fees: 0,
    ticket_status: 0,
  });

  const handleDateTimeChange = useCallback(({ startDate, endDate }) => {
    setTicketData((prevTicketData) => ({
      ...prevTicketData,
      ticket_start_time: startDate,
      ticket_end_time: endDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]:
        name === "price" ||
        name === "ticket_per_order" ||
        name === "quantity" ||
        name === "ticket_status"
          ? Number(value)
          : value,
    });
  };

  const isFormValid = () => {
    return Object.values(ticketData).every((field) => field !== "");
  };

  const handlePrev = () => {
    setFormStep(1);
  };

  const handleAddOrUpdateTicket = () => {
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
            index === currentTicketIndex ? ticketData : ticket
          );
          setTickets(updatedTickets);
          Swal.fire("Updated!", "Your ticket has been updated.", "success");
          resetForm();
        }
      });
    } else {
      setTickets([...tickets, ticketData]);
      resetForm();
    }
  };

  const handleEditTicket = (index) => {
    setTicketData(tickets[index]);
    setCurrentTicketIndex(index);
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
        setTickets(tickets.filter((_, i) => i !== index));
        Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
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
    }
  };

  const resetForm = () => {
    setTicketData({
      title: "",
      description: "",
      ticket_start_time: "",
      ticket_end_time: "",
      ticket_type: "paid",
      price: 0,
      ticket_per_order: 1,
      quantity: 1,
      absorbe_fees: 0,
      ticket_status: 0,
    });
    setCurrentTicketIndex(null);
  };

  const mutation = useMutation({
    mutationFn: (tickets) => createTickets(tickets, eventId),
    mutationKey: [createTickets],
    onSuccess: () => {
      Swal.fire("Success!", "All tickets have been saved.", "success");
      // Success actions
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to save tickets: ${error.message}`, "error");
      // Error actions
    },
  });

  const handleSaveAllTickets = () => {
    mutation.mutate(tickets);
  };

  return (
    <>
      <div className="form-card">
        <h2 className="fs-title">Manage Tickets</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="manageTickets">
              {tickets.map((ticket, index) => (
                <HostTicketCard
                  key={index}
                  ticket={ticket}
                  onDelete={() => handleDeleteTicket(index)}
                  onEdit={() => handleEditTicket(index)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  className={currentTicketIndex === index ? "highlight" : ""}
                />
              ))}
              <button
                className="plus-icon-box"
                onClick={() => setCurrentTicketIndex(null)}
              >
                <div className="plus-icon-circle">
                  <img src={iconPlus} alt="Plus Icon" className="plus-icon" />
                </div>
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ticketDetails">
              <div className="eventFields">
                <div className="eventLables">
                  <label className="fieldlabels">Ticket details</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter a descriptive name..."
                    value={ticketData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="eventLables status">
                  <label className="fieldlabels">Status</label>
                  <select
                    className="form-select form-select-lg"
                    aria-label=".form-select-lg example"
                    name="ticket_status"
                    value={ticketData.ticket_status}
                    onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="eventLables">
                <input
                  type="text"
                  name="description"
                  placeholder="Describe what’s included"
                  value={ticketData.description}
                  onChange={handleChange}
                />
                <div className="datetime">
                  <DateTimePicker
                    initialStartTime={ticketData.ticket_start_time}
                    initialEndTime={ticketData.ticket_end_time}
                    onDateTimeChange={handleDateTimeChange}
                  />
                </div>
                <div className="switch-container switchTickets">
                  <div
                    className={`ticketType ${
                      ticketData.ticket_type === "paid" ? "selected" : ""
                    }`}
                    onClick={() =>
                      setTicketData({
                        ...ticketData,
                        ticket_type: "paid",
                      })
                    }
                  >
                    Paid
                  </div>
                  <div
                    className={`ticketType ${
                      ticketData.ticket_type === "free" ? "selected" : ""
                    }`}
                    onClick={() =>
                      setTicketData({
                        ...ticketData,
                        ticket_type: "free",
                        price: "0",
                      })
                    }
                  >
                    Free
                  </div>
                  <div className={`highlight ${ticketData.ticket_type}`}></div>
                </div>
                <div
                  className="eventLables"
                  style={
                    ticketData.ticket_type === "paid"
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <label className="fieldlabels">Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price"
                    value={
                      ticketData.ticket_type === "free" ? "0" : ticketData.price
                    }
                    onChange={handleChange}
                    disabled={ticketData.ticket_type === "free"}
                  />
                </div>
                <div className="eventLables">
                  <label className="fieldlabels">Quantity available</label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    value={ticketData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="eventLables">
                  <label className="fieldlabels">
                    Max tickets per customer
                  </label>
                  <input
                    type="number"
                    name="ticket_per_order"
                    placeholder="0"
                    value={ticketData.ticket_per_order}
                    onChange={handleChange}
                  />
                </div>
                <div className="absorbFees">
                  <div className="toggleBtn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="absorbe_fees"
                        checked={ticketData.absorbe_fees === 1}
                        onChange={(e) =>
                          setTicketData({
                            ...ticketData,
                            absorbe_fees: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                      <div className="slider round"></div>
                    </label>
                    <p>Absorb Fee</p>
                  </div>
                  <h4>
                    Total cost:{" "}
                    {ticketData.ticket_type === "free"
                      ? "Free"
                      : `£${ticketData.price}`}
                  </h4>
                </div>
                <div className="ticketBtns">
                  <button className="loginButton" onClick={resetForm}>
                    <span>Cancel</span>
                  </button>
                  <button
                    className="loginButton"
                    onClick={handleAddOrUpdateTicket}
                    disabled={!isFormValid()}
                  >
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
          onClick={handlePrev}
          className="loginButton previous-create-event"
        >
          <span>Prev</span>
        </button>
        <button
          className="loginButton"
          type="button"
          onClick={handleSaveAllTickets}
        >
          <span>Save All Tickets</span>
        </button>
      </div>
    </>
  );
};

HostCreateTickets.propTypes = {
  setFormStep: PropTypes.func,
  eventId: PropTypes.number,
};

export default HostCreateTickets;
