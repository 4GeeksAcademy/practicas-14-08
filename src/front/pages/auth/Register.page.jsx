import { useState } from "react";
import { createUser } from "../../service/service.api";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (input.confirmPassword && input.password != input.confirmPassword) {
      setError("Contraseñas no coinciden");
      return;
    } else {
      setError(null);
    }
    const responseApi = await createUser({
      email: input.email,
      password: input.password,
    });
    if (!responseApi.success && responseApi.error || responseApi.msg) {
        setError(responseApi.error || responseApi.msg)
    }
    if (responseApi.success) {
        return navigate('/login')
    }
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updateUser = { ...input, [name]: value };
    setInput(updateUser);

    if (error && updateUser.password != updateUser.confirmPassword) {
      setError("Contraseñas no coinciden");
      return;
    } else {
      setError(null);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="container bg-secondary mt-5 rounded w-50"
    >
      <div className="mb-3">
        <h2 className="text-center p-2 fw-bold">Formulario de registro</h2>
        <label htmlFor="email" className="form-label text-white fw-bold">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          onChange={(e) => handleOnChange(e)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white fw-bold">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={(e) => handleOnChange(e)}
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="confirmPassword"
          className="form-label text-white fw-bold"
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          onChange={(e) => handleOnChange(e)}
          required
        />
      </div>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <div className="text-center">
        <button type="submit" className="btn btn-primary mb-3 w-50 fw-bold">
          Regsitrarse
        </button>
      </div>
    </form>
  );
};
