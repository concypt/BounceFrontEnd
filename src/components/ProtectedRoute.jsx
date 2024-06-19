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

const ProtectedRoute = () => {
  const { isAuthenticated, reToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          await reToken(); // This should be a silent login or token refresh
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated, reToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
