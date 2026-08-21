import { useParams } from "react-router-dom";

export default function MovieDetailPage(){
    const {id} = useParams()

    return (
        <p>ID MOVIE {id}</p>
    )
}