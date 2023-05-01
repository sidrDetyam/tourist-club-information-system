import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import CheckIcon from "../components/icons/CheckIcon";
import api, {api_rejected} from "../http/Api";
import TrashIcon from "../components/icons/TrashIcon";
import {EDIT_USERS_ROUTE} from "../Consts";
import axios from "axios";
import SearchIcon from "../components/icons/SearchIcon";
import SelectForm from "../components/SelectForm";

const photoUrl = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"

const touristType = 0
const trainerType = 1
const managerType = 2

const inputTemplate = (inputs, setInputs, field, ph) => {
    return <Row className={"mt-3"}>
        <div style={{maxWidth: 300}}>
            <input value={inputs[field] === null ? "" : inputs[field]}
                   onChange={e => {
                       const obj = {...inputs}
                       obj[field] = e.target.value
                       setInputs(obj)
                   }
                   }
                   className={"form-control"}
                   placeholder={ph}
            />
        </div>
    </Row>
}

const EditUser = ({type}) => {

    const params = useParams();
    const userId = params.id

    const nav = useNavigate()

    const [inputs, setInputs] = useState({
        username: "",
        firstName: "",
        secondName: "",
        email: "",
        userType: touristType,
        originUserType: touristType
    })

    const [catInput, setCatInput] = useState({
        curTur: 0, tur: [{id: null, value: "Bruh"}],
        curTrain: 0, train: [{id: null, value: "Bruh"}]
    })

    useEffect(() => {
            api.get("tourists/category-info").then(response => {
                setCatInput(s => {
                    s.tur = response.data
                    return s
                })
            }).catch(error => console.log(error))

            api.get("trainers/category-info").then(response => {
                setCatInput(s => {
                    s.train = response.data
                    return s
                })
            }).catch(error => console.log(error))
        }
        , [setCatInput])

    useEffect(() => {
        if (type === "edit") {
            api_rejected.post("trainers/get-by-id", {id: userId})
                .then(response => {
                    setInputs({...response.data, userType: trainerType, originUserType: trainerType})
                })
                .catch(() => {
                    api_rejected.post("tourists/get-by-id", {id: userId})
                        .then(response => {
                            setInputs({...response.data, userType: touristType, originUserType: touristType})
                        })
                        .catch(() => {
                            console.log("мэнэждер")
                        })
                })
        }
    }, [type, userId])

    const onSaveClick = () => {
        if (type === "edit") {
            if (inputs.userType !== managerType) {
                const editUrl = inputs.userType === touristType? "tourists/edit" : "trainers/edit";
                const request = {
                    ...inputs,
                    touristCategory: catInput.tur[catInput.curTur].value,
                    trainerCategory: catInput.train[catInput.curTrain].value,
                    id: userId
                }

                if (inputs.originUserType !== inputs.userType) {
                    const url = inputs.originUserType === touristType ? "trainers/increase" : "trainers/reduce"
                    api_rejected.post(url, {id: userId})
                        .then(() => {
                            api_rejected.post(editUrl, request)
                        })
                        .catch(e => console.log(e))
                } else {
                    api_rejected.post(editUrl, request)
                }
            }
        } else {
            api.post("/tourists/create", inputs).then(() => nav(`${EDIT_USERS_ROUTE}`))
        }
    }

    const onDeleteClick = () => {
        const url = inputs.originUserType === touristType ? "tourists/delete" : "trainers/delete"
        api_rejected.post(url, {id: userId}).then(() => nav(`${EDIT_USERS_ROUTE}`))
    }

    const onRandomClick = () => {
        axios.get(
            'https://randomuser.me/api/',
            {
                dataType: 'json',
            }).then((response) => {
            const data = response.data.results[0]
            setInputs({
                ...inputs,
                username: data.login.username,
                firstName: data.name.first,
                secondName: data.name.last,
                email: data.email
            })
        })
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5 justify-content-between"}>
                <Col md={4}>
                    <Image src={photoUrl} roundedCircle style={{height: '100%', width: '100%'}}/>
                </Col>

                <Col md={6}>

                    {inputTemplate(inputs, setInputs, "username", "Имя пользователя")}
                    {inputTemplate(inputs, setInputs, "firstName", "Имя")}
                    {inputTemplate(inputs, setInputs, "secondName", "Фамилия")}
                    {inputTemplate(inputs, setInputs, "email", "email")}

                    <Row className={"mt-3"}>
                        <div style={{maxWidth: 300}}>
                            <SelectForm options={catInput.tur.map(t => t.value)}
                                        onIndexChanged={index => setCatInput({...catInput, curTur: index})}/>
                        </div>
                    </Row>

                    {inputs.userType === trainerType &&
                        <Row className={"mt-3"}>
                            <div style={{maxWidth: 300}}>
                                <SelectForm options={catInput.train.map(t => t.value)}
                                            onIndexChanged={index => setCatInput({...catInput, curTrain: index})}/>
                            </div>
                        </Row>
                    }

                    <Row className={"mt-3"}>
                        <div style={{maxWidth: 300}}>
                            <select className={"form-select"} value={inputs.userType}
                                    onChange={e => setInputs({...inputs, userType: Number(e.target.value)})}>
                                <option value={touristType}>Турист</option>
                                <option value={trainerType}>Тренер</option>
                                {/*<option value={managerType}>Мэнеджер</option>*/}
                            </select>
                        </div>
                    </Row>

                    <Row className={"mt-5"}>
                        <div>
                            <Button variant={"secondary"} onClick={onSaveClick}>
                                <CheckIcon size={20}/>
                            </Button>

                            {
                                type === "edit" &&
                                <Button variant={"outline-danger"} onClick={onDeleteClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            }
                        </div>
                    </Row>
                </Col>

                <Col md={2}>
                    {
                        type === "create" &&
                        <Row className={"mt-3"}>
                            <div>
                                <Button variant={"outline-secondary"} onClick={onRandomClick}>
                                    <SearchIcon size={20}/>
                                    Рандом
                                </Button>
                            </div>
                        </Row>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default EditUser;