import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import api from "../http/Api";
import FieldSearch from "../components/FieldSearch";
import EntityTable from "../components/EntityTable";

const EditUsers = () => {

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


        return (
            <Container>
                <Row className={"mt-5"}>
                    <Col>
                        <h2>Туристы</h2>
                    </Col>
                </Row>

                <Row className={"mt-1"}>
                    <FieldSearch filters={touristFilters} onSearchClick={getTourists}/>
                </Row>

                <Row>
                    <EntityTable data={tourists}
                                 fields={["firstName", "secondName", "username", "email", "touristCategory"]}
                                 head={["Имя", "Фамилия", "Имя пользователя", "email", "Категория"]}/>
                </Row>

                <Row className={"mt-5"}>
                    <Col>
                        <h2>Тренеры</h2>
                    </Col>
                </Row>

                <Row className={"mt-1"}>
                    <FieldSearch filters={trainerFilters} onSearchClick={getTrainers}/>
                </Row>

                <Row>
                    <EntityTable data={trainers}
                                 fields={["firstName", "secondName", "username", "email", "trainerCategory"]}
                                 head={["Имя", "Фамилия", "Имя пользователя", "email", "Категория"]}/>
                </Row>


            </Container>
        );
    }
;

export default EditUsers;