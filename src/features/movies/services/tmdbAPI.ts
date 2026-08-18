import axios from 'axios'
import type { DiscoverParams } from '../types/discover.types'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdb = axios.create({
  baseURL: API_URL,
  params:{
    api_key: API_KEY,
    language: 'es-ES',
  },
})

export const MOVIE_GENRES = [
  { id: "", name: "Todos los géneros" },
  { id: "28", name: "Acción" },
  { id: "35", name: "Comedia" },
  { id: "18", name: "Drama" },
  { id: "27", name: "Terror" },
  { id: "878", name: "Ciencia Ficción" },
  { id: "10749", name: "Romance" },
  { id: "53", name: "Thriller" },
  { id: "16", name: "Animación" },
];

export const SORT_OPTIONS = [
  { id: "popularity.desc", name: "Tendencia (Trending)" },
  { id: "vote_average.desc", name: "Mejor puntuadas" },
  { id: "primary_release_date.desc", name: "Más recientes" },
];

export async function getPopularMovies(){
  const response = await tmdb.get('/movie/popular')
  return response.data.results
}

export async function searchMovies(query: string){
  const response = await tmdb.get('/search/movie',{
    params: { query },
  })
  return response.data.results
}

export async function getDiscoverMovies({
  page = 1,
  genreId,
  sortBy,
  }: DiscoverParams = {}){
  const response = await tmdb.get('/discover/movie', {
    params: {
      page,
      ...(genreId && { with_genres: genreId }),
      ...(sortBy && { sort_by: sortBy }),
    },
  });
  return response.data.results;
}