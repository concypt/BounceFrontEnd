import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  createTickets,
  updateTicket,
  deleteTicket,
  updateTicketOrder,
} from "../../api/secureService";

// Create tickets mutation
const useCreateTickets = (eventId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tickets) => createTickets(tickets, eventId),
    onSuccess: () => {
      Swal.fire("Success!", "All tickets have been saved.", "success");
      queryClient.invalidateQueries(["tickets", eventId]); // Refetch to get the updated tickets
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to save tickets: ${error.message}`, "error");
    },
  });
};

// Update ticket mutation
const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatedTicket, ticketId }) =>
      updateTicket(updatedTicket, ticketId),
    onSuccess: (data, variables) => {
      Swal.fire("Success!", "Ticket has been updated.", "success");
      queryClient.invalidateQueries(["tickets", variables.eventId]); // Refetch to get the updated tickets
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to update ticket: ${error.message}`, "error");
    },
  });
};

// Delete ticket mutation
const useDeleteTicket = (eventId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId) => deleteTicket(ticketId),
    onSuccess: () => {
      Swal.fire("Deleted!", "Ticket has been deleted.", "success");
      queryClient.invalidateQueries(["tickets", eventId]); // Refetch to get the updated tickets
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to delete ticket: ${error.message}`, "error");
    },
  });
};

// Update ticket order mutation
const useUpdateTicketOrder = (eventId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketIds) => updateTicketOrder(ticketIds),
    onSuccess: () => {
      Swal.fire("Success!", "Ticket order has been updated.", "success");
      queryClient.invalidateQueries(["tickets", eventId]); // Refetch to get the updated tickets
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        `Failed to update ticket order: ${error.message}`,
        "error"
      );
    },
  });
};

export {
  useCreateTickets,
  useUpdateTicket,
  useDeleteTicket,
  useUpdateTicketOrder,
};
