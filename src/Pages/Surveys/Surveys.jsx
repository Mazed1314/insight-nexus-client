import SurveyCard from "./SurveyCard";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import useSurvey from "../../Hooks/useSurvey";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const Surveys = () => {
  const [survey, loading] = useSurvey();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredSurveys, setFilteredSurveys] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredSurveys(
        survey.filter((item) => item.category === selectedCategory)
      );
    } else {
      setFilteredSurveys(survey);
    }
  }, [survey, selectedCategory]);

  // console.log(filteredSurveys);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="">
      <div className="my-6 flex justify-end w-11/12 mx-auto items-end gap-4">
        {/* <select className="select select-bordered select-xs ">
          <option disabled selected>
            Short by vote
          </option>
          <option>High to low</option>
          <option>Low to high</option>
        </select> */}

        <label>
          <div className="label">
            <span className="label-text">Filtered by category</span>
          </div>
          <select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            name="category"
            className="rounded-md border border-black"
          >
            <option value="">All</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Parenting">Parenting</option>
            <option value="Finance">Finance</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
        {filteredSurveys?.map((item, index) => (
          <>
            <Fade direction="down">
              <SurveyCard key={index} item={item}></SurveyCard>
            </Fade>
          </>
        ))}
      </div>
    </div>
  );
};

export default Surveys;
