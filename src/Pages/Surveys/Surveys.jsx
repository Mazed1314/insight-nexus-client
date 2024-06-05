import SurveyCard from "./SurveyCard";

import useServey from "../../Hooks/useServey";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";

const Surveys = () => {
  const [survey, loading] = useServey();
  if (loading) return <LoadingSpinner />;
  console.log(survey);
  return (
    <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
      {survey.map((item) => (
        <>
          <SurveyCard item={item}></SurveyCard>
        </>
      ))}
    </div>
  );
};

export default Surveys;
