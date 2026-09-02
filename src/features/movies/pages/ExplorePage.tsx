import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie } from "../types/movies.types";
import { getDiscoverMovies, searchMovies } from "../services/tmdbAPI";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

export default function ExplorePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        let data: Movie[] = [];

        if (query.trim() !== "") {
          data = await searchMovies(query);
        } else {
          data = await getDiscoverMovies({
            genreId: genre,
            sortBy: sort,
          });
        }

        setMovies(data);
      } catch {
        setError("No se han podido cargar las películas");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();

  }, [query, genre, sort]);

  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-18 md:py-10 md:pr-12 md:pl-32 transition-all">
      <header className="mb-6 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Explorar <span className="text-[#E50914]">Catálogo</span>
        </h1>
      </header>

      <div className="mb-8 max-w-xl">
        <SearchBar />
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-lg font-medium animate-pulse text-gray-300">
            Cargando catálogo...
          </p>
        </div>
      )}

      {error && (
        <div role="alert" className="p-4 bg-[#B20710]/20 border border-[#B20710] text-red-200 rounded-lg text-center max-w-md mx-auto my-12">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
              <p className="text-gray-400 text-lg">
                No se han encontrado resultados{" "}
                {query && (
                  <>
                    para <span className="text-white font-semibold">"{query}"</span>
                  </>
                )}
              </p>
            </div>
          ) : (
            <MovieGrid movies={movies} />
          )}
        </>
      )}
    </main>
  );
}