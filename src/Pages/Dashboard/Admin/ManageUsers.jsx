import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  const handleMakeAdmin = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Can you change the user role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B03B",
      cancelButtonColor: "#FF6161",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B03B",
      cancelButtonColor: "#FF6161",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-start my-4">
        <FaUsers className="text-2xl mr-2" /> : {users.length}
      </div>
      <table className="shadow-md border mx-auto border-gray-200 my-6">
        {/* head */}
        <thead>
          <tr className="bg-black text-white">
            <th className="py-4 px-6 text-lg text-left border-b">Sl</th>
            <th className="py-4 px-6 text-lg text-left border-b">Image</th>
            <th className="py-4 px-6 text-lg text-left border-b">Name</th>
            <th className="py-4 px-6 text-lg text-left border-b">Email</th>
            <th className="py-4 px-6 text-lg text-left border-b">Role</th>
            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50 border-b py-1">
              <th>{index + 1}</th>
              <td className="px-3 py-2">
                <img
                  src={user.photoURL}
                  alt="table navigate ui"
                  className="h-16 w-16 object-cover bg-gray-300"
                />
              </td>
              <td className="px-3 text-lg font-medium">{user.name}</td>
              <td className="px-3">{user.email}</td>
              <td className="px-3 text-lg font-medium">{user.role}</td>
              <td className="px-3 text-lg font-medium">
                <span className="flex gap-1">
                  {user.role !== "admin" && (
                    <>
                      {/* <select
                        onClick={() => handleMakeAdmin()}
                        name="category_name"
                        className="shadow menu dropdown-content z-[1] bg-pink-100 rounded-box w-20"
                      >
                        <option disabled selected>
                          Edit
                        </option>
                        <option value="Health">Make Admin</option>
                        <option value="Travel">Make Surveyor</option>
                        <option value="Travel">Make Pro</option>
                        <option value="Travel">Make User</option>
                      </select> */}

                      <NavLink
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                        onClick={() => handleMakeAdmin(user._id, user.name)}
                      >
                        make admin
                      </NavLink>

                      <NavLink
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <MdOutlineDelete className="text-xl" />
                      </NavLink>
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
