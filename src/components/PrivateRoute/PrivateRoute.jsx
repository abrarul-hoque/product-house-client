import { Navigate, useLocation } from "react-router-dom";
import loader from '../../assets/loader.svg';
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    console.log("Private Route: user : ", user);
    console.log("private route: loading", loading);

    if (loading) {
        return <div className="flex justify-center"><img src={loader} className="w-2/5" alt="Loading....." /></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;