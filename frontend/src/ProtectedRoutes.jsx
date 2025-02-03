import { Navigate, Outlet } from "react-router-dom";


function ProtectedRouts() {
const isLoggedIn = window.localStorage.getItem('token')
return isLoggedIn ?<Outlet/>:<Navigate to={"/login"}/>
}

export default ProtectedRouts;
