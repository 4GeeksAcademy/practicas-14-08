import { useState } from "react";
import { createUser } from "../../service/service.api";
import { Link, useNavigate } from "react-router-dom";
import style from '../../styles/register.module.css'

export const Register = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    localStorage.setItem('token', responseApi.token)
    if ((!responseApi.success && responseApi.error) || responseApi.msg) {
      setError(responseApi.error || responseApi.msg);
    }
    if (responseApi.success) {
      return navigate("/admin/profile");
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
    <form onSubmit={handleOnSubmit} className={`${style.form} mx-auto mt-5`}>
      <p className={style.title}>Registrate </p>
      <p className={style.message}>Registrate y empieza a disfrutar de nuestra app. </p>
      <label>
        <input
        required
        placeholder=''
        type="email"
        className={style.input}
        name="email"
        onChange={(e) => handleOnChange(e)}
        />
        <span>Email</span>
      </label>
      <label>
        <input
        required
        placeholder=''
        type="password"
        className={style.input}
        name="password"
        onChange={(e) => handleOnChange(e)}
        />
        <span>Contraseña</span>
      </label>
      <label>
        <input
        required
        placeholder=''
        type="password"
        className={style.input}
        name="confirmPassword"
        onChange={(e) => handleOnChange(e)}
        />
        <span>Confirmar contraseña</span>
      </label>
      <button className={style.submit}>Enviar</button>
      <p className={style.signin}>
        Ya tienes cuenta ? <Link to={'/login'}><span>Iniciar sesión</span>{" "}</Link>
      </p>
    </form>
  );
};
