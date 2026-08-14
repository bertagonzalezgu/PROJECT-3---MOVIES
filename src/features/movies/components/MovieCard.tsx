import type { Movie } from '../types/movies.types'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({movie}: MovieCardProps){
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null

  return (
    <article>
      {posterUrl ? ( <img src={posterUrl} alt={`Cartel de ${movie.title}`}/> ) : ( <div>Sin imagen</div> )}
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <p>⭐ {movie.vote_average.toFixed(1)}</p>
    </article>
  )
}