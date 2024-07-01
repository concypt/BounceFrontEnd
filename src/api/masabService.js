import { axiosInstance } from "./axiosInstance";
import { axiosPInstance } from "./axiosInstance";

export const fetchEarningsData = async () => {
  try {
    const response = await axiosInstance.get("/user/events-earning");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch marketing data"
    );
  }
};

export const requestRefund = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/request-refund", formData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to request refund"
    );
  }
};

// contact us public service
export const contactUsForm = async (formData) => {
  try {
    const response = await axiosPInstance.post(
      "/attenders/contact-us",
      formData
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit contact form"
    );
  }
};
