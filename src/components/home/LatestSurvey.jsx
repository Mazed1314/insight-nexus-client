import LoadingSpinner from "../shared/LoadingSpinner";
import useSurvey from "../../hooks/useSurvey";
import SurveyCard from "../surveys/SurveyCard";

const LatestSurvey = () => {
  const [survey, loading] = useSurvey();
  if (loading) return <LoadingSpinner />;
  return (
    <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
      {survey
        ?.sort((a, b) => {
          return new Date(b.publishDate) - new Date(a.publishDate);
        })
        .slice(0, 6)
        .map((item) => (
          <>
            <SurveyCard key={item._id} item={item}></SurveyCard>
          </>
        ))}
    </div>
  );
};

export default LatestSurvey;
