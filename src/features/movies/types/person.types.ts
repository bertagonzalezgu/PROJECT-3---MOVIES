import type { Movie } from './movies.types'

export interface PersonDetails{
  id: number
  name: string
  biography: string
  profile_path: string | null
  place_of_birth: string | null
  birthday: string | null
}

export interface PersonCastCredit extends Movie{
  character: string
}

export interface PersonCrewCredit extends Movie{
  job: string
  department: string
}

export interface PersonMovieCredits{
  cast: PersonCastCredit[]
  crew: PersonCrewCredit[]
}