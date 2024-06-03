import PropTypes from "prop-types";
import { FaUser, FaCalendarAlt, FaPoll } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const SurveyCard = ({ item }) => {
  const { _id, title, question, category, Surveyor_name, endDate, totalVotes } =
    item;

  // background color based on category
  const getCardColor = (category) => {
    if (category === "Health") {
      return "bg-blue-200";
    } else if (category === "Education") {
      return "bg-green-200";
    } else if (category === "Tech") {
      return "bg-purple-200";
    } else if (category === "Parenting") {
      return "bg-yellow-200";
    } else if (category === "Lifestyle") {
      return "bg-pink-200";
    } else {
      return "bg-gray-100";
    }
  };

  // Get dynamic background color based on category
  const cardColor = getCardColor(category);

  return (
    <div
      className={`rounded-lg w-[250px] shadow-md overflow-hidden ${cardColor} flex flex-col justify-between`}
    >
      <div className="p-4">
        {/* header */}
        <div className="">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <div className="divider my-2"></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <FaUser className="text-gray-500" />
              <span className="text-sm text-gray-500">{Surveyor_name}</span>
            </div>
            <span className="text-sm bg-teal-900 rounded-full py-1 px-2 text-white">
              {category}
            </span>
          </div>
        </div>
        {/* body */}
        <div className="">
          <p className="text-gray-600 mt-2">{question}</p>

          <div className="flex items-center mt-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">
              End Survey : {endDate}
            </span>
          </div>

          <div className="flex items-center mt-4">
            <FaPoll className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">{totalVotes} votes</span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="bg-gray-200 py-3 px-6 flex gap-3 justify-center items-center">
        <NavLink
          to={`/view-details/${_id}`}
          className="border border-gray-400 bg-gray-100 px-4 py-2 rounded focus:outline-none"
        >
          Details
        </NavLink>
      </div>
    </div>
  );
};

export default SurveyCard;
