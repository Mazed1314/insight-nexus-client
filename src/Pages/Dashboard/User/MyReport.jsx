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
  // console.log(user.email);
  console.log(reports);
  return (
    <div>
      {reports.length < 1 && (
        <h2 className="text-center my-2">You dont give report any survey</h2>
      )}
      {reports.length > 0 && (
        <>
          <h2 className="text-center my-4 font-semibold text-xl">
            You given report following surveys
          </h2>
          {reports.map((item, index) => (
            <>
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 my-2"
              >
                <div className="my-4 text-center">
                  <p className="my-2">{item.question}</p>
                  <p>{item.report}</p>
                  <NavLink
                    to={`/view-details/${item.survey_id}`}
                    className={`btn btn-sm my-4 text-white bg-gray-500 shadow px-4 py-2 rounded `}
                  >
                    Details
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

export default MyReport;
