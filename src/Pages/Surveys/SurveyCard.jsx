import PropTypes from "prop-types";
import { FaUser, FaCalendarAlt, FaPoll } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const SurveyCard = ({ item }) => {
  const { _id, title, question, category, Surveyor_name, endDate, totalVotes } =
    item;

  // background color based on category
  const getCardColor = (category) => {
    if (category === "Health") {
      return "bg-blue-200 text-gray-500";
    } else if (category === "Education") {
      return "bg-green-300 text-gray-500";
    } else if (category === "Tech") {
      return "bg-violet-300 text-gray-700";
    } else if (category === "Parenting") {
      return "bg-cyan-200 text-gray-600";
    } else if (category === "Lifestyle") {
      return "bg-lime-200 text-gray-500";
    } else if (category === "Travel") {
      return "bg-red-200 text-gray-500";
    } else if (category === "Fashion") {
      return "bg-yellow-200 text-gray-500";
    } else if (category === "Food") {
      return "bg-sky-100 text-black";
    } else if (category === "Finance") {
      return "bg-blue-300 text-gray-800";
    } else if (category === "Sports") {
      return "bg-gray-400 text-white";
    } else if (category === "Entertainment") {
      return "bg-orange-200 text-gray-500";
    } else {
      return "bg-gray-100 text-gray-500";
    }
  };

  // Get dynamic background color based on category
  const cardColor = getCardColor(category);

  return (
    <div
      className={`rounded-lg border w-[250px] shadow-md overflow-hidden ${cardColor} flex flex-col justify-between`}
    >
      <div className="p-4">
        {/* header */}
        <div className="">
          <h3 className="text-xl font-semibold ">{title}</h3>
          <div className="divider my-2"></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <FaUser className="" />
              <span className="text-sm ">{Surveyor_name}</span>
            </div>
            <span className="text-sm text-white bg-teal-600 rounded-full py-1 px-2">
              {category}
            </span>
          </div>
        </div>
        {/* body */}
        <div className="">
          <p className="mt-2">{question}</p>

          <div className="flex items-center mt-2">
            <FaCalendarAlt className="mr-2" />
            <span className="text-sm">End Survey : {endDate}</span>
          </div>

          <div className="flex items-center mt-4">
            <FaPoll className="mr-2" />
            <span className="text-sm">{totalVotes} votes</span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="bg-gray-200 py-3 px-6 flex gap-3 justify-center items-center">
        <NavLink
          to={`/view-details/${_id}`}
          className=" text-black shadow px-4 py-2 rounded focus:outline-none"
        >
          Details
        </NavLink>
      </div>
    </div>
  );
};

export default SurveyCard;
