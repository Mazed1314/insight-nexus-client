import SurveyCard from "./SurveyCard";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import useSurvey from "../../Hooks/useSurvey";

const Surveys = () => {
  const [survey, loading] = useSurvey();
  if (loading) return <LoadingSpinner />;
  // console.log(survey);
  return (
    <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
      {survey?.map((item, index) => (
        <>
          <SurveyCard key={index} item={item}></SurveyCard>
        </>
      ))}
    </div>
  );
};

export default Surveys;
