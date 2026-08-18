import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie } from "../types/movies.types";
import { getDiscoverMovies } from "../services/tmdbAPI";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

export default function ExplorePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await getDiscoverMovies();
        setMovies(data);
      } catch (error) {
        console.error("No se han podido cargar las películas", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Explorar</h1>

      <SearchBar />

      {loading ? (
        <p className="text-slate-400 mt-4">Cargando películas...</p>
      ) : filteredMovies.length === 0 ? (
        <p className="text-slate-400 mt-4">No se han encontrado resultados</p>
      ) : (
        <MovieGrid movies={filteredMovies} />
      )}
    </div>
  );
}