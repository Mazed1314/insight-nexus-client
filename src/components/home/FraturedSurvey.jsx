import LoadingSpinner from "../shared/LoadingSpinner";
import useSurvey from "../../hooks/useSurvey";
import SurveyCard from "../surveys/SurveyCard";
import { motion } from "framer-motion";
import "../../App.css";

const FraturedSurvey = () => {
  const [survey, loading] = useSurvey();
  if (loading) return <LoadingSpinner />;

  return (
    <div className="overflow-hidden mask-gradient flex flex-col md:flex-row items-center justify-center gap-4 max-h-[738px]">
      {/* {survey?.slice(0, 6).map((item) => (
        <>
          <SurveyCard key={item._id} item={item}></SurveyCard>
        </>
      ))} */}

      {/* first col */}
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <div className="flex flex-col gap-5">
          {survey?.slice(0, 3).map((item) => (
            <>
              <SurveyCard key={item._id} item={item}></SurveyCard>
            </>
          ))}
        </div>
      </motion.div>

      {/* second col */}
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <div className="flex flex-col gap-5">
          {survey?.slice(3, 6).map((item) => (
            <>
              <SurveyCard key={item._id} item={item}></SurveyCard>
            </>
          ))}
        </div>
      </motion.div>

      {/* third col */}
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <div className="flex flex-col gap-5">
          {survey?.slice(6, 9).map((item) => (
            <>
              <SurveyCard key={item._id} item={item}></SurveyCard>
            </>
          ))}
        </div>
      </motion.div>

      {/* last col */}
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="hidden lg:block"
      >
        <div className="flex flex-col gap-5">
          {survey?.slice(9, 12).map((item) => (
            <>
              <SurveyCard key={item._id} item={item}></SurveyCard>
            </>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FraturedSurvey;
