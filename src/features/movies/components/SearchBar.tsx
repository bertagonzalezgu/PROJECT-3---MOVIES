import { useSearchParams } from "react-router-dom";
import { MOVIE_GENRES, SORT_OPTIONS } from "../services/tmdbAPI";

export default function SearchBar(){
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const currentGenre = searchParams.get("genre") || "";
  const currentSort = searchParams.get("sort") || "popularity.desc";

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <input type="text" value={query} onChange={(e) => updateParam("q", e.target.value)} placeholder="Buscar películas..." className="w-full p-2.5 bg-[#1C2142] text-white rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914] transition-colors"/>

      <div className="flex flex-wrap sm:flex-nowrap gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-400 font-medium ml-1">Género</label>
          <select
            value={currentGenre}
            onChange={(e) => updateParam("genre", e.target.value)}
            className="w-full bg-[#1C2142] text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914] cursor-pointer text-sm">
            {MOVIE_GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-gray-400 font-medium ml-1">Ordenar por</label>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full bg-[#1C2142] text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914] cursor-pointer text-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}