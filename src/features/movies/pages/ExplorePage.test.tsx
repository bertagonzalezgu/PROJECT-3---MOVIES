import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ExplorePage from './ExplorePage'
import * as tmdbAPI from '../services/tmdbAPI'

vi.mock('../services/tmdbAPI')

describe('US-01: Cercar pel·lícules', () => {
  beforeEach(() => {
    vi.mocked(tmdbAPI.getDiscoverMovies).mockResolvedValue([
      { id: 1, title: 'Fight Club', poster_path: null, release_date: '1999-10-15', vote_average: 8.4, overview: '' },
    ])
  })

  it('Escenari: Cercar una pel·lícula existent', async () => {
    vi.mocked(tmdbAPI.searchMovies).mockResolvedValue([
      { id: 2, title: 'Interstellar', poster_path: null, release_date: '2014-11-07', vote_average: 8.4, overview: '' },
    ])

    render(
      <MemoryRouter>
        <ExplorePage/>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Fight Club')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(searchInput, 'Interstellar{enter}')

    await waitFor(() => {
      expect(screen.getByText('Interstellar')).toBeInTheDocument()
    })
  })

  it('Escenari: Cercar una pel·lícula inexistent', async () => {
    vi.mocked(tmdbAPI.searchMovies).mockResolvedValue([])

    render(
      <MemoryRouter>
        <ExplorePage/>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Fight Club')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(searchInput, 'xxzzqqq123{enter}')

    await waitFor(() => {
      expect(screen.getByText(/no se han encontrado resultados/i)).toBeInTheDocument()
    })
  })
})