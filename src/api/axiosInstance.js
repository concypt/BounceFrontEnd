// import axios from "axios";
// import axiosRetry from "axios-retry";
// import { refreshAccessToken } from "./authService";

// // Create an axios instance
// const axiosInstance = axios.create({
//   baseURL: "https://api.bounce.live/api",
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;

//     if (status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             console.log("teekan:::", token);
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       if (originalRequest.url === "/refresh-access") {
//         originalRequest._retry = true;
//         return Promise.reject(error);
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise(function (resolve, reject) {
//         refreshAccessToken()
//           .then(({ token }) => {
//             //console.log("token:::", token);
//             axiosInstance.defaults.headers.common["Authorization"] =
//               "Bearer " + token;
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             processQueue(null, token);
//             resolve(axiosInstance(originalRequest));
//           })
//           .catch((err) => {
//             processQueue(err, null);
//             // If refresh token request fails with 401, propagate the error
//             if (err.response && err.response.status === 401) {
//               failedQueue = []; // Clear the queue to prevent further retries
//               return Promise.reject(
//                 new Error("Refresh token failed with status 401")
//               );
//             }
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// axiosRetry(axiosInstance, {
//   retries: 6,
//   retryCondition: (error) => {
//     //console.log(error.config.url);
//     // Retry on network error or 5xx server errors
//     // Do not retry if error response is 401 and it is from refresh token request
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       error.config._retry
//     ) {
//       return false;
//     }
//     return (
//       axiosRetry.isNetworkError(error) ||
//       axiosRetry.isRetryableError(error) ||
//       (error.response && error.response.status === 401)
//     );
//   },
// });

// // Instance for public API calls
// const axiosPInstance = axios.create({
//   baseURL: "https://api.bounce.live/api",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
//     Accept: "application/json",
//   },
// });

// export { axiosInstance, axiosPInstance };

// import axios from "axios";
// import axiosRetry from "axios-retry";
// import { refreshAccessToken } from "./authService";

// // Create an axios instance
// const axiosInstance = axios.create({
//   baseURL: "https://api.bounce.live/api",
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;

//     if (status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             console.log("teekan:::", token);
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       if (originalRequest.url === "/refresh-access") {
//         originalRequest._retry = true;
//         return Promise.reject(error);
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise(function (resolve, reject) {
//         refreshAccessToken()
//           .then(({ token }) => {
//             console.log("token:::", token);
//             if (!token) {
//               throw new Error("Token is undefined");
//             }

//             axiosInstance.defaults.headers.common["Authorization"] =
//               "Bearer " + token;
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             processQueue(null, token);
//             resolve(axiosInstance(originalRequest));
//           })
//           .catch((err) => {
//             processQueue(err, null);
//             // If refresh token request fails with 401, propagate the error
//             if (err.response && err.response.status === 401) {
//               failedQueue = []; // Clear the queue to prevent further retries
//               return Promise.reject(
//                 new Error("Refresh token failed with status 401")
//               );
//             }
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// axiosRetry(axiosInstance, {
//   retries: 6,
//   retryCondition: (error) => {
//     console.log("Retry condition error config url:", error.config.url);
//     // Retry on network error or 5xx server errors
//     // Do not retry if error response is 401 and it is from refresh token request
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       error.config._retry
//     ) {
//       return false;
//     }
//     return (
//       axiosRetry.isNetworkError(error) ||
//       axiosRetry.isRetryableError(error) ||
//       (error.response && error.response.status === 401)
//     );
//   },
// });

// // Instance for public API calls
// const axiosPInstance = axios.create({
//   baseURL: "https://api.bounce.live/api",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
//     Accept: "application/json",
//   },
// });

// export { axiosInstance, axiosPInstance };

import axios from "axios";
import axiosRetry from "axios-retry";
import { refreshAccessToken } from "./authService";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "https://bounce.extrasol.co.uk/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      if (originalRequest.url === "/refresh-access") {
        originalRequest._retry = true;
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        refreshAccessToken()
          .then(({ token }) => {
            if (!token) {
              throw new Error("Token is undefined");
            }

            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            originalRequest.headers["Authorization"] = "Bearer " + token;
            processQueue(null, token);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            if (err.response && err.response.status === 401) {
              failedQueue = [];
              return Promise.reject(
                new Error("Refresh token failed with status 401")
              );
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

axiosRetry(axiosInstance, {
  retries: 6,
  retryCondition: (error) => {
    console.log("Retry condition error config url:", error.config.url);
    if (
      error.response &&
      error.response.status === 401 &&
      error.config._retry
    ) {
      return false;
    }
    return (
      axiosRetry.isNetworkError(error) ||
      axiosRetry.isRetryableError(error) ||
      (error.response && error.response.status === 401)
    );
  },
});

// Instance for public API calls
const axiosPInstance = axios.create({
  baseURL: "https://api.bounce.live/api",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
    Accept: "application/json",
  },
});

export { axiosInstance, axiosPInstance };
