import LoadingSpinner from "../components/shared/LoadingSpinner";
import UseRole from "../hooks/useRole";
import PropTypes from "prop-types";
import ErrorSurveyor from "../components/dashboard/surveyor/ErrorSurveyor";

const SurveyorRoute = ({ children }) => {
  const [role, isLoading] = UseRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "surveyor") return children;
  return (
    <>
      <ErrorSurveyor />{" "}
    </>
  );
};

export default SurveyorRoute;

SurveyorRoute.propTypes = {
  children: PropTypes.element,
};
