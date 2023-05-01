import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import NavBarButton from "../components/NavBarButton";
import {SECTION_GROUP_ROUTE} from "../Consts";
import PlusIcon from "../components/icons/PlusIcon";
import NewSectionGroupForm from "../components/NewSectionGroupForm";
import NewSectionForm from "../components/NewSectionForm";
import ControlPointForm from "../components/forms/ControlPointForm";

const noForm = 0
const editPoint = 1
const newPoint = 2
const editRoute = 3
const newRoute = 4

const HikeRoutes = () => {

    const [currentEdit, setCurrentEdit] = useState(noForm)
    const [id, setId] = useState(-1)

    return (
        <div className={"container"}>
            <Row>
                <Col className={currentEdit === noForm ? "col-12" : "col-4"}>
                    <Row className={"mt-5"}>
                        <h3>Контрольные точки</h3>
                    </Row>

                    <Row className={"mt-2"}>
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

                    <Row className={"mt-2"}>
                        <div>
                            <Button variant={"outline-secondary"}>
                                <PlusIcon size={20}></PlusIcon>
                                Новый маршрут
                            </Button>
                        </div>
                    </Row>
                </Col>

                {
                    currentEdit===newPoint &&
                    <Col md={8}>
                        <ControlPointForm/>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default HikeRoutes;