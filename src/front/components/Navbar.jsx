import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isToken, setIsToken] = useState(false);
  const location = useLocation()
  
  useEffect(() => {
    if (token) {
      setIsToken(true);
    }
  }, [token, isToken, location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Navbar
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link><span className="nav-link active" aria-current="page" href="#">
                Inicio
              </span></Link>
            </li>
          </ul>

          {!isToken ?
            <div className="d-flex gap-2">
              <Link to={"/register"}>
                <button className="btn btn-success text-dark fw-bold">
                  Registrarse
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="btn btn-primary text-dark fw-bold">
                  Iniciar sesion
                </button>
              </Link>
            </div>
           : 
            <div className="d-flex gap-2">
              
                <button
                  className="btn btn-success text-dark fw-bold"
                  onClick={() =>
                    localStorage.removeItem("token", setIsToken(false))
                  }
                >
                  Cerrar sesion
                </button>
              
              <Link to={"/admin/profile"}>
                <button className="btn btn-primary text-dark fw-bold">
                  Perfil
                </button>
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};
