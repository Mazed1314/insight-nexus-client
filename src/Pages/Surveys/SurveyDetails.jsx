// import { FaCalendarAlt, FaUser, FaThumbsUp, FaEdit } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Comment from "../../Component/Comment";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
// import { MdDateRange } from "react-icons/md";

const SurveyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { _id } = useParams();
  const [vote, setVote] = useState("");
  const navigate = useNavigate();

  const { data: survey = {}, isLoading } = useQuery({
    queryKey: ["survey", _id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${_id}`);
      return data;
    },
  });
  const {
    title,
    question,
    Surveyor_email,
    Surveyor_image,
    category,
    description,
    Surveyor_name,
    endDate,
    totalVotes,
  } = survey;
  // console.log(survey);

  const currentUserEmail = user.email;
  const currentUserName = user.displayName;
  const currentUserImage = user.photoURL;
  const survey_id = _id;
  const info = {
    Surveyor_email,
    currentUserEmail,
    currentUserName,
    currentUserImage,
    _id,
  };

  const addNewVote = {
    Surveyor_email,
    currentUserEmail,
    vote,
    currentUserImage,
    survey_id,
  };

  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };

  const handleSubmitVote = async (e) => {
    e.preventDefault();
    const getVote = await axiosSecure.post(`/vote`, addNewVote);
    console.log(getVote.data);
    if (getVote.data.insertedId) {
      navigate(-1);
      e.target.classList.add("btn-disabled");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank You for vote",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="">
      <div className="mx-4 min-h-screen md:w-8/12 md:mx-auto">
        <Helmet>
          <title>InsightNexus : survey-details {_id}</title>
        </Helmet>

        <h2 className="text-2xl text-center font-bold text-gray-800">
          {title}
        </h2>

        <hr className="my-4" />

        <div className="px-2 md:px-8">
          <div className="flex flex-col md:flex-row gap-2 justify-between text-gray-600">
            <div className="flex gap-2">
              <img
                src={Surveyor_image}
                alt=""
                className="w-12 h-12 border rounded-full"
              />
              <span className="font-medium text-lg flex flex-col">
                <span>{Surveyor_name}</span>
                <span className="text-sm">Surveyor</span>
              </span>
            </div>
            <span className="text-gray-600 text-md font-medium">
              Category : {category}
            </span>
          </div>
          <p className="py-4 text-md text-gray-500">{description}</p>
        </div>
        <div className="px-2 py-4 md:px-8 text-gray-600">
          What you think ?
          <p className="text-lg py-2 text-gray-500">{question}</p>
          <div className="my-2 flex flex-col md:flex-row gap-2 justify-between">
            <span>Total Votes: {totalVotes}</span>
            <span>End Date : {endDate}</span>
          </div>
        </div>

        {/* edit button */}
        <div className="mb-10">
          {Surveyor_email === currentUserEmail ? (
            <div className="flex justify-center">
              <NavLink
                to={`/edit-survey/${_id}`}
                className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
              >
                Edit
              </NavLink>
            </div>
          ) : (
            <div className="flex justify-center">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                id="vote"
                className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                vote
              </button>
              <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  <h3 className=" text-center my-2">{question}</h3>
                  <form onSubmit={handleSubmitVote}>
                    <fieldset className="flex gap-4 justify-center">
                      <label>
                        <input
                          type="radio"
                          name="vote"
                          value="yes"
                          checked={vote === "yes"}
                          onChange={handleVoteChange}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="vote"
                          value="no"
                          checked={vote === "no"}
                          onChange={handleVoteChange}
                        />
                        No
                      </label>
                    </fieldset>

                    <div className="flex justify-center mt-4">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-sm bg-gray-500 text-white rounded"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          )}
        </div>
      </div>
      {/* comment section */}

      <Comment info={info}></Comment>
    </div>
  );
};

export default SurveyDetails;
