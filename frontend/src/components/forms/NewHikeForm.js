import React, {useState} from 'react';
import api from "../../http/Api";
import {Button, Row} from "react-bootstrap";
import InputTemplate from "./InputTemplate";
import CheckIcon from "../icons/CheckIcon";

const CREATE_HIKE_URL = "/hikes/create"

const NewHikeForm = ({updateStateCb}) => {
    const [inputs, setInputs] = useState({name: ""})

    const onSaveClick = () => {
        api.post(CREATE_HIKE_URL, inputs)
            .then(() => updateStateCb())
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <InputTemplate inputs={inputs} setInputs={setInputs} field={"name"} ph={"Название маршрута"}/>
            </Row>

            <Row className={"mt-5"}>
                <div>
                    <Button variant={"secondary"} onClick={onSaveClick}>
                        <CheckIcon size={20}/>
                    </Button>
                </div>
            </Row>
        </div>
    );
};

export default NewHikeForm;