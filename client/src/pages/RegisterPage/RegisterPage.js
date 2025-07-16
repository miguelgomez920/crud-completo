// ======================= IMPORTACIONES =======================
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ======================= COMPONENTE =======================
function RegisterPage() {
  // --------------------- ESTADOS ---------------------
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Para redireccionar después del registro

  // --------------------- FUNCIONES ---------------------

  // Maneja el envío del formulario de registro
  const handleRegister = async (e) => {
    e.preventDefault(); //de esta forma evitamos que se cargue la pagina cuando enviamos el submit
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        nombre,
        email,
        password,
      });

      alert("✅ Usuario registrado con éxito");
      navigate("/login"); // Redirecciona al login
    } catch (err) {
      alert("❌ Error al registrar el usuario");
      console.error(err);
    }
  };

   // ======================= RENDER (JSX) =======================
  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre completo"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

// ======================= EXPORTACIÓN =======================
export default RegisterPage;