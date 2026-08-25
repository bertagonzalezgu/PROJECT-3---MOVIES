import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movies.types";
import type { Credits } from "../types/credits.types";
import { getMovieCredits, getMovieDetails } from "../services/tmdbAPI";
import axios from "axios";
import placeholderPoster from '/src/assets/img/placeholder-poster-movies.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailPage(){
    const {id} = useParams()

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
    return <p>Cargando...</p>
    }

    if (error){
    return <p>{error}</p>
    }

    if (notFound){
    return <p>Película no encontrada</p>
    }

    if (!movieDetails || !movieCredits){
    return null
    }

    const director = movieCredits.crew.find(person => person.job === "Director")

    const posterUrl = movieDetails.poster_path
    ? `${IMAGE_BASE_URL}${movieDetails.poster_path}`
    : placeholderPoster;

    return (
        <div>
            <img src={posterUrl} alt={`Póster de ${movieDetails.title}`} />

            <h1>{movieDetails.title}</h1>

            <p>Estreno: {movieDetails.release_date}</p>
            <p>Duración: {movieDetails.runtime} min</p>
            <p>Puntuación: {movieDetails.vote_average}</p>
            <p>Director: {director ? director.name : "No disponible"}</p>

            <p>Géneros: {movieDetails.genres.map((g) => g.name).join(", ")}</p>

            <p>{movieDetails.overview}</p>
        </div>
    )
}