import { axiosInstance } from "./axiosInstance";


export const fetchMarketingData = async () => {
    try {
      const response = await axiosInstance.get("/user/all-marketing-list");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event data"
      );
    }
  };

  
//ViewSingleEvent.jsx
export const fetchSingleEventDetails = async (eventId) => {
    try {
      const response = await axiosInstance.get(`/user/all-orders?event_id=${eventId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
      );
    }
  };

  export const fetchEventTickets = async (eventId) => {
    try {
      const response = await axiosInstance.get(`/user/all-tickets/${eventId}`);
      return response.data.data.ticket;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
      );
    }
  };
  export const fetchEditData = async (id) => {
    
    try {
      const response = await axiosInstance.get(`/user/edit-subscribe-list/${id}`);
      
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
      );
    }
  };

  export const requestRefundAction = async (formData) => {
    console.log(formData)
    const response = await axiosInstance.post("/user/refund_action", formData);
    return response.data;
  };

  export const ticketsSend = async (formData) => {
    const response = await axiosInstance.post("/user/ticket-send", formData);
    return response.data;
  };
  export const subscriberList = async (formData) => {
    const response = await axiosInstance.post("/user/subscribe-list-create", formData);
    console.log(response);
    return response.data;
  };
  