const Hero = () => {
  const hero_img = "/images/hero-top-2x-take-a-tour-rebrand.png";
  return (
    <div className="hero min-h-screen bg-emerald-50">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:w-1/2">
          <img src={hero_img} className="w-full rounded-lg" />
        </div>

        <div className="lg:w-1/2">
          <div className="w-8/12 mx-auto">
            <h1 className="text-5xl text-teal-900 font-bold">
              Create your own surveys
            </h1>
            <p className="py-6 text-teal-900">
              Explore the platform to find out how easy it is to find the
              answers you need with surveys and forms.
            </p>
            <span className="flex gap-4">
              <a
                href="register"
                className="btn rounded-sm text-white bg-yellow-500"
              >
                Sign up free
              </a>

              <a
                href="create-survey"
                className="btn rounded-sm bg-white border-black"
              >
                Create your survey
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
