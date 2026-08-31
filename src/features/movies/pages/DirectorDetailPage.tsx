import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { PersonDetails, PersonCrewCredit } from "../../types/person.types";
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
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm font-medium">Cargando perfil...</p>
                </div>
            </div>
        )
    }

    if (error || notFound){
        return (
            <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl font-bold mb-2">
                {notFound ? "Director no encontrado" : "¡Vaya! Ha ocurrido un error"}
                </h2>
                <p className="text-slate-400 mb-6">{error || "El perfil que buscas no existe."}</p>
                <Link
                to="/explore"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
                >
                Volver al catálogo
                </Link>
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
        <main className="min-h-screen bg-slate-950 text-slate-100 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
                
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors group cursor-pointer">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Volver atrás
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-start mb-12">
                
                <div className="flex justify-center md:block">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/40 border border-slate-800/80 w-64 md:w-full aspect-2/3">
                        <img src={photoUrl} alt={person.name} className="w-full h-full object-cover"/>
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6">
                    <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                        {person.name}</h1>
                        <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-md border border-indigo-500/30">Director</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium mt-4">
                        {person.birthday && (
                        <span className="bg-slate-900 text-slate-300 px-3.5 py-1.5 rounded-full border border-slate-800">
                            🎂 {person.birthday}
                        </span>
                        )}
                        {person.place_of_birth && (
                        <span className="bg-slate-900 text-slate-300 px-3.5 py-1.5 rounded-full border border-slate-800">
                            📍 {person.place_of_birth}
                        </span>
                        )}
                    </div>
                    </div>

                    <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                        <h2 className="text-lg font-bold text-white">Biografía</h2>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                            {person.biography || "No hay biografía disponible para este perfil."}
                        </p>
                    </div>
                </div>

                </div>

                <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
                    Filmografía como director ({sortedMovies.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedMovies.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="bg-slate-900/60 hover:bg-slate-900 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/50 transition-all group flex flex-col justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{movie.title}</h3>
                        </div>

                        {movie.release_date && (
                        <span className="text-xs text-slate-500 self-end font-mono">{movie.release_date.slice(0, 4)}</span>
                        )}
                    </Link>
                    ))}
                </div>
                </div>

            </div>
        </main>
    )
}