import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../http/Api";


const Hike = () => {

    const params = useParams();
    const hikeId = params.id

    const [hike, setHike] = useState({})

    useEffect(() => {
        api.post("hikes/get-by-id", {id: hikeId})
            .then(response => {
                setHike(response.data)
                console.log(response.data)
            })
    }, [hikeId, setHike])

    return (
        <div className={"container"}>
            <h1>{hikeId}</h1>
        </div>
    );
};

export default Hike;