import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const HighComp = ({ children }) => {
  const token = Cookies.get("authToken");

  if (token) {
    return <Navigate to="/product" />;
  }

  return children;
};
export default HighComp;
