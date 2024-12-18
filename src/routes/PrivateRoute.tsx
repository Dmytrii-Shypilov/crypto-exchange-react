import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../redux/user/user-selector";


const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {isAuthenticated} = useSelector(getUserData)
    return isAuthenticated? children : <Navigate to='/auth'/>
}

export default PrivateRoute