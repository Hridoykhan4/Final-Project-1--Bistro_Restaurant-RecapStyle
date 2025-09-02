import { useContext } from "react";
import AuthContext from "../providers/Authentication/AuthContext";

const useAuthValue = () => useContext(AuthContext);

export default useAuthValue;
