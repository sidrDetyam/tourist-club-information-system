import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {HIKE_ROUTES, HIKES_LIST_ROUTE} from "../Consts";
import api from "../http/Api";
import EditIcon from "../components/icons/EditIcon";
import {useNavigate} from "react-router-dom";

const HikesList = () => {

    const [hikes, setHikes] = useState([])
    const nav = useNavigate()

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

            <Row className={"mt-3"}>
                <div>
                    <Button variant={"outline-secondary"} onClick={() => nav(HIKE_ROUTES)}>
                        <EditIcon size={20}></EditIcon>
                          Маршруты
                    </Button>
                </div>
            </Row>

        </div>
    );
};

export default HikesList;