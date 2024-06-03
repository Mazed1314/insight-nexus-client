import SurveyCard from "./SurveyCard";

import useServey from "../../Hooks/useServey";

const Surveys = () => {
  const [survey, loading] = useServey();
  if (loading) return "wait";
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
