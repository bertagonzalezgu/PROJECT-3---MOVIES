import { useParams } from "react-router-dom";

export default function DirectorDetailPage(){
    const {id} = useParams()

    return (
        <p>ID DIRECTOR {id}</p>
    )
}