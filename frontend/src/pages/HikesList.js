import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {HIKES_LIST_ROUTE} from "../Consts";
import api from "../http/Api";

const HikesList = () => {

    const [hikes, setHikes] = useState([])

    useEffect(() => {
        api.get("hikes/all")
            .then(response => {
                setHikes(response.data)
                console.log(response.data)
            })
    }, [setHikes])

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <h2>Походы</h2>
            </Row>

            <Row className={"mt-3"}>
                {
                    hikes.map((h, index) => (
                        <Row key={index} className={"mt-1"}>
                            <a key={index} href={`${HIKES_LIST_ROUTE}/${h.id}`} className={"link-secondary"}>{h.name}</a>
                        </Row>
                    ))
                }
            </Row>

        </div>
    );
};

export default HikesList;