import { useState, useEffect } from "react"
import axios from "axios"
import type { PersonDetails, PersonCastCredit, PersonCrewCredit } from "../types/person.types"
import { getPersonDetails, getPersonMovieCredits } from "../services/tmdbAPI"

export function usePersonDetail(id: string | undefined, role: "actor" | "director"){
  const [person, setPerson] = useState<PersonDetails | null>(null)
  const [movies, setMovies] = useState<(PersonCastCredit | PersonCrewCredit)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadInfo(){
      if (!id) return

      try {
        setLoading(true)
        setError(null)
        setNotFound(false)

        const [personData, creditsData] = await Promise.all([
          getPersonDetails(id),
          getPersonMovieCredits(id),
        ])

        setPerson(personData)

        if(role === "actor"){
          setMovies(creditsData.cast)
        } else {
          const directedMovies = creditsData.crew.filter(
            (credit) => credit.job === "Director"
          )
          const uniqueMovies = Array.from(
            new Map(directedMovies.map((movie) => [movie.id, movie])).values()
          )
          setMovies(uniqueMovies)
        }
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
  }, [id, role])

  const sortedMovies = movies
    .slice()
    .sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""))

  return { person, movies: sortedMovies, loading, error, notFound }
}