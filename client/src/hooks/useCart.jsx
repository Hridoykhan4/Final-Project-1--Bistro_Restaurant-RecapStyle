import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthValue from "./useAuthValue";
const useCart = () => {
  const { user, loading } = useAuthValue();
  const axiosSecure = useAxiosSecure();
  const { data: cartItems = [], refetch } = useQuery({
    queryKey: ["cartItems", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/carts?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email && !loading,
  });

  return { cartItems, refetch };
};

export default useCart;
