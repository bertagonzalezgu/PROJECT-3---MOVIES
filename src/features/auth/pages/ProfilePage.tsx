import { useAuth } from "../context/AuthContext"

export default function ProfilePage(){
  const { user } = useAuth()

  return (
    <main>
      <h1>Perfil</h1>
      <p>Bienvenido, {user?.email}</p>
    </main>
  )
}