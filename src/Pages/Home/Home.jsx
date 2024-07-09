import { Fade } from "react-awesome-reveal";
import FAQuestion from "./FAQuestion";
import FraturedSurvey from "./FraturedSurvey";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import LatestSurvey from "./LatestSurvey";

const Home = () => {
  return (
    <div>
      {/* Hero Section  */}
      <div>
        <Hero></Hero>
      </div>
      {/* Featured Surveys Section   */}
      <div className=" my-8">
        <div className="flex justify-center">
          <span className="text-3xl border-y-2 py-2 border-black font-semibold mb-8">
            Featured Surveys
          </span>
        </div>
        <Fade duration={5000}>
          <FraturedSurvey></FraturedSurvey>
        </Fade>
      </div>
      {/* Latest Surveys Section  */}
      <div className="my-6 ">
        <div className="flex justify-center">
          <span className="text-3xl border-y-2 py-2 border-black font-semibold mb-8">
            Latest Surveys
          </span>
        </div>
        <Fade duration={5000}>
          <LatestSurvey></LatestSurvey>
        </Fade>
      </div>
      {/* How It Works Section  */}
      <div className="my-8"></div>
      <HowItWorks></HowItWorks>
      {/*  FAQ Section  */}
      <div className="my-8">
        <FAQuestion></FAQuestion>
      </div>
    </div>
  );
};

export default Home;
