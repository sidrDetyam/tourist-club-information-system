import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import api from "../http/Api";
import FieldSearch from "../components/FieldSearch";
import EntityTable from "../components/EntityTable";
import {CREATE_USER, EDIT_USERS_ROUTE} from "../Consts";
import EditIcon from "../components/icons/EditIcon";
import {useNavigate} from "react-router-dom";
import PlusIcon from "../components/icons/PlusIcon";

const EditUsersList = () => {

        const [touristCategories, setTouristCategories] = useState([{id: null, value: "Любая категория"}])
        const [touristInputs, setTouristInputs] = useState({
            firstName: null,
            lastName: null,
            cat: 0
        })

        const [trainerCategories, setTrainerCategories] = useState([{id: null, value: "Любая категория"}])
        const [trainerInputs, setTrainerInputs] = useState({
            firstName: null,
            lastName: null,
            cat: 0
        })

        const [tourists, setTourists] = useState([])
        const [trainers, setTrainers] = useState([])

        const onTouristInputChange = (field) => {
            return (val) => setTouristInputs(inputs => {
                inputs[field] = val
                return inputs
            })
        }

        const onTrainerInputChange = (field) => {
            return (val) => setTrainerInputs(inputs => {
                inputs[field] = val
                return inputs
            })
        }

        const touristFilters = [
            {
                label: "Имя", type: "input", variant: "text",
                onChange: onTouristInputChange("firstName")
            },
            {
                label: "Фамилия", type: "input", variant: "text",
                onChange: onTouristInputChange("lastName")
            },
            {
                label: "Категория туриста", type: "select",
                options: touristCategories.map(({value}) => value),
                onIndexChanged: onTouristInputChange("cat")
            },
        ]

        const trainerFilters = [
            {
                label: "Имя", type: "input", variant: "text",
                onChange: onTrainerInputChange("firstName")
            },
            {
                label: "Фамилия", type: "input", variant: "text",
                onChange: onTrainerInputChange("lastName")
            },
            {
                label: "Категория тренера", type: "select",
                options: trainerCategories.map(({value}) => value),
                onIndexChanged: onTrainerInputChange("cat")
            },
        ]

        const getTourists = () => {
            const request = {
                firstName: touristInputs.firstName,
                lastName: touristInputs.lastName,
                touristCategory: touristCategories[touristInputs.cat].id
            }
            api.post("tourists/get", request).then(response => {
                console.log(response.data)
                setTourists(response.data)
            })
        }

        const getTrainers = () => {
            const request = {
                firstName: trainerInputs.firstName,
                lastName: trainerInputs.lastName,
                trainerCategory: trainerCategories[trainerInputs.cat].id
            }
            api.post("trainers/get", request).then(response => {
                console.log(response.data)
                setTrainers(response.data)
            })
        }

        useEffect(() => {
                api.get("tourists/category-info").then(value => {
                    const cat = [{id: null, value: "Любая"}]
                    value.data.forEach(i => cat.push(i))
                    setTouristCategories(cat)
                }).catch(error => console.log(error))

                api.get("trainers/category-info").then(value => {
                    const cat = [{id: null, value: "Любая"}]
                    value.data.forEach(i => cat.push(i))
                    setTrainerCategories(cat)
                }).catch(error => console.log(error))
            }
            , [setTouristCategories, setTrainerCategories])

        const nav = useNavigate()

        const onCreateTouristClick = () => {
            nav(CREATE_USER)
        }

        return (
            <Container>
                <Row className={"mt-5"}>
                    <Col>
                        <h2>Туристы</h2>
                    </Col>
                </Row>

                <Row className={"mt-2"}>
                    <FieldSearch filters={touristFilters} onSearchClick={getTourists}/>
                </Row>

                <Row>
                    {tourists.length === 0 ?
                        <h2 className={"text-center"}>Туристы не найдены</h2>
                        :
                        <EntityTable data={tourists}
                                     fields={["firstName", "secondName", "username", "email", "touristCategory"]}
                                     head={["Имя", "Фамилия", "Имя пользователя", "email", "Категория"]}

                                     rowComponentFactory={(index) => {
                                         return (
                                             <Button
                                                 variant={"outline-secondary"}
                                                 onClick={() => nav(`${EDIT_USERS_ROUTE}/${tourists[index].id}`)}>
                                                 <EditIcon size={20}></EditIcon>
                                             </Button>
                                         )
                                     }}
                        />
                    }
                </Row>

                <Row className={"justify-content-center"}>
                    <div className={"col-1"}>
                        <Button variant={"secondary"} onClick={onCreateTouristClick}>
                            <PlusIcon size={22}/>
                        </Button>
                    </div>
                </Row>

                <Row className={"mt-5"}>
                    <Col>
                        <h2>Тренеры</h2>
                    </Col>
                </Row>

                <Row className={"mt-2"}>
                    <FieldSearch filters={trainerFilters} onSearchClick={getTrainers}/>
                </Row>

                <Row>
                    {trainers.length === 0 ?
                        <h2 className={"text-center"}>Тренеры не найдены</h2>
                        :
                        <EntityTable data={trainers}
                                     fields={["firstName", "secondName", "username", "email", "touristCategory", "trainerCategory"]}
                                     head={["Имя", "Фамилия", "Имя пользователя", "email", "Категория", "Квалификация"]}

                                     rowComponentFactory={(index) => {
                                         return (
                                             <Button
                                                 variant={"outline-secondary"}
                                                 onClick={() => nav(`${EDIT_USERS_ROUTE}/${trainers[index].id}`)}>
                                                 <EditIcon size={20}></EditIcon>
                                             </Button>
                                         )
                                     }}
                        />
                    }
                </Row>


            </Container>
        );
    }
;

export default EditUsersList;