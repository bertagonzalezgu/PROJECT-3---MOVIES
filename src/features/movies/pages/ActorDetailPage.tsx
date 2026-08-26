import { useParams } from "react-router-dom";

export default function ActorDetailPage(){
    const {id} = useParams()

    return (
        <p>ID ACTOR {id}</p>
    )
}