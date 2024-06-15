import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const ManageComent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["com"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/com/email/${user.email}`);
      return data;
    },
  });

  console.log(comments);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "This action also delete the comment from that survey!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://insight-nexus-server.vercel.app/survey/${id}`, {
          // fetch(`http://localhost:5000/survey/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "successfully deleted ", "success");
              window.location.reload();
            }
          });
      }
    });
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title>Comments</title>
      </Helmet>
      {comments.length < 1 && (
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-white rounded-full bg-red-500 bg-opacity-80 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
              You don't give comment any survey!
            </h1>
            <button
              className="bg-teal-700 my-8 text-white hover:bg-teal-600 p-2 border px-2 rounded-lg"
              onClick={() => navigate("/surveys")}
            >
              Go surveys page
            </button>
            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => navigate(-1 || "/")}
                className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>Go back</span>
              </button>
              or
              <button
                className="bg-white border px-2 rounded-lg"
                onClick={() => navigate("/")}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}
      {comments.length > 0 && (
        <>
          <h2 className="text-center my-4 font-semibold text-xl">
            Your recent comment
          </h2>
          <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
            {comments?.map((item, index) => (
              <>
                <div
                  key={index}
                  className="card w-sm bg-base-100 border shadow-md"
                >
                  <div className="card-body">
                    {/* header */}
                    <div className="">
                      <h3>
                        You comment{" "}
                        <span className="text-lg font-semibold ">
                          {item.Surveyor_name}
                        </span>
                        's Survey on{" "}
                        <span className="text-sm font-semibold">
                          {item.commentTime}
                        </span>
                      </h3>
                      <div className="divider my-2"></div>
                    </div>
                    <p className="mb-2 text-lg ">{item.question}</p>

                    <h2 className="card-title">Your Comment</h2>
                    <p>{item.comment}</p>
                    <div className="card-actions justify-end">
                      <NavLink
                        to={`/view-details/${item.survey_id}`}
                        className={`btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white`}
                      >
                        Go to the survey
                      </NavLink>
                      <NavLink
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <MdOutlineDelete className="text-xl" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageComent;
