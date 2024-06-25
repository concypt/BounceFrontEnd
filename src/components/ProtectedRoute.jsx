// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "../contexts/UserProvider";

// const ProtectedRoute = () => {
//   const { isAuthenticated } = useContext(UserContext);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const ProtectedRoute = () => {
  const { isAuthenticated, reToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          //console.log("Not authenticated, trying to reToken");
          await reToken(); // This should be a silent login or token refresh
        }
        setLoading(false);
      } catch (error) {
        //console.error("Error during authentication check", error);
        setLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated, reToken]);

  if (loading) {
    return (
      <LoadingBar color="#7e79ff" height={3} progress={loading ? 100 : 0} />
    );
  }

  if (!isAuthenticated) {
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
