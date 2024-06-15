import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const ViewPrticipateSurvey = ({ item }) => {
  const { survey_id } = item;
  const axiosSecure = useAxiosSecure();

  const { data: survey = [], isPending: loadingS } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${survey_id}`);
      return data;
    },
  });

  if (loadingS)
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  return (
    <div
      className={`rounded-lg border w-[250px] shadow-md overflow-hidden flex flex-col justify-between`}
    >
      <div className="p-4">
        {/* header */}
        <div className="">
          <h3 className="text-xl font-semibold ">
            {survey.title.slice(0, 20)}
          </h3>
          <div className="divider my-2"></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <FaUser className="" />
              <span className="text-sm ">
                {survey.Surveyor_name.slice(0, 15)}
              </span>
            </div>
            <span className="text-sm text-white bg-teal-600 rounded-full py-1 px-2">
              {survey.category}
            </span>
          </div>
        </div>
        {/* body */}
        <div className="">
          <p className="mt-2">{survey.question.slice(0, 50)}..</p>

          {/* <div className="flex items-center mt-4">
            <FaPoll className="mr-2" />
             <span className="text-sm">{vote?.length} votes</span> 
          </div> */}
          <div className="flex items-center mt-2">
            <FaCalendarAlt className="mr-2" />
            <span className="text-sm">End Survey : {survey.endDate}</span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="bg-gray-200 py-3 px-6 flex gap-3 justify-center items-center">
        <NavLink
          to={`/view-details/${survey._id}`}
          className={` text-black shadow px-4 py-2  rounded `}
        >
          Details
        </NavLink>
      </div>
    </div>
  );
};

ViewPrticipateSurvey.propTypes = {
  item: PropTypes.object,
};
export default ViewPrticipateSurvey;
