export interface Movie{
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  overview: string
}

export interface Genre{
  id: number
  name: string
}

export interface MovieDetails extends Movie{
  runtime: number
  genres: Genre[]
}
