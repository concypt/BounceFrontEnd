import { axiosPInstance } from "./axiosInstance";

//Register.jsx
export const registerUser = async (formData) => {
  try {
    const response = await axiosPInstance.post("/register", formData);
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.errors
      ? Object.values(error.response.data.errors).flat().join("<br>")
      : error.response?.data?.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

//ForgotPasswordRequest.jsx
export const requestPasswordReset = async (email) => {
  try {
    const response = await axiosPInstance.post("/forget-password", { email });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Password reset failed";
    throw new Error(errorMessage);
  }
};

//Verification.jsx
export const verifyOTP = async ({ otp, token }) => {
  const response = await axiosPInstance.post(
    "/user/verify-email",
    { otp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const resendOTP = async (token) => {
  const response = await axiosPInstance.get("/user/resend-otp", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//GlobalProvider CatContext
export const fetchCategories = async () => {
  const { data } = await axiosPInstance
    .get("/attenders/categories")
    .then((res) => res.data);
  return data;
};

//SingleEvent.jsx
export const fetchEventDetails = async (eventId) => {
  const { data } = await axiosPInstance
    .get(`/attenders/event-detail/${eventId}`)
    .then((res) => res.data);
  return data;
};

//Home.jsx
export const fetchHomeData = async () => {
  const { data } = await axiosPInstance
    .get("/attenders/home-content")
    .then((res) => res.data);
  return data;
};

//SingleNews.jsx
export const fetchNewsDetails = async (newsId) => {
  const { data } = await axiosPInstance
    .get(`/attenders/news-details/${newsId}`)
    .then((res) => res.data);
  return data;
};

//News.jsx
export const fetchNews = async () => {
  const { data } = await axiosPInstance
    .get(`/attenders/news`)
    .then((res) => res.data);
  return data;
};
