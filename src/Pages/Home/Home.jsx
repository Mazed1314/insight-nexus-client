import FAQuestion from "./FAQuestion";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
      {/* Hero Section  */}
      <div>
        <Hero></Hero>
      </div>
      {/* Featured Surveys Section   */}
      <div className=""></div>
      {/* Latest Surveys Section  */}
      <div className=""></div>
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
