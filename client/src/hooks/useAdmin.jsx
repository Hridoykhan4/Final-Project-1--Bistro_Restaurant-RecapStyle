import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthValue from "./useAuthValue";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuthValue()
    const {data: isAdmin, isLoading:isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async() => {
            const {data} = await axiosSecure(`/users/admin?email=${user?.email}`);
            return data?.admin ?? false
        },
        enabled: !loading && !!user?.email
    
    })



    return {isAdmin, isAdminLoading}
};

export default useAdmin;