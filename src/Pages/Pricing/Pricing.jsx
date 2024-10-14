import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";

const Pricing = () => {
  return (
    <div className="container mx-auto pt-10 md:pt-0 min-h-screen flex flex-col md:flex-row justify-center items-center gap-8">
      <Helmet>
        <title>InsightNexus | Pricing</title>
      </Helmet>

      {/* card one */}

      {/* <div className="max-w-sm w-72 h-96 overflow-clip p-4 border border-gray-300 rounded-lg shadow-lg relative text-center">
        <div className="absolute top-4 -right-2 rounded-t bg-teal-700 text-white py-1 px-2 rotate-45 text-xs font-bold">
          Save 25%
        </div>

        <h2 className="text-2xl font-semibold mt-4">Become A Premium User</h2>
        <div className="flex justify-center items-baseline mt-2 mb-4">
          <span className="text-4xl font-bold">$20</span>
          <span className="text-lg ml-1">/ user / month</span>
        </div>
        <p className="text-gray-600 mb-4">
          Explore InsightNexus spacial feature
        </p>
        <Link>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="bg-teal-700 my-6 text-white py-2 px-4 rounded font-medium text-lg"
          >
            Buy
          </button>
        </Link>
        <ul className="text-left space-y-2">
          <li>Comment every where</li>
          <li>Protect your account more securely</li>
        </ul>
      </div> */}

      {/* card two */}

      <div className="max-w-sm w-72 h-96 overflow-clip p-4 border border-gray-300 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mt-4">Become User</h2>
        <div className="flex justify-center items-baseline mt-2 mb-4">
          <span className="text-4xl font-bold">$0</span>
          <span className="text-lg ml-1">/ user / month</span>
        </div>
        <p className="text-gray-600">Explore InsightNexus</p>
        <Link to={"/register"}>
          <button className="bg-green-700 my-6 text-white p-2 rounded font-medium text-lg">
            Sign Up Free
          </button>
        </Link>

        <ul className="text-left space-y-2">
          <li>Engaged with any survey.</li>
        </ul>
      </div>

      {/* card three */}
      <div className="max-w-sm w-72 h-96 overflow-clip p-4 border border-gray-300 rounded-lg shadow-lg relative text-center">
        <div className="absolute top-4 -right-2 rounded-t bg-teal-700 text-white py-1 px-2 rotate-45 text-xs font-bold">
          Save 20%
        </div>

        <h2 className="text-2xl font-semibold mt-4">Become A Premium User</h2>
        <div className="flex justify-center items-baseline mt-2 mb-4">
          <span className="text-4xl font-bold">$30</span>
          <span className="text-lg ml-1">/ user / month</span>
        </div>
        <p className="text-gray-600 mb-4">Survey With InsightNexus</p>
        <Link>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="bg-teal-700 my-6 text-white py-2 px-4 rounded font-medium text-lg"
          >
            Buy
          </button>
        </Link>
        <Payment price={30}></Payment>
        <ul className="text-left space-y-2">
          <li>Comment every where</li>
          <li>Protect your account more securely</li>
          <li>Create unlimited survey.</li>
          <li>Notify others when you get new responses</li>
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
