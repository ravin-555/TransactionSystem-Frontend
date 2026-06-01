// in this file  if authenticated , we will render the children components

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function PublicRoutes({ children }) {
    if(isAuthenticated()){
        return <Navigate to="/dashboard" replace={true} />
    }

    return children;  
}
