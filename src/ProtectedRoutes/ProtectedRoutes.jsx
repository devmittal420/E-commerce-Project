import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = Cookies.get("authToken");

  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoutes;
