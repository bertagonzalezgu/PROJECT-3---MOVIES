import { useState, useEffect } from "react"
import { useAuth } from "../../auth/context/AuthContext"
import { getUserFavorites } from "../services/favoritesService"
import type { FavoriteMovie } from "../../movies/types/favourites.types"
import { Link } from "react-router-dom"
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

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
    return (
      <main className="min-h-screen bg-[#171B36] flex items-center justify-center">
        <p className="text-lg font-medium animate-pulse text-gray-300">
          Cargando favoritos...
        </p>
      </main>
    )
  }

  if(!user){
    return (
      <main className="min-h-screen bg-[#171B36] flex flex-col items-center justify-center text-white p-4">
        <div className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto">
          <p>Inicia sesión para ver tus favoritos</p>
        </div>
        <Link to="/login" className="mt-6 inline-block px-5 py-2.5 bg-[#000000]/40 hover:bg-[#000000]/60 text-white font-medium rounded-xl transition-colors border border-white/5">
          Iniciar sesión
        </Link>
      </main>
    )
  }

  if(favorites.length === 0){
    return <p>Todavía no tienes películas favoritas</p>
  }

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-8 md:py-10 md:pr-12 md:pl-32 transition-all">
      <header className="mb-6 border-b border-white/10 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Mis <span className="text-[#E50914]">Favoritos</span>
        </h1>
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
          <p className="text-gray-400 text-lg">
            Todavía no tienes películas favoritas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((fav) => {
            const posterUrl = fav.moviePoster
              ? `${IMAGE_BASE_URL}${fav.moviePoster}`
              : placeholderPoster

            return (
              <article
                key={fav.movieId}
                className="group relative bg-[#000000]/40 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E50914]/20 flex flex-col w-full h-full border border-white/5"
              >
                <Link to={`/movie/${fav.movieId}`}>
                  <div className="relative aspect-2/3 w-full bg-gray-900 overflow-hidden">
                    <img
                      src={posterUrl}
                      alt={`Cartel de ${fav.movieTitle}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {fav.rating && (
                      <div className="absolute top-2 right-2 bg-[#000000]/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                        <span>⭐</span>
                        <span>{fav.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between grow">
                    <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-[#E50914] transition-colors">
                      {fav.movieTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">
                      {fav.rating ? `Puntuación: ${fav.rating}/10` : "Sin puntuar"}
                    </p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}