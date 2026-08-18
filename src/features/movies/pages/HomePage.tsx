import { useState, useEffect } from 'react'
import { getPopularMovies } from '../services/tmdbAPI'
import type { Movie } from '../types/movies.types'
import MovieGrid from '../components/MovieGrid'
import Hero from '/Especialització_ItAcademy/PROJECTE 3 - MOVIES/project-movies-app/src/components/Hero'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
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

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-8 md:py-10 md:pr-12 md:pl-32 transition-all">
      
      {loading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg font-medium animate-pulse text-gray-300">
            Cargando contenido...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto my-12">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <Hero movies={movies} />

          <header className="mb-6 border-b border-white/10 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Películas <span className="text-[#E50914]">Populares</span>
            </h1>
          </header>

          <MovieGrid movies={movies} />
        </>
      )}
    </main>
  )
}