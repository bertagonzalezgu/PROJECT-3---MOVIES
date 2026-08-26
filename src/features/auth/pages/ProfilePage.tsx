import { Link } from "react-router-dom"

export default function ProfilePage() {
  return (
    <main>
      <h1>Perfil</h1>
      <p>Todavía no has iniciado sesión.</p>
      <Link to="/login">Iniciar sesión</Link>
      <Link to="/register">Crear cuenta</Link>
    </main>
  )
}