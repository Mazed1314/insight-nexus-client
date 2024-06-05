import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSurvey = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: survey = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      const res = await axiosPublic.get("/surveys");
      return res.data;
    },
  });
  // console.log(survey);

  return [survey, loading, refetch];
};

export default useSurvey;
