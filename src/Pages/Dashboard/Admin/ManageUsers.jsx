import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosPublic();
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

  console.log(users);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
                      <NavLink
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <FiEdit />
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
