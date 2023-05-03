import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api, {api_rejected} from "../http/Api";
import {Button, Col, Row} from "react-bootstrap";
import EditIcon from "../components/icons/EditIcon";
import UploadIcon from "../components/icons/UploadIcon";
import XIcon from "../components/icons/XIcon";
import TrashIcon from "../components/icons/TrashIcon";
import FullPageLoading from "../components/FullPageLoading";
import UserCard from "../components/UserCard";
import EntityTable from "../components/EntityTable";
import CheckIcon from "../components/icons/CheckIcon";
import PlusIcon from "../components/icons/PlusIcon";
import useSelect from "../hooks/UseSelect";
import useRadioSelect from "../hooks/UseRadioSelect";
import selectorComponentFactory from "../hooks/SelectorComponentFactory";
import InputTemplate from "../components/forms/InputTemplate";

const GET_HIKE_URL = "hikes/get-by-id"
const GET_ALL_TOURISTS = "tourists/get"
const GET_ALL_TRAINERS = "trainers/get"
const GET_ALL_ROUTES = "routes/get-all"
const EDIT_HIKE = "hikes/edit"
const DELETE_HIKE = "hikes/delete"

const Hike = () => {

    const params = useParams();
    const hikeId = params.id

    const [hike, setHike] = useState({})
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [inputs, setInputs] = useState({
        name: "",
        timeStart: null,
        timeEnd: null
    })

    const [tourists, setTourists] = useState([])
    const touristSelector = useSelect()

    const [trainers, setTrainers] = useState([])
    const trainerSelector = useRadioSelect()

    const [routes, setRoutes] = useState([])
    const routeSelector = useRadioSelect()

    useEffect(() => {
        api_rejected.post(GET_ALL_TOURISTS, {})
            .then(response => {
                setTourists(response.data)
            })

        api_rejected.post(GET_ALL_TRAINERS, {})
            .then(response => {
                setTrainers(response.data)
            })

        api_rejected.get(GET_ALL_ROUTES)
            .then(response => {
                setRoutes(response.data)
            })
    }, [setTrainers, setTourists, setRoutes])

    const [state, setState] = useState(0)

    useEffect(() => {
        api.post(GET_HIKE_URL, {id: hikeId})
            .then(response => {
                setHike(response.data)
                setInputs(s => {
                    s.name = response.data.name
                    s.timeStart = response.data.start.substring(0, 16)
                    s.timeEnd = response.data.end.substring(0, 16)
                    return s
                })
                console.log(response.data)
            })

        setLoading(false)
    }, [hikeId, setHike, setInputs, state])

    const onEditClick = () => {
        setEdit(!isEdit)
    }

    const onAcceptClick = () => {
        const request = {
            id: hikeId,
            name: inputs.name,
            start: inputs.timeStart,
            end: inputs.timeEnd,
            routeId: routeSelector.checked!==null? routes[routeSelector.checked].id : null,
            touristIds: touristSelector.checked.map(v => tourists[v].id),
            trainerId: trainerSelector.checked!==null? trainers[trainerSelector.checked].id : null,
        }

        api_rejected.post(EDIT_HIKE, request)
            .then(() => {
                setState(s => s+1)
                setEdit(false)
            })
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
                    {!isEdit && <h2>{hike.name}</h2>}
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
                                <Button variant={"secondary"} onClick={onAcceptClick}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-secondary"} onClick={onEditClick}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"outline-danger"} onClick={onDeleteClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            </>
                    )
                    }
                </Col>
            </Row>

            <Row className={"mt-3 justify-content-start"}>
                <Col md={3}>
                    <InputTemplate other={isEdit ? {} : {readOnly: "readonly"}}
                                   inputs={inputs} setInputs={setInputs}
                                   maxWidth={250}
                                   variant={"datetime-local"} ph={"Начало похода"} field={"timeStart"}/>
                </Col>
                <Col md={3}>
                    <InputTemplate other={isEdit ? {} : {readOnly: "readonly"}}
                                   inputs={inputs} setInputs={setInputs}
                                   maxWidth={250}
                                   variant={"datetime-local"} ph={"Конец похода"} field={"timeEnd"}/>
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Руководитель похода</h3>
                </Col>
            </Row>

            <Row>
                {isEdit &&
                    <EntityTable data={trainers}
                                 fields={["firstName", "secondName", "email", "trainerCategory"]}
                                 head={["Имя", "Фамилия", "email", "Квалификация"]}
                                 rowComponentFactory={selectorComponentFactory(trainerSelector)}
                    />
                }
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

            <Row>
                {isEdit &&
                    <EntityTable data={routes.map(r => {
                        return {...r, category: r.category.value, cntPoints: r.points.length}
                    })
                    }
                                 fields={["name", "description", "category", "cntPoints"]}
                                 head={["Название", "Описание", "Категория", "Количество точек"]}
                                 rowComponentFactory={selectorComponentFactory(routeSelector)}
                    />
                }
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

            <Row>
                {isEdit &&
                    <EntityTable data={tourists}
                                 fields={["firstName", "secondName", "email", "touristCategory"]}
                                 head={["Имя", "Фамилия", "email", "Категория"]}
                                 rowComponentFactory={selectorComponentFactory(touristSelector)}
                    />
                }
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