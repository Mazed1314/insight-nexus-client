import { Slide } from "react-awesome-reveal";
import Hero from "../components/home/Hero";
import Companies from "../components/home/Companies";
import FraturedSurvey from "../components/home/FraturedSurvey";
import LatestSurvey from "../components/home/LatestSurvey";
import HowItWorks from "../components/home/HowItWorks";
import FAQuestion from "../components/home/FAQuestion";
import Signup from "../components/home/Signup";

const Home = () => {
  return (
    <div>
      {/* Hero Section  */}
      <section className="my-6">
        <Hero />
      </section>

      <section>
        <Companies />
      </section>

      {/* Featured Surveys Section   */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-bold p-2 mb-10">Featured Surveys</h2>
        {/* <Slide direction="up"> */}
        <FraturedSurvey />
        {/* </Slide> */}
      </section>

      {/* Latest Surveys Section  */}
      <section className="container mx-auto my-8">
        <h2 className="text-3xl font-bold p-2 mb-10 text-end">
          Latest Surveys
        </h2>
        <Slide direction="up">
          <LatestSurvey />
        </Slide>
      </section>

      {/* How It Works Section  */}
      <section className="container mx-auto my-8">
        <HowItWorks />
      </section>

      {/*  FAQ Section  */}
      <section className="container mx-auto my-8">
        <FAQuestion />
      </section>

      <section className="-mb-20">
        <Signup />
      </section>
    </div>
  );
};

export default Home;
