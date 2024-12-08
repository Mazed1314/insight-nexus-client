import { Helmet } from "react-helmet";
import useSurvey from "../../../hooks/useSurvey";
import { NavLink } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import LoadingSpinner from "../../shared/LoadingSpinner";

const ManageSurvey = () => {
  const [survey, loading] = useSurvey();
  const today = new Date().toISOString().split("T")[0];

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>Manage Survey</title>
      </Helmet>
      {survey < 1 ? (
        <div className=" h-96 flex flex-col justify-center">
          <h2 className="text-center mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Oops
          </h2>
          <h2 className="text-center text-3xl">No Survey Available Now !</h2>
        </div>
      ) : (
        <>
          <div className="flex text-xl font-semibold justify-start my-4">
            Total Survey : {survey.length}
          </div>
          <table className="min-w-[90%] shadow-md border mx-auto border-gray-200 my-6">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-4 px-6 text-lg text-left border-b">Sl</th>
                <th className="py-4 px-6 text-lg text-left border-b">Image</th>
                <th className="py-4 px-6 text-lg text-left border-b">
                  Surveyor
                </th>
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
              {survey?.map((item, index) => (
                <>
                  <tr key={index} className="hover:bg-gray-50 border-b py-1">
                    <td className="px-3 text-lg font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="px-3 text-lg font-medium">
                      <img
                        src={item.Surveyor_image}
                        alt="table navigate ui"
                        className="h-16 w-20 object-cover bg-gray-300"
                      />
                    </td>
                    <td className="px-3 text-lg font-medium">
                      {item.Surveyor_name}
                    </td>
                    <td className="px-3 text-lg font-medium">
                      {item.category}
                    </td>
                    <td className="px-3">{item.question.slice(0, 80)}..</td>
                    <td className="px-3 text-lg font-medium">
                      {today < item.startDate ? "Un Published" : "Published"}
                    </td>
                    <td className="px-3 text-lg font-medium text-center">
                      <NavLink
                        to={`view-details/${item._id}`}
                        className="btn btn-sm mt-2 rounded text-black border-black bg-transparent hover:bg-black hover:text-white"
                      >
                        <FaRegEye />
                      </NavLink>
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

export default ManageSurvey;
