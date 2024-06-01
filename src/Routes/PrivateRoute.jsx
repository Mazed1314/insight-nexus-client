import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <h2>please wait </h2>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <>
      <Navigate to="/login" state={{ from: location }} replace></Navigate>
    </>
  );
};

export default PrivateRoute;
