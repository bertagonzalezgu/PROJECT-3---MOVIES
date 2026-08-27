import { useState, useEffect } from "react"
import { useAuth } from "../../auth/context/AuthContext"
import { getUserFavorites } from "../services/favoritesService"
import type { FavoriteMovie } from "../../movies/types/favourites.types"

export default function FavoritesPage(){
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites(){
      if (!user) {
        setLoading(false)
        return
      }

      const data = await getUserFavorites(user.uid)
      setFavorites(data as FavoriteMovie[])
      setLoading(false)
    }

    loadFavorites()
  }, [user])

  if(loading){
    return <p>Cargando...</p>
  }

  if(!user){
    return <p>Inicia sesión para ver tus favoritos</p>
  }

  if(favorites.length === 0){
    return <p>Todavía no tienes películas favoritas</p>
  }

  return (
    <main>
      <h1>Mis favoritos</h1>
      <div>
        {favorites.map((fav) => (
          <div key={fav.movieId}>
            <p>{fav.movieTitle}</p>
            <p>Puntuación: {fav.rating ?? "Sin puntuar"}</p>
          </div>
        ))}
      </div>
    </main>
  )
}