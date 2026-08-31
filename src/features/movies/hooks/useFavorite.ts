import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { addFavorite, removeFavorite, getFavoriteData, rateMovie } from "../../favorites/services/favoritesService"

interface MovieInfo{
  id: number
  title: string
  poster_path: string | null
}

export function useFavorite(user: User | null, movie: MovieInfo | null){
  const [isFav, setIsFav] = useState(false)
  const [rating, setRating] = useState<number | null>(null)

  useEffect(() => {
    async function loadFavoriteStatus(){
      if (!user || !movie) return

      const favData = await getFavoriteData(user.uid, movie.id)
      setIsFav(favData !== null)
      setRating(favData?.rating ?? null)
    }

    loadFavoriteStatus()
  }, [user, movie])

  async function handleToggleFavorite(){
    if(!user || !movie) return

    if(isFav){
      await removeFavorite(user.uid, movie.id)
      setIsFav(false)
    } else{
      await addFavorite({
        favData: {
          userId: user.uid,
          movieId: movie.id,
          movieTitle: movie.title,
          moviePoster: movie.poster_path,
        },
      })
      setIsFav(true)
    }
  }

  async function handleRate(newRating: number){
    if(!user || !movie) return

    await rateMovie(user.uid, movie.id, newRating)
    setRating(newRating)
  }

  return { isFav, rating, handleToggleFavorite, handleRate }
}