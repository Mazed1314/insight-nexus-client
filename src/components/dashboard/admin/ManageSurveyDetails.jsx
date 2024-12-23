import { MdOutlineDelete } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const ManageSurveyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reports/surveys/${id}`);
      return data;
    },
  });
  console.log(reports);

  // get vote
  const { data: vote = [], isLoading } = useQuery({
    queryKey: ["vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/${id}`);
      return data;
    },
  });
  // console.log(vote?.length);

  const { data: survey = [] } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${id}`);
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
    publishDate,
    startDate,
    endDate,
  } = survey;

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://insight-nexus-server.vercel.app/survey/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "successfully deleted ", "success");
              window.location.reload();
            }
            navigate(-1);
          });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="lg:w-7/12 mx-auto border shadow-lg py-4 px-2">
      <div className="px-2 md:px-8">
        <div className="my-2 flex flex-col md:flex-row gap-2 justify-between text-gray-600">
          <div className="flex gap-2">
            <img
              src={Surveyor_image}
              alt=""
              className="w-12 h-12 border rounded-full"
            />
            <span className="font-medium text-lg flex flex-col">
              <span>{Surveyor_name}</span>
              <span className="text-sm">{Surveyor_email}</span>
            </span>
          </div>
          <span className="text-gray-600 text-md font-medium">
            Category : {category}
          </span>
        </div>
        <div className="my-2">
          <h2 className="text-center underline text-xl font-semibold">
            Survey Title
          </h2>
          <p className="py-4 text-xl text-gray-500">{title}</p>
          <h2 className="text-center underline text-xl font-semibold">
            Description
          </h2>
          <p className="py-4 text-md text-gray-500">{description}</p>
          <h2 className="text-center underline text-xl font-semibold">
            Survey Question
          </h2>
          <p className="py-4 text-md text-gray-500">{question}</p>
        </div>
        <div className="my-2">
          <h2 className="text-center underline text-xl font-semibold">
            Survey Dates
          </h2>
          <div className="grid grid-cols-3 gap-5 my-2">
            <span>Publish Date</span>
            <span>Start Date</span>
            <span>End Date</span>

            <span>{publishDate}</span>
            <span>{startDate}</span>
            <span>{endDate}</span>
          </div>
        </div>
      </div>

      <div className="w-full my-2">
        <h2 className="text-center underline text-xl font-semibold">Votes</h2>
        <div className="flex justify-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total vote</div>
              <div className="stat-value text-center">{vote?.length}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-2">
        <div className="w-full my-2">
          {reports.length < 1 ? (
            <h2 className="text-center my-2 text-xl font-semibold">
              This Survey has no report
            </h2>
          ) : (
            <>
              <h2 className="text-center underline text-xl font-semibold">
                This Survey has following reports ({reports.length})
              </h2>

              {reports.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="bg-white rounded-lg border shadow p-6 my-2"
                  >
                    <span className="text-lg font-semibold">
                      {item.reporter}
                    </span>{" "}
                    report this survey on
                    <span className="font-semibold"> {item.reportdate}</span>
                    <h2 className="my-2 font-semibold">{item.question}</h2>
                    <h3 className="text-lg font-semibold mb-2">
                      Reported text :{" "}
                    </h3>
                    <p className="text-gray-600">{item.report}</p>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center my-4">
        <NavLink
          onClick={() => handleDelete(id)}
          className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
        >
          <MdOutlineDelete className="text-xl" />
        </NavLink>
      </div>
    </div>
  );
};

export default ManageSurveyDetails;
