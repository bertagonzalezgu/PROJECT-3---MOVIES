import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { PersonDetails, PersonCrewCredit } from "../types/person.types";
import { getPersonDetails, getPersonMovieCredits } from "../services/tmdbAPI";
import axios from "axios";
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

export default function DirectorDetailPage(){
    const {id} = useParams()
    const navigate = useNavigate()

    const [person, setPerson] = useState<PersonDetails | null>(null)
    const [movies, setMovies] = useState<PersonCrewCredit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
    async function loadInfo() {

        if(!id) return

        try{
            setLoading(true)
            setError(null)
            setNotFound(false)
            const [personData, creditsData] = await Promise.all([
                getPersonDetails(id),
                getPersonMovieCredits(id)
            ])

            const directedMovies = creditsData.crew.filter(
                (credit) => credit.job === "Director"
            )

            const uniqueMovies = Array.from(
                new Map(directedMovies.map((movie) => [movie.id, movie])).values()
            )

            setPerson(personData)
            setMovies(uniqueMovies)
        } catch(err){
            if (axios.isAxiosError(err) && err.response?.status === 404){
                setNotFound(true)
            } else{
                setError("No se han podido cargar los resultados")
            }
        } finally{
            setLoading(false)
        }
    }

    loadInfo()}, [id])

    if (loading){
        return <p>Cargando...</p>
    }

    if (error || notFound){
        return (
            <main>
                <p>{notFound ? "Director no encontrado" : error}</p>
                <Link to="/explore">Volver al catálogo</Link>
            </main>
        )
    }

    if (!person){
        return null
    }

    const photoUrl = person.profile_path
        ? `${IMAGE_BASE_URL}${person.profile_path}`
        : placeholderPoster;

    const sortedMovies = movies.slice().sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""))

    return (
        <main>
            <button onClick={() => navigate(-1)}>← Volver atrás</button>

            <img src={photoUrl} alt={person.name} />

            <h1>{person.name}</h1>
            {person.birthday && <p>Nacimiento: {person.birthday}</p>}
            {person.place_of_birth && <p>Lugar: {person.place_of_birth}</p>}

            <p>{person.biography || "No hay biografía disponible."}</p>

            <h2>Filmografía como director</h2>
            <div>
                {sortedMovies.map((movie) => (
                    <div key={movie.id}>
                        <p>{movie.title} ({movie.release_date?.slice(0, 4)})</p>
                    </div>
                ))}
            </div>
        </main>
    )
}