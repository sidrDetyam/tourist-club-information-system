import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../http/Api";
import {Button, Col, Row} from "react-bootstrap";
import EditIcon from "../components/icons/EditIcon";
import UploadIcon from "../components/icons/UploadIcon";
import XIcon from "../components/icons/XIcon";
import TrashIcon from "../components/icons/TrashIcon";
import FullPageLoading from "../components/FullPageLoading";
import UserCard from "../components/UserCard";


const Hike = () => {

    const params = useParams();
    const hikeId = params.id

    const [hike, setHike] = useState({})
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [inputs, setInputs] = useState({
        name: "",
    })

    useEffect(() => {
        api.post("hikes/get-by-id", {id: hikeId})
            .then(response => {
                setHike(response.data)
                setInputs(s => {
                    s.name = response.data.name
                    return s
                })
                console.log(response.data)
            })

        setLoading(false)
    }, [hikeId, setHike, setInputs])

    const onEditClick = () => {
        setEdit(!isEdit)
    }

    const onAcceptClick = () => {

    }

    const onDeleteClick = () => {

    }

    if (isLoading) {
        return <FullPageLoading loadingText={"Loading"}/>
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <Col md={4}>
                    {!isEdit && <h2>Поход {hike.name}</h2>}
                    {isEdit && <input className={"form-control"} value={inputs.name}
                                      onChange={e => setInputs({...inputs, name: e.target.value})}/>}
                </Col>

                <Col>
                    {(!isEdit ?
                            <Button onClick={onEditClick} variant={"secondary"}>
                                <EditIcon size={20}/> Редактировать
                            </Button>
                            :
                            <>
                                <Button variant={"primary"} onClick={onAcceptClick}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-primary"} onClick={onEditClick}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"danger"} onClick={onDeleteClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            </>
                    )
                    }
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Руководитель похода</h3>
                </Col>
            </Row>

            {!isEdit &&
                <>
                    <Row>
                        {hike.trainer === null || hike.trainer === undefined ?
                            <h5>Нет руководителя</h5>
                            :
                            <UserCard name={hike.trainer.firstName} surname={hike.trainer.secondName}
                                      email={hike.trainer.email}
                                      categoty={hike.trainer.trainerCategory}
                            />
                        }
                    </Row>
                </>
            }

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Маршрут</h3>
                </Col>
            </Row>

            {!isEdit &&
                <>
                    <Row>
                        {hike.route === null || hike.route === undefined ?
                            <h5>Маршрут не выбран</h5>
                            :
                            <>
                                <h5>{hike.route.name}</h5>
                                <h5>{hike.route.description}</h5>
                                <h5>Количество пунктов: {hike.route.points.length}</h5>
                                <h5>Сложность: {hike.route.category?.value}</h5>
                            </>
                        }
                    </Row>
                </>
            }

            <Row className={"mt-5"}>
                <h3>Участники похода</h3>
            </Row>

            {!isEdit && <Row>
                {hike.tourists !== undefined && hike.tourists.length !== 0 ? hike.tourists.map(trainer => (
                        <UserCard key={trainer.username}
                                  name={trainer.firstName}
                                  surname={trainer.secondName}
                                  email={trainer.email}
                                  categoty={trainer.trainerCategory}
                        />
                    ))
                    :
                    <h5>Нет участников</h5>
                }
            </Row>}
        </div>
    );
};

export default Hike;