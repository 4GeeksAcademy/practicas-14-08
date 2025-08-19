import { useEffect } from "react";
import { Link } from "react-router-dom";



export const Home = () => {


  return (
    <>
      <h1 className="text-center text-white mt-5">Bienvenido </h1>

      <div className="d-flex justify-content-center gap-2 mx-auto mt-5">
        <Link to={"/register"}>
          <button className="btn btn-success text-dark fw-bold">
            Registrarse
          </button>
        </Link>
        <Link to={"/login"}>
          <button className="btn btn-primary text-dark fw-bold">Log in</button>
        </Link>
      </div>
    </>
  );
};
