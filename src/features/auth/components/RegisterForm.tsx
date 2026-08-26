import { useState } from "react"
import { signUp } from "../services/authService"

export default function RegisterForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      signUp(email, password)
    }}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}/>
      </div>

      <button type="submit">Registrarse</button>
    </form>
  )
}