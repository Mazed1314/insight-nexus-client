import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";

const ManageComent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: comments = [] } = useQuery({
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

  return (
    <div>
      {comments.length < 1 && (
        <h2 className="text-center my-2">You dont give comment any survey</h2>
      )}
      {comments.length > 0 && (
        <>
          <h2 className="text-center my-4 font-semibold text-xl">
            You recent comment
          </h2>
          {comments.map((item, index) => (
            <>
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 my-2"
              >
                <div className="my-4 text-center">
                  <p className="my-2">{item.comment}</p>

                  <NavLink
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                  >
                    <MdOutlineDelete className="text-xl" />
                  </NavLink>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default ManageComent;
