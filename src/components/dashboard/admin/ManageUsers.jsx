import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
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
              title: ` is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleMakeSurveyor = (id) => {
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
        axiosSecure.patch(`/users/surveyor/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ` is an Surveyor Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleMakePro = (id) => {
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
        axiosSecure.patch(`/users/pro/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `is an Premium User Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleMakeUser = (id) => {
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
        axiosSecure.patch(`/users/user/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `the user is an User Now!`,
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
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
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
                      <div className="flex items-center gap-2">
                        <div className="dropdown dropdown-hover">
                          <summary className="border border-black text-black bg-white btn btn-xs">
                            Change user role
                          </summary>
                          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box ">
                            <NavLink
                              onClick={() => handleMakeAdmin(user._id)}
                              className={
                                "hover:bg-gray-600 hover:text-white p-1 rounded-md"
                              }
                            >
                              {" "}
                              Make Admin
                            </NavLink>

                            <NavLink
                              onClick={() => handleMakeSurveyor(user._id)}
                              className={
                                "hover:bg-gray-600 hover:text-white p-1 rounded-md"
                              }
                            >
                              Make Surveyor
                            </NavLink>

                            <NavLink
                              onClick={() => handleMakePro(user._id)}
                              className={
                                "hover:bg-gray-600 hover:text-white p-1 rounded-md"
                              }
                            >
                              Make Pro
                            </NavLink>

                            <NavLink
                              onClick={() => handleMakeUser(user._id)}
                              className={
                                "hover:bg-gray-600 hover:text-white p-1 rounded-md"
                              }
                            >
                              Make User
                            </NavLink>
                          </ul>
                        </div>

                        <NavLink
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                        >
                          <MdOutlineDelete className="text-xl" />
                        </NavLink>
                      </div>
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
