// import { FaCalendarAlt, FaUser, FaThumbsUp, FaEdit } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { FaFlag, FaPoll } from "react-icons/fa";
// import { MdDateRange } from "react-icons/md";

const SurveyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { _id } = useParams();
  const [vote, setVote] = useState("");
  const navigate = useNavigate();

  // get vote by id
  const today = new Date().toISOString().split("T")[0];

  const {
    data: votes = [],
    isLoading: VoteLoading,
    refetch,
  } = useQuery({
    queryKey: ["vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/${_id}`);
      return data;
    },
  });

  const { data: yes = [], isLoading: YesLoading } = useQuery({
    queryKey: ["yes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/yes/${_id}`);
      return data;
    },
  });

  const { data: no = [], isLoading: NoLoading } = useQuery({
    queryKey: ["no"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/no/${_id}`);
      return data;
    },
  });

  // get survey by id
  const { data: survey = [], isLoading } = useQuery({
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
  } = survey;
  // console.log(survey);

  const currentUserEmail = user.email;
  const currentUserName = user.displayName;
  const currentUserImage = user.photoURL;
  const survey_id = _id;
  const info = {
    Surveyor_email,
    Surveyor_name,
    question,
    currentUserEmail,
    currentUserName,
    currentUserImage,
    _id,
  };

  // handle report
  const handleReport = (event) => {
    event.preventDefault();

    const report = event.target.report.value;
    const survey_id = _id;
    const surveyor_email = Surveyor_email;
    const reporter = currentUserName;
    const reporterEmail = currentUserEmail;
    const reportdate = new Date()
      .toLocaleString("en", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      })
      .replace(",", "");
    const getReport = {
      report,
      survey_id,
      reporter,
      reporterEmail,
      Surveyor_name,
      question,
      surveyor_email,
      reportdate,
    };
    // console.log(getReport);

    fetch("https://insight-nexus-server.vercel.app/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(getReport),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
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

  // handle vote
  const voteDate = new Date()
    .toLocaleString("en", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
    .replace(",", "");
  const addNewVote = {
    survey_id,
    Surveyor_name,
    voteDate,
    question,
    currentUserEmail,
    currentUserName,
    currentUserImage,
    vote,
  };

  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };

  const handleSubmitVote = async (e) => {
    e.preventDefault();
    const getVote = await axiosSecure.post(`/vote`, addNewVote);
    // console.log(getVote.data);
    if (getVote.data.insertedId) {
      navigate(-1);
      refetch();
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

  if (isLoading || VoteLoading || YesLoading || NoLoading)
    return <LoadingSpinner />;
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

        {/* question */}
        <p className="text-lg px-2 py-4 md:px-8 text-gray-500">{question}</p>

        {/* date */}
        <div className="px-2 py-4 md:px-8 text-gray-600">
          {endDate > today ? (
            <>
              <div className="flex items-center mb-4">
                <FaPoll className="mr-2" />
                <span className="text-sm">{votes.length} participation</span>
              </div>
              <div>End Date : {endDate}</div>
            </>
          ) : (
            <span className="text-red-500 font-semibold">
              The survey is over
            </span>
          )}
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

        {/* edit & vote button */}

        {endDate > today ? (
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
              <div className="">
                <h2 className="text-center">What you think ?</h2>
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
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-center font-semibold text-2xl my-2 text-green-500">
              Survey Result
            </h2>
            <div className="flex justify-center my-6">
              <div className="stats shadow-lg border">
                <div className="stat">
                  <div className="stat-title text-center">Total Vote</div>
                  <div className="stat-value text-center">{votes.length}</div>
                  <div className="divider my-1"></div>
                  <div className="flex gap-2 justify-center">
                    <span>Yes: {yes.length}</span>
                    <span>No: {no.length}</span>
                  </div>
                  {yes.length > no.length ? (
                    <div className="stat-desc text-sm text-green-500">
                      The result is positive
                    </div>
                  ) : (
                    <div className="stat-desc text-sm text-red-500">
                      The result is negative
                    </div>
                  )}
                  {/* <div className="stat-desc">21% more than last month</div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* comment section */}

      <Comment info={info}></Comment>
    </div>
  );
};

export default SurveyDetails;
