import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isToken, setIsToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setIsToken(true);
    }
  }, [token, isToken, location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Libreria Manolete
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
              <Link>
                <span className="nav-link active" aria-current="page" href="#">
                  Inicio
                </span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"/book"}>
                    <a className="dropdown-item" href="#">
                      Libros
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/author"}>
                    <a className="dropdown-item" href="#">
                      Autores
                    </a>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={"/"}>
                    <a className="dropdown-item" href="#">
                      Inicio
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {!isToken ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
};
