import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import { createAuthors, createBooks } from "../service/service.api";

export default function RootLayout() {


    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}