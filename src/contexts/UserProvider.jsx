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
  deactivateAccount as deactivateAccountService,
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
      localStorage.removeItem("favEvents");
      localStorage.removeItem("favBlogs");
      localStorage.removeItem("redirectPath");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  const deactivateAccount = async () => {
    try {
      await deactivateAccountService();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.setItem("isUserNav", false);
      localStorage.removeItem("followingArray");
      localStorage.removeItem("favEvents");
      localStorage.removeItem("favBlogs");
      localStorage.removeItem("redirectPath");
    } catch (error) {
      console.error("Something Wrong:", error);
      throw error;
    }
  };

  const reToken = async () => {
    try {
      const newToken = await refreshAccessToken();

      setToken(newToken.token);
      const userData = await fetchUserProfile(newToken.token);
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
        deactivateAccount,
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
