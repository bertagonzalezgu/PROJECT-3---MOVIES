import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { MovieDetails } from "../types/movies.types";
import type { Credits } from "../types/credits.types";
import { getMovieCredits, getMovieDetails } from "../services/tmdbAPI";
import axios from "axios";
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailPage(){
    const {id} = useParams()
    const navigate = useNavigate()

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
    const [movieCredits, setMovieCredits] = useState<Credits | null>(null)
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
            const [movieData, creditsData] = await Promise.all([getMovieDetails(id), getMovieCredits(id)]) 
            setMovieDetails(movieData)
            setMovieCredits(creditsData)
        } catch(err){
            if (axios.isAxiosError(err) && err.response?.status === 404){
                setNotFound(true)
            } else {
                setError("No se han podido cargar los resultados")
            }
        } finally{
            setLoading(false)
        }      
    }

    loadInfo()}, [id])

    if (loading){
        return (
            <div className="min-h-screen bg-[#171B36] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Cargando detalles...</p>
                </div>
            </div>
        )
    }

    if (error || notFound){
        return (
            <main className="min-h-screen bg-[#171B36] flex flex-col items-center justify-center text-white p-4">
                <div className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto">
                    <h2 className="text-xl font-bold mb-2 text-white">
                        {notFound ? "Película no encontrada" : "¡Vaya! Ha ocurrido un error"}
                    </h2>
                    <p>{error || "La película que buscas no existe o ha sido movida."}</p>
                </div>
                <Link to="/explore" className="mt-6 inline-block px-5 py-2.5 bg-[#000000]/40 hover:bg-[#000000]/60 text-white font-medium rounded-xl transition-colors border border-white/5">
                    Volver al catálogo
                </Link>
            </main>
        )
    }

    if (!movieDetails || !movieCredits){
    return null
    }

    const director = movieCredits.crew.find(person => person.job === "Director")

    const posterUrl = movieDetails.poster_path
    ? `${IMAGE_BASE_URL}${movieDetails.poster_path}`
    : placeholderPoster;

    return (
        <main className="min-h-screen bg-[#171B36] text-white px-4 py-8 md:py-10 md:pr-12 md:pl-32 transition-all pb-16">
            <div className="max-w-6xl mx-auto">

                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group">
                <span className="transition-transform group-hover:-translate-x-1">←</span> Volver atrás
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

                <div className="flex justify-center md:block">
                    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#E50914]/20 transition-shadow duration-300 border border-white/5 w-64 md:w-full">
                        <img src={posterUrl} alt={`Póster de ${movieDetails.title}`} className="w-full h-auto object-cover"/>
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6">

                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                            {movieDetails.title}
                        </h1>
                        {director && (
                            <p className="text-base text-gray-400">Dirigida por <span className="text-gray-200 font-semibold">{director.name}</span></p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                        <div className="flex items-center gap-1.5 bg-[#000000]/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full border border-white/10">
                            <span>⭐</span>
                            <span>{movieDetails.vote_average.toFixed(1)}</span>
                        </div>

                    {movieDetails.release_date && (
                        <span className="bg-[#000000]/40 text-gray-300 px-3 py-1.5 rounded-full border border-white/5">{new Date(movieDetails.release_date).getFullYear()}</span>
                    )}

                    {movieDetails.runtime > 0 && (
                        <span className="bg-[#000000]/40 text-gray-300 px-3 py-1.5 rounded-full border border-white/5">{movieDetails.runtime} min</span>
                    )}
                    </div>

                    {movieDetails.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {movieDetails.genres.map((g) => (
                        <span key={g.id} className="text-xs font-semibold uppercase tracking-wider bg-[#000000]/40 text-gray-300 px-3 py-1 rounded-md border border-white/5">{g.name}</span>
                        ))}
                    </div>
                    )}

                    <div className="bg-[#000000]/40 p-6 rounded-xl border border-white/5 space-y-3">
                        <h2 className="text-lg font-bold text-white">Sinopsis</h2>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{movieDetails.overview || "No hay sinopsis disponible para esta película."}</p>
                    </div>

                </div>

                </div>
            </div>
        </main>
    )
}