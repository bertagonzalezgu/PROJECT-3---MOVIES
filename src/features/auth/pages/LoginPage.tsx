import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <LoginForm />
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </main>
  )
}