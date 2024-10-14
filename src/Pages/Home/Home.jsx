import { Slide } from "react-awesome-reveal";
import FAQuestion from "./FAQuestion";
import FraturedSurvey from "./FraturedSurvey";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import LatestSurvey from "./LatestSurvey";
import Signup from "./Signup";

const Home = () => {
  return (
    <div>
      {/* Hero Section  */}
      <section>
        <Hero></Hero>
      </section>

      {/* Featured Surveys Section   */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-bold p-2 mb-10">Featured Surveys</h2>
        {/* <Slide direction="up"> */}
        <FraturedSurvey></FraturedSurvey>
        {/* </Slide> */}
      </section>

      {/* Latest Surveys Section  */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-bold p-2 mb-10 text-end">
          Latest Surveys
        </h2>
        <Slide direction="up">
          <LatestSurvey></LatestSurvey>
        </Slide>
      </section>

      {/* How It Works Section  */}
      <section className="container mx-auto my-8">
        <HowItWorks></HowItWorks>
      </section>

      {/*  FAQ Section  */}
      <section className="container mx-auto my-8">
        <FAQuestion></FAQuestion>
      </section>

      <section className="-mb-20">
        <Signup></Signup>
      </section>
    </div>
  );
};

export default Home;
