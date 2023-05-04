import React from 'react';
import useInput from "../hooks/UseInput";
import {useNavigate} from "react-router-dom";
import api from "../http/Api";
import {SECTIONS_ROUTE} from "../Consts";
import {Button, Col, Row} from "react-bootstrap";
import UploadIcon from "./icons/UploadIcon";

const NewSectionForm = () => {
    const input = useInput("")
    const nav = useNavigate()

    const onSaveClick = () => {
        api.post("sections/create", {name: input.value})
            .then((response) => {
                nav(`${SECTIONS_ROUTE}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <h2>Новая секция</h2>
            </Row>

            <Row className={"mt-3"}>
                <Col>
                    <label>
                        <input className={"form-control"} placeholder={"Название секции"} {...input}></input>
                    </label>
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <div>
                    <Button onClick={onSaveClick} variant={"secondary"}>
                        <UploadIcon size={20}></UploadIcon>
                    </Button>
                </div>
            </Row>
        </div>
    );
};

export default NewSectionForm;