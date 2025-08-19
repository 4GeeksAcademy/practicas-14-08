import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {

    const token = localStorage.getItem('token')

    if (token) {
        return <Navigate to={'/admin/profile'} replace/>
    }

    return (
        <Outlet/>
    )
}