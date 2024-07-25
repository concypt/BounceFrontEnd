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
  export const getSubscriberList = async () => {
    try {
      const response = await axiosInstance.get("/user/campaign/create");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event data"
      );
    }
  };
  export const createCampaign = async (formData) => {
    const response = await axiosInstance.post("/user/campaign", formData);
    return response.data;
  };
  export const subscriberListPostData = async (formData) => {

    const response = await axiosInstance.post("/user/subscriber/import", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  };
  export const updateCampaign = async (formData) => {
    const campaign_id = formData.campaign_id;
    const response = await axiosInstance.put(`/user/campaign/${campaign_id}`, formData);
    return response.data;
  };
  export const SendCampaign = async (campaign_id) => {
    try {
      const response = await axiosInstance.get(`/user/campaigns/send/${campaign_id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
      );
    }
  };
  export const fetchCampaignData = async ({ queryKey }) => {
    const [, campaign_id] = queryKey;
    try {
      const response = await axiosInstance.get(`/user/campaign/${campaign_id}/edit`);
      return response.data.data.campaign;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
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
    const response = await axiosInstance.post("/user/refund_action", formData);
    return response.data;
  };

  export const ticketsSend = async (formData) => {
    const response = await axiosInstance.post("/user/ticket-send", formData);
    return response.data;
  };
 
  export const subscriberList = async (formData) => {
    const response = await axiosInstance.post("/user/subscribe-list-create", formData);
    return response.data;
  };
  export const fetchSubscribeList = async (subscribelist_Id) => {
    try {
      const response = await axiosInstance.get(`/user/view-list-update/${subscribelist_Id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch event details"
      );
    }
  };
  export const deleteSubscriber = async (id) => {
    const response = await axiosInstance.get(`/user/subscriber/delete/${id}`);
    return response.data;
  };
  