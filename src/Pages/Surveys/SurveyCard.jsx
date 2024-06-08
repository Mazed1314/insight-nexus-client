import PropTypes from "prop-types";
import { FaUser, FaCalendarAlt, FaPoll, FaFlag } from "react-icons/fa";
import Swal from "sweetalert2";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SurveyCard = ({ item }) => {
  const axiosSecure = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    title,
    question,
    category,
    Surveyor_name,
    Surveyor_email,
    endDate,
  } = item;

  const { data: vote = {}, isLoading } = useQuery({
    queryKey: ["vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/${_id}`);
      return data;
    },
  });
  console.log(vote?.length);
  console.log(_id);
  // console.log(item);
  // handle report
  const handleReport = (event) => {
    event.preventDefault();

    const report = event.target.report.value;
    const survey_id = _id;
    const surveyor_email = Surveyor_email;
    const reporter = user.email;

    const getReport = { report, survey_id, reporter, surveyor_email };
    console.log(getReport);

    // fetch("http://localhost:5000/reports", {
    fetch("https://insight-nexus-server.vercel.app/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(getReport),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          navigate(-1);
          Swal.fire({
            position: "center",
            title: "thank you for your feedback",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // background color based on category
  const getCardColor = (category) => {
    if (category === "Health") {
      return "bg-blue-200 text-gray-500";
    } else if (category === "Education") {
      return "bg-fuchsia-300 text-gray-500";
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
      return "bg-green-300 text-black";
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
  if (isLoading) return "wait";
  return (
    <div
      className={`rounded-lg border w-[250px] shadow-md overflow-hidden ${cardColor} flex flex-col justify-between`}
    >
      <div className="p-4">
        {/* header */}
        <div className="">
          <h3 className="text-xl font-semibold ">{title.slice(0, 20)}</h3>
          <div className="divider my-2"></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <FaUser className="" />
              <span className="text-sm ">{Surveyor_name.slice(0, 15)}</span>
            </div>
            <span className="text-sm text-white bg-teal-600 rounded-full py-1 px-2">
              {category}
            </span>
          </div>
        </div>
        {/* body */}
        <div className="">
          <p className="mt-2">{question.slice(0, 50)}..</p>

          <div className="flex items-center mt-2">
            <FaCalendarAlt className="mr-2" />
            <span className="text-sm">End Survey : {endDate}</span>
          </div>

          <div className="flex items-center mt-4">
            <FaPoll className="mr-2" />
            <span className="text-sm">{vote?.length} votes</span>
          </div>
          <div className="flex justify-end">
            <span className="lg:tooltip" data-tip="Report">
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <FaFlag className="text-gray-700" />
              </button>
            </span>
          </div>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg text-center">
                Inappropriate survey !
              </h3>
              <form onSubmit={handleReport}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      What you think ?
                    </span>
                  </label>
                  <textarea
                    placeholder="give your opinion"
                    name="report"
                    required
                    className="textarea textarea-bordered textarea-sm w-full bg-gray-100 text-black"
                  ></textarea>
                </div>

                <div className="flex justify-center mt-4">
                  <input
                    type="submit"
                    value="Report"
                    className="btn btn-sm bg-gray-500 text-white rounded"
                  />
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* bottom */}
      <div className="bg-gray-200 py-3 px-6 flex gap-3 justify-center items-center">
        <NavLink
          to={`/view-details/${_id}`}
          className={` text-black shadow px-4 py-2 hover:${cardColor}rounded focus:outline-none`}
        >
          Details
        </NavLink>
      </div>
    </div>
  );
};

SurveyCard.propTypes = {
  item: PropTypes.object,
};

export default SurveyCard;
