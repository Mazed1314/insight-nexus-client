import LoadingSpinner from "../Component/Shared/LoadingSpinner";
import UseRole from "../Hooks/useRole";
import PropTypes from "prop-types";
import ErrorSurveyor from "../Pages/Dashboard/Surveyor/ErrorSurveyor";

const SurveyorRoute = ({ children }) => {
  const [role, isLoading] = UseRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "surveyor") return children;
  return (
    <>
      <ErrorSurveyor></ErrorSurveyor>{" "}
    </>
  );
};

export default SurveyorRoute;

SurveyorRoute.propTypes = {
  children: PropTypes.element,
};
