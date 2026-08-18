import { useSearchParams } from "react-router-dom";

export default function SearchBar(){
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <input type="text" value={query} onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})} placeholder="Buscar películas..." className="w-full p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700"/>
  );
}