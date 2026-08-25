import type { CastMember } from '../types/credits.types'
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'

interface CastListProps{
  cast: CastMember[]
}

export default function CastList({cast}: CastListProps){
  const mainCast = cast.slice().sort((a, b) => a.order - b.order).slice(0, 15)

  if (mainCast.length === 0){
    return null
  }

  return (
    <div>
      <h2>Reparto principal</h2>
      <div>
        {mainCast.map((person) => {
          const photoUrl = person.profile_path
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
            : placeholderPoster

          return (
            <div key={person.id}>
              <img
                src={photoUrl}
                alt={person.name}
                loading="lazy"
              />
              <p>{person.name}</p>
              <p>{person.character}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}