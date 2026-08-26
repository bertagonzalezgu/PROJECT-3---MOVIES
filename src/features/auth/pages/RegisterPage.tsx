import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router-dom"

export default function RegisterPage(){
  return (
    <main>
      <h1>Crear cuenta</h1>
      <RegisterForm />
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  )
}