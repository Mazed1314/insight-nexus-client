import { MdOutlineDelete } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const ManageSurveyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: reports = {}, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reports/surveys/${id}`);
      return data;
    },
  });
  console.log(reports);

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
        // fetch(`https://insight-nexus-server.vercel.app/survey/${id}`, {
        fetch(`http://localhost:5000/survey/${id}`, {
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
    <div>
      <h2>{reports?.length}</h2>
      <h2>{id}</h2>
      <NavLink
        onClick={() => handleDelete(id)}
        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
      >
        <MdOutlineDelete className="text-xl" />
      </NavLink>
    </div>
  );
};

export default ManageSurveyDetails;
