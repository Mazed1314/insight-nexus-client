import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ManageUsersTable from "./Table/ManageUsersTable";

const ManageUsers = () => {
  const axiosSecure = useAxiosPublic();
  //   Fetch users Data
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  console.log(users);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <table className="shadow-md border mx-auto  border-gray-200 my-6">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-4 px-6 text-lg text-left border-b">Image</th>
            <th className="py-4 px-6 text-lg text-left border-b">Name</th>
            <th className="py-4 px-6 text-lg text-left border-b">Email</th>
            <th className="py-4 px-6 text-lg text-left border-b">Role</th>
            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <>
              <ManageUsersTable user={user}></ManageUsersTable>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
