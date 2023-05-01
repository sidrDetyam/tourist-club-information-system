import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import PlusIcon from "../components/icons/PlusIcon";
import ControlPointForm from "../components/forms/ControlPointForm";
import api from "../http/Api";

const noForm = 0
const editPoint = 1
const newPoint = 2
const editRoute = 3
const newRoute = 4

const GET_ALL_POINTS_URL = "/points/get-all"

const HikeRoutes = () => {

    const [currentEdit, setCurrentEdit] = useState(noForm)
    const [points, setPoints] = useState([])
    const [id, setId] = useState(-1)

    const [state, setState] = useState(0)
    const updateState = useCallback(() => {
        setCurrentEdit(noForm)
        setState(s => s+1)
    }, [setState, setCurrentEdit])

    useEffect(() => {
        api.get(GET_ALL_POINTS_URL)
            .then(response => setPoints(response.data))
    }, [setPoints, state])

    const onPointClick = (index) => {
        return () => {
            setId(points[index].id)
            setCurrentEdit(editPoint)
        }
    }

    return (
        <div className={"container"}>
            <Row>
                <Col className={currentEdit === noForm ? "col-6" : "col-4"}>
                    <Row className={"mt-5"}>
                        <h3>Контрольные точки</h3>
                    </Row>

                    <Row className={"mt-2"}>
                        {
                            <div>
                                {points.map((p, index) => (
                                <Button key={index} onClick={onPointClick(index)} variant={"outline-secondary"}>
                                    {p.point}
                                </Button>))}
                            </div>
                        }
                    </Row>

                    <Row className={"mt-3"}>
                        <div>
                            <Button variant={"outline-secondary"} onClick={() => setCurrentEdit(newPoint)}>
                                <PlusIcon size={20}></PlusIcon>
                                Новая контрольная точка
                            </Button>
                        </div>
                    </Row>

                    <Row className={"mt-5"}>
                        <h3>Маршруты</h3>
                    </Row>

                    <Row className={"mt-3"}>
                        <div>
                            <Button variant={"outline-secondary"}>
                                <PlusIcon size={20}></PlusIcon>
                                Новый маршрут
                            </Button>
                        </div>
                    </Row>
                </Col>

                {currentEdit === newPoint &&
                    <Col md={8}>
                        <ControlPointForm updateStateCb={updateState}/>
                    </Col>
                }

                {currentEdit === editPoint &&
                    <Col md={8}>
                        <ControlPointForm id={id} updateStateCb={updateState}/>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default HikeRoutes;