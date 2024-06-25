// import {
//   createContext,
//   useContext,
//   useEffect,
//   useLayoutEffect,
//   useState,
// } from "react";
// import PropTypes from "prop-types";
// import { axiosInstance } from "../api/axiosInstance";
// import {
//   refreshAccessToken,
//   login as loginService,
//   logout as logoutService,
//   fetchUserProfile,
// } from "../api/authService";

// export const UserContext = createContext();

// export const useAuth = () => {
//   const userContext = useContext(UserContext);
//   if (!userContext) {
//     throw new Error("useAuth must be used with a UserProvider");
//   }
//   return userContext;
// };

// const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const updateUser = (data) => {
//     setUser(data.data);
//   };

//   const login = async (credentials) => {
//     try {
//       const data = await loginService(credentials);
//       setToken(data.token); // Save token to state
//       setUser(data.user);
//       setIsAuthenticated(true);
//       return data.user;
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutService();
//       setToken(null);
//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const reToken = async () => {
//     try {
//       const newToken = await refreshAccessToken();
//       setToken(newToken);
//       const userData = await fetchUserProfile(newToken);
//       setUser(userData);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error(error);
//       setIsAuthenticated(false);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await fetchUserProfile(token);
//         setUser(userData);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Fetch user profile failed:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     if (token) {
//       fetchUser();
//     }
//   }, [token]);

//   useLayoutEffect(() => {
//     const authInterceptor = axiosInstance.interceptors.request.use((config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     return () => {
//       axiosInstance.interceptors.request.eject(authInterceptor);
//     };
//   }, [token]);

//   useLayoutEffect(() => {
//     const refreshInterceptor = axiosInstance.interceptors.response.use(
//       (response) => response,

//       async (error) => {
//         const originalRequest = error.config;

//         if (
//           error.response &&
//           error.response.status === 401 &&
//           !originalRequest._retry
//         ) {
//           originalRequest._retry = true;
//           try {
//             const newToken = await refreshAccessToken();
//             setToken(newToken);
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             return axiosInstance(originalRequest);
//           } catch (refreshError) {
//             console.log("refresh error from interceptor");
//             setToken(null);
//             setIsAuthenticated(false);
//             return Promise.reject(refreshError);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosInstance.interceptors.response.eject(refreshInterceptor);
//     };
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         login,
//         logout,
//         token,
//         reToken,
//         updateUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default UserProvider;

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "../api/axiosInstance";
import {
  refreshAccessToken,
  login as loginService,
  logout as logoutService,
  fetchUserProfile,
} from "../api/authService";

export const UserContext = createContext();

export const useAuth = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useAuth must be used with a UserProvider");
  }
  return userContext;
};

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUser = (data) => {
    setUser(data);
  };

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("isUserNav", true);
      return data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.setItem("isUserNav", false);
      localStorage.removeItem("followingArray");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const reToken = async () => {
    try {
      const newToken = await refreshAccessToken();

      setToken(newToken);
      const userData = await fetchUserProfile(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("isUserNav", true);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.setItem("isUserNav", false);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserProfile(token);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("isUserNav", true);
      } catch (error) {
        console.error("Fetch user profile failed:", error);
        setIsAuthenticated(false);
        localStorage.setItem("isUserNav", false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        token,
        updateUser,
        reToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
