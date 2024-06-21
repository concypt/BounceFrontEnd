import { axiosInstance } from "./axiosInstance";

//Dashboard after login
export const fetchBankDetails = async () => {
  const response = await axiosInstance.get("/user/bank-details");
  return response.data.data !== 1
    ? response.data.data
    : {
        bank_name: "",
        account_title: "",
        account_number: "",
        sort_code: "",
        iban: "",
        country: "1",
      };
};

export const updateBankDetails = async (bankDetails) => {
  const response = await axiosInstance.post(
    "/user/edit-bank-details",
    bankDetails
  );
  return response.data;
};

export const updateUserProfile = async (formDataToSend) => {
  const response = await axiosInstance.post(
    "/user/edit-profile",
    formDataToSend
  );
  return response.data;
};

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await axiosInstance.post("/user/change-password", {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateHostProfile = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/edit-profile", formData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update host profile"
    );
  }
};

//HostEvents.jsx
export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.get("/user/all-event");
    return response.data.data.events;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch events");
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/event-delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete event");
  }
};

//HostTicketOrders.jsx
export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get("/user/all-orders");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

//ApplyForHost.jsx
export const applyHost = async (formData) => {
  const response = await axiosInstance.post("/user/apply-host", formData);
  return response.data;
};

//Attend.jsx
export const fetchEventData = async () => {
  try {
    const response = await axiosInstance.get("/user/event-liked");

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch event data"
    );
  }
};

//HostSingleEventInfo.jsx
export const fetchEventDetails = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/user/event-edit/${eventId}`);
    return response.data.data.event;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch event details"
    );
  }
};

//HostSingleEventOrders
export const fetchTicketOrders = async (eventId) => {
  try {
    const response = await axiosInstance.get(
      `/user/all-orders?event_id=${eventId}`
    );
    return response.data.data; // Assuming data is structured as response.data.data
  } catch (error) {
    console.error("Error fetching ticket orders:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch ticket orders"
    );
  }
};

//Marketing.jsx
export const fetchMarketingData = async () => {
  try {
    const response = await axiosInstance.get("/user/all-marketing-list");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch marketing data"
    );
  }
};

//Component/Host/Marketing/EmailList
//This component needs two services: fetchTicketOrders and  deleteEvent
//services which we already have above with same api cal etc.

//discountCodes.jsx
export const fetchCoupons = async () => {
  const response = await axiosInstance.get("/user/coupon");
  return response.data;
};

export const addCoupon = async (formData) => {
  const response = await axiosInstance.post("/user/coupon", formData);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await axiosInstance.delete(`/user/coupon/${id}`);
  return response.data;
};

//subscribersList.jsx
export const fetchSubscribeList = async (token) => {
  const response = await axiosInstance.get("/user/all-subscribe-list", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data || [];
};

export const deleteSubscriber = async (id, token) => {
  const response = await axiosInstance.get(`/user/subscriber/delete/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//HostCreateEvent.jsx
export const createEvent = async (eventDataToSubmit) => {
  const formattedEventData = {
    ...eventDataToSubmit,
    category_id: Number(eventDataToSubmit.category_id),
    featured: Number(eventDataToSubmit.featured),
    lat: Number(eventDataToSubmit.lat),
    lang: Number(eventDataToSubmit.lang),
    radius: Number(eventDataToSubmit.radius),
    event_status: Number(eventDataToSubmit.event_status),
  };

  const response = await axiosInstance.post(
    "/user/event-create",
    formattedEventData
  );
  return response.data;
};

//HostCreateTickets.jsx
export const createTickets = async (ticketsDataToSubmit, eventId) => {
  const payload = {
    tickets: ticketsDataToSubmit,
    event_id: eventId,
  };

  const response = await axiosInstance.post("/user/ticket-create", payload);
  return response.data;
};
