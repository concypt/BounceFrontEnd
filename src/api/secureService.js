import { event } from "jquery";
import { axiosInstance } from "./axiosInstance";
import { array } from "prop-types";

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

//create event, update and getevent by id
export const getEvent = async (eventId) => {
  const response = await axiosInstance.get(`/user/event-edit/${eventId}`);
  return response.data.data.event;
};

export const createEvent = async (eventDataToSubmit) => {
  const formData = new FormData();
  console.log(eventDataToSubmit);
  // Append other fields to the FormData object
  Object.keys(eventDataToSubmit).forEach((key) => {
    if (key !== "gallery" && key !== "tag") {
      // Skip the gallery and tags fields for now
      formData.append(key, eventDataToSubmit[key]);
    }
  });

  // Append number fields explicitly if needed
  formData.append("category_id", Number(eventDataToSubmit.category_id));
  formData.append("featured", Number(eventDataToSubmit.featured));
  formData.append("lat", Number(eventDataToSubmit.lat));
  formData.append("lang", Number(eventDataToSubmit.lang));
  formData.append("radius", Number(eventDataToSubmit.radius));
  formData.append("event_status", Number(eventDataToSubmit.status));

  // Append tags as an array or an empty array
  const tag = eventDataToSubmit.tag || [];
  tag.forEach((ta, index) => {
    formData.append(`tag[${index}]`, ta);
  });

  // Append each file in the gallery array to the FormData object
  //console.log(eventDataToSubmit);
  // Append gallery as an array of files or an empty array
  const gallery = eventDataToSubmit.gallery || [];
  gallery.forEach((imageObj, index) => {
    formData.append(`gallery[${index}]`, imageObj.file); // Append the actual File object
  });

  // Ensure gallery or tag is sent even if it's empty
  if (gallery.length === 0) {
    formData.append("gallery", []);
  }
  if (tag.length === 0) {
    formData.append("tag", []);
  }

  //this is how we can console formData
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  const response = await axiosInstance.post("/user/event-create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateEvent = async (eventDataToSubmit, eventId) => {
  const formData = new FormData();

  // Append other fields to the FormData object
  Object.keys(eventDataToSubmit).forEach((key) => {
    if (key !== "gallery" && key !== "tag") {
      formData.append(key, eventDataToSubmit[key]);
    }
  });

  // Append number fields explicitly if needed
  formData.append("category_id", Number(eventDataToSubmit.category_id));
  formData.append("featured", Number(eventDataToSubmit.featured));
  formData.append("lat", Number(eventDataToSubmit.lat));
  formData.append("lang", Number(eventDataToSubmit.lang));
  formData.append("radius", Number(eventDataToSubmit.radius));
  formData.append("event_status", Number(eventDataToSubmit.status));

  // Append tags as an array or an empty array
  const tag = eventDataToSubmit.tag || [];
  tag.forEach((ta, index) => {
    formData.append(`tag[${index}]`, ta);
  });

  // Ensure tags are sent even if it's empty
  if (tag.length === 0) {
    formData.append("tag", []);
  }

  const response = await axiosInstance.post(
    `/user/event-update/${eventId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const addPicturesToEvent = async (images, eventId) => {
  const formData = new FormData();
  images.forEach((imageObj, index) => {
    if (imageObj.file != null) {
      formData.append(`gallery[${index}]`, imageObj.file);
    }
  });

  formData.append("event_id", eventId);

  //this is how we can console formData
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  // }

  const response = await axiosInstance.post(`/user/event-gallery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePicturesFromEvent = async (imageIds, eventId) => {
  const formData = new FormData();

  //formData.append("images", imageIds);

  for (var i = 0; i < imageIds.length; i++) {
    formData.append("images[]", imageIds[i]);
  }

  formData.append("event_id", eventId);
  //this is how we can console formData
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  // }
  const response = await axiosInstance.post(
    `/user/remove-gallery-image`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

//HostCreateTickets.jsx
export const createTickets = async (ticketsDataToSubmit, eventId) => {
  let ticketsArray;

  if (Array.isArray(ticketsDataToSubmit)) {
    ticketsArray = ticketsDataToSubmit;
  } else if (typeof ticketsDataToSubmit === "object") {
    ticketsArray = [ticketsDataToSubmit];
  } else {
    throw new Error("Invalid ticketsDataToSubmit type");
  }

  const payload = {
    tickets: ticketsArray,
    event_id: eventId,
  };

  const response = await axiosInstance.post("/user/ticket-create", payload);
  return response.data;
};

export const getTicketsByEventId = async (eventId) => {
  const response = await axiosInstance.get(`/user/all-tickets/${eventId}`);

  return response.data.data.ticket;
};

export const updateTicket = async (updatedTicket, ticketId) => {
  const response = await axiosInstance.post(
    `/user/ticket-update/${ticketId}`,
    updatedTicket
  );
  return response.data;
};

export const deleteTicket = async (ticketId) => {
  const response = await axiosInstance.get(`/user/ticket-delete/${ticketId}`);
  return response.data;
};

export const updateTicketOrder = async (ticketIds) => {
  const payload = {
    ticket_ids: ticketIds,
  };

  const response = await axiosInstance.post(
    "/user/tickets/update-order",
    payload
  );
  return response.data;
};

//FollowUnfollowBtn.jsx
export const followUnfollow = async (organisationId) => {
  console.log(organisationId);
  const response = await axiosInstance.get(
    `user/add-followList/${organisationId}`
  );
  //console.log(response);
  return response.data;
};

//FollowUnfollowBtn.jsx
export const likeToggle = async (eventId) => {
  const response = await axiosInstance.get(`user/add-favorite/${eventId}`);
  return response.data;
};
