import { useState } from "react"
import { signIn } from "../services/authService"
import { FirebaseError } from "firebase/app"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { loginWithGoogle } from "../services/authService"

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setError(null)

        try {
        await signIn(email, password)
        navigate("/profile")
        } catch (err) {
        if (err instanceof FirebaseError && err.code === "auth/invalid-credential") {
            setError("Email o contraseña incorrectos")
        } else {
            setError("No se ha podido iniciar sesión")
        }
        }
    }

    async function handleGoogleLogin(){
    setError(null)
    try {
      await loginWithGoogle()
      navigate("/profile")
    } catch (err) {
      setError("No se ha podido iniciar sesión con Google")
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

            <button type="submit">Iniciar sesión</button>
            
            <hr/>

            <button type="button" onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </form>
    )
}