import type { FavoriteData } from "../../movies/types/favourites.types";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"
import { db } from "../../auth/services/firebaseConfig"

interface FavoriteDataProps{
  favData: FavoriteData
}

function getFavoriteId(userId: string, movieId: number){
  return `${userId}_${movieId}`
}

export async function addFavorite({ favData }: FavoriteDataProps){
  const favoriteRef = doc(db, "favorites", getFavoriteId(favData.userId, favData.movieId))

  await setDoc(favoriteRef, {
    ...favData,
    rating: null,
  })
}

export async function removeFavorite(userId: string, movieId: number){
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  await deleteDoc(favoriteRef)
}

export async function isFavorite(userId: string, movieId: number): Promise<boolean>{
  const favoriteRef = doc(db, "favorites", getFavoriteId(userId, movieId))
  const actualFav = await getDoc(favoriteRef)
  return actualFav.exists()
}