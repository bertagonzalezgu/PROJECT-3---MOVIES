import { useState } from "react"
import { signUp } from "../services/authService"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"

export default function RegisterForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        try{
          await signUp(email, password)
        } catch(err){
          if(err instanceof FirebaseError && err.code === "auth/email-already-in-use") {
            setError("Este email ya está registrado")
          } else{
            setError("No se ha podido completar el registro")
          }
        }
      }

    return (
      <form onSubmit={handleSubmit}>
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
            minLength={6}/>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Registrarse</button>
      </form>
    )
}