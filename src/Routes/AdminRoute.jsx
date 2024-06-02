import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";
import UseRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = UseRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/surveys" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
