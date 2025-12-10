import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import useAdmin from "../hooks/useAdmin";
import useAuthValue from "../hooks/useAuthValue";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuthValue();
    const {isAdmin, isAdminLoading} = useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading) return <Spinner></Spinner>

    if(user && isAdmin) return children

    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;