import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const MyReport = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  //   my - report;
  const { data: report = [] } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reports/`);
      return res.data;
    },
  });

  console.log(report);

  // survey
  //   const { data: survey = [], isPending: loadingS } = useQuery({
  //     queryKey: ["survey"],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get(
  //         "https://insight-nexus-server.vercel.app/reports/"
  //       );
  //       return res.data;
  //     },
  //   });

  return (
    <div>
      {/* card */}
      <h2 className="text-center font-bold text-2xl my-4">
        Your reported survey
      </h2>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p>We are using cookies for no reason.</p>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
