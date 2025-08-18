export const Login = () => {
  return (
    <>
      <form
      className="container bg-success mt-5 rounded w-50"
    >
      <div className="mb-3">
        <h2 className="text-center p-2 fw-bold">Iniciar sesión</h2>
        <label htmlFor="email" className="form-label fw-bold">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-bold">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          required
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary mb-3 w-50 fw-bold">
          Log In
        </button>
      </div>
    </form>
    </>
  );
};
