const FAQuestion = () => {
  return (
    <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold sm:text-4xl text-teal-800">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 mb-8 text-gray-600 font-medium w-8/12 mx-auto">
          Welcome to InsightNexus! Here are some common questions our users ask.
          If you don't find what you're looking for, feel free to reach out to
          us.
        </p>
      </div>
      <div className="space-y-4">
        <details className="w-full border rounded-lg">
          <summary className="px-4 py-6 focus:outline-none text-teal-800 rounded-t-lg">
            How can I create a survey on InsightNexus?
          </summary>
          <p className="px-4 py-6 ml-4 -mt-4 text-gray-700">
            Creating a survey on InsightNexus is easy! Simply sign up for an
            account, log in, and navigate to the "Create Survey" section. Follow
            the prompts to design your survey and start collecting valuable
            insights from your audience.
          </p>
        </details>
        <details className="w-full border rounded-lg">
          <summary className="px-4 py-6 focus:outline-none text-teal-800">
            Can I customize the appearance of my survey?
          </summary>
          <p className="px-4 py-6 ml-4 -mt-4 text-gray-700">
            Yes, absolutely! InsightNexus offers a range of customization
            options to help you tailor the appearance of your survey. From
            choosing different themes to selecting fonts and colors, you can
            make your survey match your brand or project needs effortlessly.
          </p>
        </details>
        <details className="w-full border rounded-lg">
          <summary className="px-4 py-6 focus:outline-none text-teal-800 rounded-b-lg">
            How do I analyze the results of my survey?
          </summary>
          <p className="px-4 py-6 ml-4 -mt-4 text-gray-700">
            Once you've collected responses to your survey, InsightNexus
            provides powerful analytics tools to help you interpret the data.
            Navigate to the "Results" section, where you can generate charts,
            graphs, and detailed reports. Gain valuable insights and make
            informed decisions based on the feedback you receive.
          </p>
        </details>
      </div>
    </div>
  );
};

export default FAQuestion;
