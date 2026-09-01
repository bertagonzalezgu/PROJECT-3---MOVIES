import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MovieDetailPage from './MovieDetailPage'
import * as tmdbAPI from '../services/tmdbAPI'
import * as favoritesService from '../../favorites/services/favoritesService'
import { useAuth } from '../../auth/context/useAuth'

vi.mock('../services/tmdbAPI')
vi.mock('../../favorites/services/favoritesService')
vi.mock('../../auth/context/useAuth')

const mockMovie = {
  id: 550,
  title: 'Fight Club',
  poster_path: null,
  release_date: '1999-10-15',
  vote_average: 8.4,
  overview: 'Un hombre...',
  runtime: 139,
  genres: [{ id: 18, name: 'Drama' }],
}

const mockCredits = { cast: [], crew: [] }

function renderMoviePage() {
  render(
    <MemoryRouter initialEntries={['/movie/550']}>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Gestión de favoritos y puntuación', () => {
  beforeEach(() => {
    vi.mocked(tmdbAPI.getMovieDetails).mockResolvedValue(mockMovie)
    vi.mocked(tmdbAPI.getMovieCredits).mockResolvedValue(mockCredits)
    vi.mocked(tmdbAPI.getMovieVideos).mockResolvedValue([])

    vi.mocked(useAuth).mockReturnValue({
      user: { uid: 'user123' } as any,
      loading: false,
    })
  })

  it('Escenario: Marcar una película como favorita', async () => {
    // Dado que el usuario ha iniciado sesión y está en la ficha de una película
    vi.mocked(favoritesService.getFavoriteData).mockResolvedValue(null)
    vi.mocked(favoritesService.addFavorite).mockResolvedValue(undefined)

    renderMoviePage()

    await waitFor(() => {
      expect(screen.getByText('Fight Club')).toBeInTheDocument()
    })

    const favButton = screen.getByRole('button', { name: /añadir a favoritos/i })

    // Cuando pulsa el botón "Añadir a favoritos"
    await userEvent.click(favButton)

    // Entonces el botón cambia a "Quitar de favoritos"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /quitar de favoritos/i })).toBeInTheDocument()
    })

    expect(favoritesService.addFavorite).toHaveBeenCalledWith({
      favData: {
        userId: 'user123',
        movieId: 550,
        movieTitle: 'Fight Club',
        moviePoster: null,
      },
    })
  })

  it('Escenario: Puntuar una película favorita', async () => {
    // Dado que el usuario ha marcado la película como favorita
    vi.mocked(favoritesService.getFavoriteData).mockResolvedValue({ rating: null })
    vi.mocked(favoritesService.rateMovie).mockResolvedValue(undefined)

    renderMoviePage()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /quitar de favoritos/i })).toBeInTheDocument()
    })

    // Cuando selecciona una puntuación en las estrellas
    const fifthStar = screen.getByRole('button', { name: /puntuar con 5 estrellas/i })
    await userEvent.click(fifthStar)

    // Entonces la puntuación seleccionada queda reflejada
    await waitFor(() => {
      expect(screen.getByText(/tu valoración: 5\/10/i)).toBeInTheDocument()
    })

    expect(favoritesService.rateMovie).toHaveBeenCalledWith('user123', 550, 5)
  })
})