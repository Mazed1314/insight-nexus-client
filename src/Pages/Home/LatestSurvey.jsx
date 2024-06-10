import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import useSurvey from "../../Hooks/useSurvey";
import SurveyCard from "../Surveys/SurveyCard";

const LatestSurvey = () => {
  const [survey, loading] = useSurvey();
  if (loading) return <LoadingSpinner />;
  return (
    <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
      {survey?.slice(0, 6).map((item) => (
        <>
          <SurveyCard key={item._id} item={item}></SurveyCard>
        </>
      ))}
    </div>
  );
};

export default LatestSurvey;
