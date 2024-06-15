import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const MyReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   my - report;
  const {
    data: reports = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reports/email/${user.email}`);
      return data;
    },
  });

  // console.log(reports);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://insight-nexus-server.vercel.app/reports/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "successfully deleted ", "success");
            }
          });
      }
    });
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      {reports.length < 1 && (
        <h2 className="mt-3 text-2xl font-semibold text-gray-800 text-center  md:text-3xl">
          You dont give report any survey
        </h2>
      )}
      {reports.length > 0 && (
        <>
          <h2 className="text-center my-4 font-semibold text-xl">
            Your given survey reports are below
          </h2>
          <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
            {reports?.map((item, index) => (
              <>
                <div
                  key={index}
                  className="card w-sm bg-base-100 border shadow-md"
                >
                  <div className="card-body">
                    {/* header */}
                    <div className="">
                      <h3>
                        You report{" "}
                        <span className="text-lg font-semibold ">
                          {item.Surveyor_name}
                        </span>
                        's Survey on{" "}
                        <span className="text-sm font-semibold">
                          {item.reportdate}
                        </span>
                      </h3>
                      <div className="divider my-2"></div>
                    </div>
                    <p className="mb-2 text-lg ">{item.question}</p>

                    <h2 className="card-title">Your report</h2>
                    <p>{item.report}</p>
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

export default MyReport;
