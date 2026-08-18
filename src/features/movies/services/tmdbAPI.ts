import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdb = axios.create({
  baseURL: API_URL,
  params:{
    api_key: API_KEY,
    language: 'es-ES',
  },
})

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

export async function getDiscoverMovies(page: number = 1) {
  const response = await tmdb.get('/discover/movie', {
    params: { page },
  })
  return response.data.results
}

