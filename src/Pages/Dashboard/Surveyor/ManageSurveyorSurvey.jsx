import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";

const ManageSurveyorSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/email/${user.email}`);
      return data;
    },
  });

  // console.log(surveys);
  const today = new Date().toISOString().split("T")[0];

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>Manage Survey</title>
      </Helmet>
      {surveys < 1 ? (
        <div className=" h-96 flex flex-col justify-center">
          <h2 className="text-center mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Oops
          </h2>
          <h2 className="text-center text-3xl">You have no survey Now !</h2>
        </div>
      ) : (
        <>
          <div className="flex text-xl font-semibold justify-start my-4">
            Total Survey : {surveys.length}
          </div>
          <table className="min-w-[90%] shadow-md border mx-auto border-gray-200 my-6">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-4 px-6 text-lg text-left border-b">Sl</th>
                <th className="py-4 px-6 text-lg text-left border-b">Title</th>

                <th className="py-4 px-6 text-lg text-left border-b">
                  Category
                </th>
                <th className="py-4 px-6 text-lg text-left border-b">
                  Question
                </th>

                <th className="py-4 px-6 text-lg text-left border-b">Status</th>
                <th className="py-4 px-6 text-lg border-b text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {surveys?.map((item, index) => (
                <>
                  <tr key={index} className="hover:bg-gray-50 border-b py-1">
                    <td className="px-3 text-lg font-medium text-center">
                      {index + 1}
                    </td>

                    <td className="px-3 text-lg font-medium">{item.title}</td>
                    <td className="px-3 text-lg font-medium">
                      {item.category}
                    </td>
                    <td className="px-3">{item.question}</td>
                    <td className="px-3 text-lg font-medium">
                      {today < item.startDate ? "Un Published" : "Published"}
                    </td>
                    <td className="px-3 flex gap-4 text-lg font-medium text-center">
                      <NavLink
                        to={`surveys/view-details/${item._id}`}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <FaRegEye />
                      </NavLink>
                      <NavLink
                        to={`/edit-survey/${item._id}`}
                        className="btn btn-sm mt-2 text-center rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <FaEdit className="text-xl " />
                      </NavLink>

                      {/* <NavLink
                        onClick={() => handleDelete(id)}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <MdOutlineDelete className="text-xl" />
                      </NavLink> */}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageSurveyorSurvey;
