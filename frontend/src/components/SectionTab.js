import React, {useCallback, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";
import UserCard from "./UserCard";
import useInput from "../hooks/UseInput";
import api from "../http/Api";
import EyeIcon from "./icons/EyeIcon";
import PlusIcon from "./icons/PlusIcon";

const SectionTab = ({info, updateCb, trainers}) => {

    // const [description, setDescription] = useState(info_.description)
    const description = useInput(info.description)
    const sectionName = useInput(info.name)
    const [isEdit, setEdit] = useState(false)

    const onEditClick = useCallback(() => {
        setChecked([])
        setEdit(edit => !edit)
    }, [setEdit])

    const onAcceptClick = () => {
        const changes = {
            name: sectionName.value,
            description: description.value,
            id: info.sectionId,
            trainersId: checked.map(ind => trainers[ind].id)
        }
        api.post("/sections/edit", changes)
            .then(value => {
                console.log(value)
                setEdit(false)
                updateCb()
            })
    }

    const [checked, setChecked] = useState([]);
    const checkList = trainers.map(t => "  " + t.firstName + " " + t.secondName);

    const handleCheck = (id) => {
        return (event) => {
            var updatedList = [...checked];
            if (event.target.checked) {
                updatedList = [...checked, id];
            } else {
                updatedList.splice(checked.indexOf(id), 1);
            }
            setChecked(updatedList);
        }
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
        <Container>
            <Row className={"mt-2"}>
                <Col md={4}>
                    {!isEdit && <h2>{info.name}</h2>}
                    {isEdit && <input {...sectionName}/>}
                </Col>
                <Col>
                    {info.canEdit && (!isEdit ?
                            <Button onClick={onEditClick}>
                                <EditIcon size={20}/> Редактировать
                            </Button>
                            :
                            <>
                                <Button variant={"success"} onClick={onAcceptClick}>
                                    <EyeIcon size={20}/>
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
                <Col md={12}>
                    <section>
                        {!isEdit && <pre><p style={{fontSize: "large"}}>{info.description}</p></pre>}
                        {isEdit && <textarea cols={100} rows={20} {...description}/>}
                    </section>
                </Col>
            </Row>


            {!isEdit &&
                <>
                    <Row className={"mt-5"}>
                        <Col md={6} className="text">
                            <h3>Руководитель</h3>
                        </Col>
                    </Row>
                    <Row>
                        <UserCard name={info.manager.firstName} surname={info.manager.secondName}
                                  email={info.manager.email}/>
                    </Row>
                </>
            }

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Тренеры</h3>
                </Col>
            </Row>


            {!isEdit && <Row>
                {/*{JSON.stringify(info)}*/}
                {info.trainers.map(trainer => (
                    <UserCard key={trainer.username}
                              name={trainer.firstName} surname={trainer.secondName}
                              email={trainer.email}/>
                ))}
            </Row>}

            {isEdit && <Row>
                <div className="checkList container" style={{overflowY: "scroll", maxHeight: "200px"}}>
                    <div className="list-container">
                        {checkList.map((item, index) => (
                            <div key={index}>
                                <input value={item} type="checkbox" onChange={handleCheck(index)}/>
                                <span className={isChecked(item)}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>
            </Row>}


        </Container>
    );
};

export default SectionTab;