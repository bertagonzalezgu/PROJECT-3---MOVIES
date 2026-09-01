import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockGet } = vi.hoisted(() => {
  return { mockGet: vi.fn() }
})

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get: mockGet })),
  },
}))

import { getPopularMovies, searchMovies, getMovieDetails } from './tmdbAPI'

describe('tmdbAPI service', () => {
  beforeEach(() => {
    mockGet.mockClear()
  })

  it('getPopularMovies devuelve el array de resultados', async () => {
    mockGet.mockResolvedValue({
      data: { results: [{ id: 1084736, title: 'The Odyssey' }] },
    })

    const movies = await getPopularMovies()

    expect(mockGet).toHaveBeenCalledWith('/movie/popular')
    expect(movies).toEqual([{ id: 1084736, title: 'The Odyssey' }])
  })

  it('searchMovies llama al endpoint correcto con el query', async () => {
    mockGet.mockResolvedValue({
      data: { results: [{ id: 273481, title: 'The Hateful Eight' }] },
    })

    const movies = await searchMovies('Hateful Eight')

    expect(mockGet).toHaveBeenCalledWith('/search/movie', {
      params: { query: 'Hateful Eight' },
    })
    expect(movies).toEqual([{ id: 273481, title: 'The Hateful Eight' }])
  })

  it('getMovieDetails llama al endpoint con el id correcto', async () => {
    mockGet.mockResolvedValue({
      data: { id: 137113, title: 'Shrek 2', runtime: 93 },
    })

    const movie = await getMovieDetails('137113')

    expect(mockGet).toHaveBeenCalledWith('/movie/137113')
    expect(movie).toEqual({ id: 137113, title: 'Shrek 2', runtime: 93 })
  })
})