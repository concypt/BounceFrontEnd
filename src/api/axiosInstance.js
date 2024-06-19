import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bounce.extrasol.co.uk/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Important for cross-site cookie handling
});

// Instance for public API calls
const axiosPInstance = axios.create({
  baseURL: "https://bounce.extrasol.co.uk/api",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
    Accept: "application/json",
  },
});

export { axiosInstance, axiosPInstance };
// export default axiosInstance;
