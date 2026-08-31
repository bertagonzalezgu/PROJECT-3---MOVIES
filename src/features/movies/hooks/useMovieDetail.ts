import { useState, useEffect } from "react"
import axios from "axios"
import type { MovieDetails } from "../types/movies.types"
import type { Credits } from "../types/credits.types"
import { getMovieCredits, getMovieDetails } from "../services/tmdbAPI"

export function useMovieDetail(id: string | undefined){
  
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [movieCredits, setMovieCredits] = useState<Credits | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadInfo(){
      if (!id) return

      try{
        setLoading(true)
        setError(null)
        setNotFound(false)
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ])
        setMovieDetails(movieData)
        setMovieCredits(creditsData)
      } catch(err){
        if(axios.isAxiosError(err) && err.response?.status === 404){
          setNotFound(true)
        } else{
          setError("No se han podido cargar los resultados")
        }
      } finally{
        setLoading(false)
      }
    }

    loadInfo()
  }, [id])

  return { movieDetails, movieCredits, loading, error, notFound }
}