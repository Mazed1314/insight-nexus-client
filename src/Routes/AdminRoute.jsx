import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import UseRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = UseRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
