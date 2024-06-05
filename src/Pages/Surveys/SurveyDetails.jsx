// import { FaCalendarAlt, FaUser, FaThumbsUp, FaEdit } from "react-icons/fa";
import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import Comment from "../../Component/Comment";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
// import { MdDateRange } from "react-icons/md";

const SurveyDetails = () => {
  const { user } = useAuth();
  const surveys = useLoaderData();
  const { _id } = useParams();
  const [vote, setVote] = useState("");

  const survey = surveys.find((c) => c._id == _id);
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
    _id,
  };

  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(addNewVote);

    const url = "http://localhost:5000/vote";
    // send data to the server
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNewVote),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Created survey successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate(-1);
        }
      });
  };

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
                className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                vote
              </button>
              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div className="modal-action">
                    <form method="dialog">
                      <button>
                        <MdCancel className="text-2xl" />
                      </button>
                    </form>
                  </div>
                  <p className="py-4">{question}</p>
                  <form onSubmit={handleSubmit}>
                    <fieldset className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          name="vote"
                          value="1"
                          checked={vote === "yes"}
                          onChange={handleVoteChange}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="vote"
                          value="0"
                          checked={vote === "no"}
                          onChange={handleVoteChange}
                        />
                        No
                      </label>
                    </fieldset>
                    <div className="flex justify-center">
                      <input
                        type="submit"
                        value="submit"
                        className="btn btn-sm border text-white bg-black text-lg font-bold"
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
