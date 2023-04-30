import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import CheckIcon from "../components/icons/CheckIcon";
import api, {api_rejected} from "../http/Api";

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

const EditUser = () => {

    const params = useParams();
    const userId = params.id

    const [inputs, setInputs] = useState({
        username: "",
        firstName: "",
        secondName: "",
        email: "",
        userType: touristType,
        originUserType: touristType
    })

    useEffect(() => {
        api_rejected.post("trainers/get-by-id", {id: userId})
            .then(response => {
                setInputs({...response.data, userType: trainerType, originUserType: trainerType})
            })
            .catch(() => {
                api_rejected.post("tourists/get-by-id", {id: userId})
                    .then(response => {
                        setInputs({...response.data, userType: touristType, originUserType: touristType})
                    })
                    .catch(err => {
                        console.log("мэнэждер")
                    })
            })
    }, [userId])

    const onSaveClick = () => {
        if(inputs.userType !== managerType){
            if(inputs.originUserType !== inputs.userType){
                const url = inputs.originUserType===touristType? "trainers/increase" : "trainers/reduce"
                api_rejected.post(url, {id: userId})
                    .then(() => {
                        api_rejected.post("users/edit", inputs)
                    })
                    .catch(e => console.log(e))
            }
        }
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5 justify-content-between"}>
                <Col md={4}>
                    <Image src={photoUrl} roundedCircle style={{height: '100%', width: '100%'}}/>
                </Col>

                <Col md={7}>

                    {inputTemplate(inputs, setInputs, "username", "Имя пользователя")}
                    {inputTemplate(inputs, setInputs, "firstName", "Имя")}
                    {inputTemplate(inputs, setInputs, "secondName", "Фамилия")}
                    {inputTemplate(inputs, setInputs, "email", "email")}

                    <Row className={"mt-3"}>
                        <div style={{maxWidth: 300}}>
                            <select className={"form-select"} value={inputs.userType}
                                    onChange={e => setInputs({...inputs, userType: Number(e.target.value)})}>
                                <option value={touristType}>Турист</option>
                                <option value={trainerType}>Тренер</option>
                                <option value={managerType}>Мэнеджер</option>
                            </select>

                        </div>
                    </Row>

                    <Row className={"mt-5"}>
                        <div>
                            <Button variant={"secondary"} onClick={onSaveClick}>
                                <CheckIcon size={20}/>
                            </Button>
                        </div>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default EditUser;