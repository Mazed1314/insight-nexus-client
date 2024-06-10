import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import ViewPrticipateSurvey from "./ViewPrticipateSurvey";

const ParticipateSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: votes = [] } = useQuery({
    queryKey: ["vote"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/${user.email}`);
      return data;
    },
  });
  // console.log(surveys);
  return (
    <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
      {votes.length < 1 ? (
        <>
          <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3 text-sm font-medium text-white rounded-full bg-red-500 bg-opacity-80 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
                You are not engaged in any surveys !
              </h1>
              <button
                className="bg-teal-700 my-8 text-white hover:bg-teal-600 p-2 border px-2 rounded-lg"
                onClick={() => navigate("/surveys")}
              >
                Go surveys page
              </button>
              <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button
                  onClick={() => navigate(-1 || "/")}
                  className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </button>
                or
                <button
                  className="bg-white border px-2 rounded-lg"
                  onClick={() => navigate("/")}
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="my-8 font-semibold text-xl">
            Survey your participation : {votes.length}
          </h2>
          <div className="w-10/12 mx-auto justify-center flex flex-wrap gap-5">
            {votes?.map((item) => (
              <>
                <ViewPrticipateSurvey
                  key={item._id}
                  item={item}
                ></ViewPrticipateSurvey>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipateSurvey;
