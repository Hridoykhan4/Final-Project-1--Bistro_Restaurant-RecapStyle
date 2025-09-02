import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import useAuthValue from "../hooks/useAuthValue";

const PrivateRoute = ({children}) => {
    const {loading, user} = useAuthValue();
    const location = useLocation()
    if(loading){
        return <Spinner></Spinner>
    }
    if(user){
        return children
    }

   return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;