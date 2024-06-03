const PriceCard = () => {
  return (
    <div className="max-w-xs mx-auto p-6 border border-gray-300 rounded-lg shadow-lg relative text-center bg-white">
      <div className="absolute top-4 -right-2 rounded-t bg-teal-400 text-white py-1 px-2 rotate-45 text-xs font-bold">
        Save 26%
      </div>

      <h2 className="text-2xl font-semibold mt-4">Become Premium User</h2>
      <div className="flex justify-center items-baseline mt-2 mb-4">
        <span className="text-4xl font-bold">$25</span>
        <span className="text-lg ml-1">/ user / month</span>
      </div>
      <p className="text-gray-600 mb-4">Explore InsightNexus spacial feature</p>
      <button className="bg-teal-500 text-white py-2 px-6 rounded font-medium text-lg mb-6">
        Buy
      </button>
      <ul className="text-left space-y-2">
        <li>Create unlimited survey.</li>
        <li>Comment every where</li>
        <li>Let team members analyze, filter, and export results</li>
        <li>Notify others when you get new responses</li>
      </ul>
    </div>
  );
};

export default PriceCard;
