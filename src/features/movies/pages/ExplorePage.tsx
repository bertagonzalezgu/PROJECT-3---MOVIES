import { useSearchParams } from "react-router-dom";
import type { Movie } from "../types/movies.types";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

interface ExplorePageProps {
  movies: Movie[];
}

export default function ExplorePage({ movies }: ExplorePageProps) {
  const [searchParams] = useSearchParams();
  
  const query = searchParams.get("q") || "";

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">

        <h1 className="text-2xl font-bold mb-4 text-white">Explorar</h1>

        <SearchBar />

        {filteredMovies.length === 0 ? (<p className="text-slate-400 mt-4">No se han encontrado resultados</p>) : (<MovieGrid movies={filteredMovies}/>)}

    </div>
  );
}