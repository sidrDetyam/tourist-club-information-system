import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import EditIcon from "./icons/EditIcon";
import XIcon from "./icons/XIcon";
import TrashIcon from "./icons/TrashIcon";
import UserCard from "./UserCard";
import useInput from "../hooks/UseInput";
import api from "../http/Api";

const SectionTab = ({info_}) => {

    const [info, setInfo] = useState(info_)
    // const [description, setDescription] = useState(info_.description)
    const description = useInput(info.description)
    const sectionName = useInput(info.name)

    const onEditClick = useCallback(() => {
        setInfo({...info, isEdit: !info.isEdit})
    }, [info, setInfo])

    const onAcceptClick = () => {
        const changes = {name: sectionName.value, description: description.value, id: info.sectionId}
        api.post("/sections/edit", changes).then(value => console.log(value))
    }

    return (
        <Container>
            <Row className={"mt-2"}>
                <Col md={4}>
                    <h2>{info.name}</h2>
                </Col>
                <Col>
                    {info.canEdit && (!info.isEdit ?
                            <Button onClick={onEditClick}>
                                <EditIcon size={20}/>
                            </Button>
                            :
                            <>
                                <Button variant={"success"} onClick={onAcceptClick}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"danger"} onClick={onEditClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            </>
                    )
                    }
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <section>
                    {info.isEdit?
                        <>
                            <input {...description}></input>
                            <input {...sectionName}></input>
                        </>
                        :
                        <p style={{fontSize: "large"}}>{info.description}</p>
                    }

                    {/*<p style={{fontSize: "large"}}>{description.value}</p>*/}
                    {/*<p style={{fontSize: "large"}}>{se.value}</p>*/}
                </section>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Руководитель</h3>
                </Col>
            </Row>

            <Row>
                <UserCard name={info.manager.firstName} surname={info.manager.secondName}
                          email={info.manager.email}/>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Тренеры</h3>
                </Col>
            </Row>

            <Row>
                {info.trainers.map(trainer => (
                    <UserCard key={trainer.username}
                              name={trainer.firstName} surname={trainer.secondName}
                              email={trainer.email}/>
                ))}
            </Row>

        </Container>
    );
};

export default SectionTab;