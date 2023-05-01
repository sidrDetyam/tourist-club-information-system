import React, {useEffect, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import InputTemplate from "./InputTemplate";
import CheckIcon from "../icons/CheckIcon";
import TrashIcon from "../icons/TrashIcon";
import api from "../../http/Api";

const CREATE_POINT_URL = "/points/create"
const GET_POINT_URL = "/points/get-by-id"
const EDIT_POINT_URL = "/points/edit"
const DELETE_POINT_URL = "/points/delete"

const ControlPointForm = ({id, updateStateCb}) => {

    const [inputs, setInputs] = useState({
            point: "",
            description: ""
        })

    const onSaveClick = () => {
        api.post(CREATE_POINT_URL, inputs)
            .then(() => updateStateCb())
    }

    const onEditClick = () => {
        api.post(EDIT_POINT_URL, {id: id, ...inputs})
            .then(() => updateStateCb())
    }

    const onDeletePointClick = () => {
        api.post(DELETE_POINT_URL, {id: id})
            .then(() => updateStateCb())
    }

    useEffect(() => {
        if(id !== undefined){
            api.post(GET_POINT_URL, {id: id})
                .then(response => {
                    setInputs({...response.data})
                })
        }
    }, [id, setInputs])

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <InputTemplate inputs={inputs} setInputs={setInputs} field={"point"} ph={"Точка"}/>
                <InputTemplate inputs={inputs} setInputs={setInputs} field={"description"} ph={"Описание"}/>
            </Row>

            <Row className={"mt-5"}>
                <div>
                    <Button variant={"secondary"} onClick={id===undefined? onSaveClick : onEditClick}>
                        <CheckIcon size={20}/>
                    </Button>

                    {
                        id !== undefined &&
                        <Button variant={"outline-danger"} onClick={onDeletePointClick}>
                            <TrashIcon size={20}/>
                        </Button>
                    }
                </div>
            </Row>
        </div>
    );
};

export default ControlPointForm;