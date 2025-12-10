import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  const { data:menu = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } =  await axiosPublic.get("/menu");
      return data;
    },
  });
  return { menu, loading , refetch};
};

export default useMenu;
