import { axiosInstance } from "./axiosInstance";
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
