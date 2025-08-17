// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import RootLayout from "./layout/Root.layout";
import PublicLayout from "./layout/Public.layout";
import AdminLayout from "./layout/Admin.layout";
import AuthLayout from "./layout/Auth.layout";
import { Home } from "./pages/public/Home.page";
import { Profile } from "./pages/admin/Profile.page";
import { Login } from "./pages/auth/Login.page";
import { Register } from "./pages/auth/Register.page";


export const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={ <RootLayout/> }>
      <Route element={ <PublicLayout/> }>
        <Route index element={ <Home/> }/>
      </Route>

      <Route path="admin" element={ <AdminLayout/> }>
        <Route path="profile" element={ <Profile/> }/>
      </Route>

      <Route element={ <AuthLayout/> }>
        <Route path="login" element={ <Login/> }/>
        <Route path="register" element={ <Register/> }/>
      </Route>
    </Route>
    )
);