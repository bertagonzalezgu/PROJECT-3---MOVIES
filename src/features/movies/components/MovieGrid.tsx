import type { Movie } from '../../types/movies.types'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <div className="text-center py-12 text-gray-400 text-lg">
        <p>No se han encontrado resultados</p>
    </div> 
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
        <li key={movie.id} className="flex justify-center">
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}