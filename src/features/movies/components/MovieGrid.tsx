import type { Movie } from '../types/movies.types'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <p>No s'han trobat pel·lícules</p>
  }

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}