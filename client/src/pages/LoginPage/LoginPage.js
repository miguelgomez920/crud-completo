// ======================= IMPORTACIONES =======================
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Para navegación entre rutas

// ======================= COMPONENTE =======================
function LoginPage() {
   // --------------------- ESTADOS ---------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook para redireccionar a otra página

  // --------------------- FUNCIONES ---------------------
  // Maneja el envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault(); //evita que el navegador recargue la página que seria el comportamiento por defecto cuando se envia un formulario submit (submit = entregar)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token); //Guarda el token JWT recibido desde el backend en el almacenamiento local del navegador.
      localStorage.setItem("user", JSON.stringify(response.data.usuario)); //se usa JSON.stringify para pasarlo a string porque solo se pueden guardar strings en localStorage.
      navigate("/homepage"); //Redirige al usuario a la ruta /homepage después de iniciar sesión exitosamente.
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  // ======================= RENDER (JSX) =======================
  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required //sirve para indicar que ese campo es obligatorio. Es decir, el formulario no se podrá enviar si ese campo está vacío, si esta vacio Muestra un mensaje de validación automático como: "Por favor, rellena este campo."
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />

      <button type="submit">Iniciar sesión</button> {/*el atributo type="submit" en un <button> se usa para enviar el formulario al hacer clic, cuando se le da click, realiza las validaciones del required o el type = email por ejemplo, y si pasa, entonces dispara el evento onSubmit del formulario form, el navegador ejecuta todas las validaciones como el required*/}

      <p>
        ¿No tienes una cuenta?{" "}
        <Link to="/register">Regístrate aquí</Link> {/* 👈 Enlace con Link */}
      </p>

    </form>
  );
}

// ======================= EXPORTACIÓN =======================
export default LoginPage;