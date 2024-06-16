import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const ViewDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  // get vote
  const { data: vote = {}, isLoading } = useQuery({
    queryKey: ["vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/survey/${id}`);
      return data;
    },
  });
  // console.log(vote?.length);

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
              navigate(-1);
            }
          });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="lg:w-7/12 mx-auto border shadow-lg py-4 px-2">
      <div className="px-2 md:px-8">
        <div className="my-2 flex flex-col md:flex-row gap-2 justify-between text-gray-600">
          <span className="text-center text-xl font-semibold">
            Total vote : {vote?.length}
          </span>

          <div className="px-3 flex gap-4 justify-center text-lg font-medium text-center">
            <NavLink
              to={`/edit-survey/${id}`}
              className="btn btn-sm mb-1 text-center rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
            >
              <FaEdit className="text-xl " />
            </NavLink>

            <NavLink
              onClick={() => handleDelete(id)}
              className="btn btn-sm mb-1 text-center rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
            >
              <MdOutlineDelete className="text-xl" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="w-full my-2">
        <table className="table my-2">
          {/* head */}
          <thead>
            <tr className="bg-gray-500 text-white">
              <th>Sl</th>
              <th>User Email</th>
              <th>User Name </th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {vote?.map((item, index) => (
              <>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.currentUserEmail}</td>
                  <td>{item.currentUserName}</td>
                  <td>{item.vote}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full my-2">
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
                  <span className="text-lg font-semibold">{item.reporter}</span>{" "}
                  report{" "}
                  <span className="font-semibold">{item.reportdate}</span> on
                  your survey <br />
                  <h2 className="my-2 font-semibold">{item.question}</h2>
                  <h3 className="text-lg font-semibold mb-2">
                    Reported text :{" "}
                  </h3>
                  <p>{item.report}</p>
                </div>
              </>
            ))}
          </>
        )}
      </div> */}
    </div>
  );
};

export default ViewDetails;
