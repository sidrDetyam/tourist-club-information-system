import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {HIKE_ROUTES, HIKES_LIST_ROUTE} from "../Consts";
import api from "../http/Api";
import EditIcon from "../components/icons/EditIcon";
import {useNavigate} from "react-router-dom";
import PlusIcon from "../components/icons/PlusIcon";
import NewHikeForm from "../components/forms/NewHikeForm";

const noForm = 0
const newHike = 1

const HikesList = () => {

    const [hikes, setHikes] = useState([])
    const [state, setState] = useState(0)
    const [edit, setEdit] = useState(noForm)

    useEffect(() => {
        api.get("hikes/all")
            .then(response => {
                setHikes(response.data)
                console.log(response.data)
            })
    }, [setHikes, state])

    return (
        <div className={"container"}>
            <Row>
                <Col md={6}>
                    <Row className={"mt-5"}>
                        <h2>Походы</h2>
                    </Row>

                    <Row className={"mt-3"}>
                        {
                            hikes.map((h, index) => (
                                <Row key={index} className={"mt-1"}>
                                    <a key={index} href={`${HIKES_LIST_ROUTE}/${h.id}`}
                                       className={"link-secondary"}>{h.name}</a>
                                </Row>
                            ))
                        }
                    </Row>

                    <Row className={"mt-3"}>
                        <div>
                            <Button variant={"outline-secondary"} onClick={() => setEdit(newHike)}>
                                <PlusIcon size={20}></PlusIcon>
                                Новый поход
                            </Button>
                        </div>
                    </Row>
                </Col>

                {edit === newHike && <Col md={6}>
                    <NewHikeForm updateStateCb={() => setState(s => s + 1)}/>
                </Col>}
            </Row>
        </div>
    );
};

export default HikesList;