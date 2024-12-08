const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">1. Sign Up or Log In</h3>
            <p>Create your account to get started. It's quick and easy!</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              2. Create Your Survey
            </h3>
            <p>
              Design your survey with our intuitive builder. Customize the look
              and feel to match your brand.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              3. Customize and Configure
            </h3>
            <p>
              Tailor your survey settings to fit your needs. Set preferences for
              response limits, anonymity, and more.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              4. Distribute Your Survey
            </h3>
            <p>
              Share your survey with your audience through various channels like
              email, social media, or direct links.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">5. Collect Responses</h3>
            <p>
              Track responses in real-time through your dashboard. Monitor
              response rates and adjust your strategy if needed.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">6. Analyze Results</h3>
            <p>
              Access your survey results and gain valuable insights using our
              powerful analytics tools.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">7. Take Action</h3>
            <p>
              Use the insights from your survey to make informed decisions and
              drive positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
