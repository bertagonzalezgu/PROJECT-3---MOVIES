import { useState, useEffect } from 'react'
import { getPopularMovies } from '../services/tmdbAPI'
import type { Movie } from '../types/movies.types'
import MovieGrid from '../components/MovieGrid'

export default function HomePage(){
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies(){
      try {
        setLoading(true)
        setError(null)
        const data = await getPopularMovies()
        setMovies(data)
      } catch {
        setError("No se han podido cargar los resultados")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()}, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return <MovieGrid movies={movies}/>
}