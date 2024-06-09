import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";

const MyReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   my - report;
  const { data: reports = {} } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reports/email/${user.email}`);
      return data;
    },
  });
  console.log(user.email);
  console.log(reports.length);
  return (
    <div>
      {reports.length < 1 && (
        <h2 className="text-center my-2">You dont give report any survey</h2>
      )}
      {reports.length > 0 && (
        <>
          <h2 className="text-center my-2">
            You given report following surveys
          </h2>
          {reports.map((item, index) => (
            <>
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 my-2"
              >
                <p>{item.report}</p>
                <NavLink
                  to={`/view-details/${item._id}`}
                  className={` text-black shadow px-4 py-2 rounded focus:outline-none`}
                >
                  Details
                </NavLink>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default MyReport;
