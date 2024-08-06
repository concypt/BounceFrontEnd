// import { axiosInstance } from "./axiosInstance";

// export const login = async (credentials) => {
//   try {
//     const response = await axiosInstance.post("/login", credentials);
//     return {
//       token: response.data.data.access_token,
//       user: response.data.data,
//     };
//   } catch (error) {
//     throw new Error("Login failed");
//   }
// };

// export const logout = async () => {
//   try {
//     const response = await axiosInstance.get("/user/logout");
//     return response.data;
//   } catch (error) {
//     throw new Error("Logout failed");
//   }
// };

// export const refreshAccessToken = async () => {
//   try {
//     const response = await axiosInstance.get("/refresh-access");
//     //console.log("re re re", response.data.access_token);
//     return { token: response.data.access_token };
//   } catch (error) {
//     console.error("Error refreshing token", error);
//     throw error; // Ensure the error is thrown
//   }
// };

// export const fetchUserProfile = async (token) => {
//   console.log(token.token);
//   try {
//     const response = await axiosInstance.get("/user/profile", {
//       headers: {
//         Authorization: `Bearer ${token.token}`,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     throw new Error("Fetching user profile failed");
//   }
// };

import { axiosInstance } from "./axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return {
      token: response.data.data.access_token,
      user: response.data.data,
    };
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/user/logout");
    return response.data;
  } catch (error) {
    throw new Error("Logout failed");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get("/refresh-access");
    //console.log("refreshed token:::", response.data.access_token);
    return { token: response.data.access_token };
  } catch (error) {
    console.error("Error refreshing token", error);
    throw error;
  }
};

export const fetchUserProfile = async (token) => {
  //console.log(token);
  try {
    const response = await axiosInstance.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Fetching user profile failed");
  }
};
