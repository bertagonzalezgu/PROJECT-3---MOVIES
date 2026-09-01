import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockSetDoc, mockDeleteDoc, mockGetDoc, mockDoc, mockCollection, mockQuery, mockWhere, mockGetDocs } = vi.hoisted(() => {
  return {
    mockSetDoc: vi.fn(),
    mockDeleteDoc: vi.fn(),
    mockGetDoc: vi.fn(),
    mockDoc: vi.fn(() => ('mockDocRef')),
    mockCollection: vi.fn(() => ('mockCollectionRef')),
    mockQuery: vi.fn(() => ('mockQueryRef')),
    mockWhere: vi.fn(),
    mockGetDocs: vi.fn(),
  }
})

vi.mock('firebase/firestore', () => ({
  doc: mockDoc,
  setDoc: mockSetDoc,
  deleteDoc: mockDeleteDoc,
  getDoc: mockGetDoc,
  collection: mockCollection,
  query: mockQuery,
  where: mockWhere,
  getDocs: mockGetDocs,
}))

vi.mock('../../auth/services/firebaseConfig', () => ({
  db: {},
}))

import { addFavorite, removeFavorite, isFavorite, rateMovie, getFavoriteData, getUserFavorites } from './favoritesService'

describe('favoritesService', () => {
  beforeEach(() => {
    mockSetDoc.mockClear()
    mockDeleteDoc.mockClear()
    mockGetDoc.mockClear()
    mockDoc.mockClear()
    mockCollection.mockClear()
    mockQuery.mockClear()
    mockGetDocs.mockClear()
  })

  it('addFavorite guarda el documento con el id compuesto correcto', async () => {
    await addFavorite({
      favData: {
        userId: 'user42',
        movieId: 68718,
        movieTitle: 'Django Unchained',
        moviePoster: '/poster.jpg',
      },
    })

    expect(mockDoc).toHaveBeenCalledWith({}, 'favorites', 'user42_68718')
    expect(mockSetDoc).toHaveBeenCalledWith('mockDocRef', {
      userId: 'user42',
      movieId: 68718,
      movieTitle: 'Django Unchained',
      moviePoster: '/poster.jpg',
      rating: null,
    })
  })

  it('removeFavorite borra el documento con el id compuesto correcto', async () => {
    await removeFavorite('user42', 68718)

    expect(mockDoc).toHaveBeenCalledWith({}, 'favorites', 'user42_68718')
    expect(mockDeleteDoc).toHaveBeenCalledWith('mockDocRef')
  })

  it('isFavorite devuelve true si el documento existe', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true })

    const result = await isFavorite('user42', 68718)

    expect(result).toBe(true)
  })

  it('isFavorite devuelve false si el documento no existe', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false })

    const result = await isFavorite('user42', 68718)

    expect(result).toBe(false)
  })

  it('rateMovie actualiza solo el campo rating con merge', async () => {
    await rateMovie('user42', 68718, 7)

    expect(mockDoc).toHaveBeenCalledWith({}, 'favorites', 'user42_68718')
    expect(mockSetDoc).toHaveBeenCalledWith('mockDocRef', { rating: 7 }, { merge: true })
  })

  it('getFavoriteData devuelve null si no existe el favorito', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false })

    const result = await getFavoriteData('user42', 68718)

    expect(result).toBeNull()
  })

  it('getFavoriteData devuelve los datos si el favorito existe', async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ rating: 8 }),
    })

    const result = await getFavoriteData('user42', 68718)

    expect(result).toEqual({ rating: 8 })
  })

  it('getUserFavorites filtra por userId y devuelve los datos de cada documento', async () => {
    mockGetDocs.mockResolvedValue({
      docs: [
        { data: () => ({ userId: 'user42', movieId: 68718, movieTitle: 'Django Unchained' }) },
        { data: () => ({ userId: 'user42', movieId: 137113, movieTitle: 'Shrek 2' }) },
      ],
    })

    const result = await getUserFavorites('user42')

    expect(mockWhere).toHaveBeenCalledWith('userId', '==', 'user42')
    expect(result).toEqual([
      { userId: 'user42', movieId: 68718, movieTitle: 'Django Unchained' },
      { userId: 'user42', movieId: 137113, movieTitle: 'Shrek 2' },
    ])
  })
})