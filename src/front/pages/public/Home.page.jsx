import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        }}
      >
        <div className="text-center">
          {/* Título */}
          <h1 className="text-white mb-5 display-3">Librería Manolete</h1>

          {/* Jumbotron */}
          <div
            className="bg-white rounded-lg shadow-lg p-5 mx-auto rounded"
            style={{ maxWidth: "500px" }}
          >
            <div className="mb-4">
              <i
                className="fas fa-book text-primary mb-3"
                style={{ fontSize: "3rem" }}
              ></i>
              <h2 className="text-dark mb-3">Bienvenido a tu Librería</h2>
              <p className="text-muted mb-4">
                Explora nuestra colección de libros y autores
              </p>
            </div>

            {/* Botones */}
            <div className="d-grid gap-3">
              <Link to={"/book"}>
                <button className="btn btn-primary btn-lg w-50">
                  <i className="fas fa-book-open me-2"></i>
                  Ver Libros
                </button>
              </Link>
              <Link to={"/author"}>
                <button className="btn btn-success btn-lg w-50">
                  <i className="fas fa-user-edit me-2"></i>
                  Ver Autores
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="btn btn-info btn-lg">
                  <i className="fas fa-plus-circle me-2"></i>
                  Iniciar sesión
                </button>
              </Link>
            </div>
          </div>
          {/* Footer */}
          <p className="text-white-50 mt-4 mb-0">
            <small>Sistema de gestión bibliotecaria</small>
          </p>
        </div>
      </div>
    </>
  );
};
