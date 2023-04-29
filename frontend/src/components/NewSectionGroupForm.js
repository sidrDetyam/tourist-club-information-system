import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import UploadIcon from "./icons/UploadIcon";
import api from "../http/Api";
import useInput from "../hooks/UseInput";
import {useNavigate} from "react-router-dom";
import {SECTION_GROUP_ROUTE} from "../Consts";

const NewSectionGroupForm = ({section}) => {

    const input = useInput("")
    const nav = useNavigate()

    const onSaveClick = () => {
        api.post("section-groups/create", {sectionId: section.id, name: input.value})
            .then((response) => {
                nav(`${SECTION_GROUP_ROUTE}/${response.data}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={"container"}>
            <Row className={"mt-5"}>
                <h2>Новая группа ({section.name})</h2>
            </Row>

            <Row className={"mt-3"}>
                <Col>
                    <label>
                        Название группы:
                        <input className={"form-control"} placeholder={"Название группы"} {...input}></input>
                    </label>
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <div>
                    <Button onClick={onSaveClick}>
                        <UploadIcon size={20}></UploadIcon>
                    </Button>
                </div>
            </Row>
        </div>
    );
};

export default NewSectionGroupForm;