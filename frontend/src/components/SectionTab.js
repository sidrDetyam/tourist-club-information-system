import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";
import UserCard from "./UserCard";
import useInput from "../hooks/UseInput";
import api from "../http/Api";
import EyeIcon from "./icons/EyeIcon";

const SectionTab = ({info, updateCb, trainers}) => {

    // const [description, setDescription] = useState(info_.description)
    const description = useInput(info.description)
    const sectionName = useInput(info.name)
    const [isEdit, setEdit] = useState(false)

    const onEditClick = useCallback(() => {
        const bruh = []

        trainers.forEach((t, i) => {
            if(info.trainers.map(tt => tt.id).indexOf(t.id) !== -1){
                bruh.push(i)
            }
        })
        setChecked(bruh)
        setEdit(edit => !edit)
    }, [info.trainers, trainers])

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

    // const checkedItems = checked.length
    //     ? checked.reduce((total, item) => {
    //         return total + ", " + item;
    //     })
    //     : "";

    // Return classes based on whether item is checked
    var isChecked = (id) =>
        checked.includes(id) ? "checked-item" : "not-checked-item";

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
                {info.trainers.length!==0? info.trainers.map(trainer => (
                    <UserCard key={trainer.username}
                              name={trainer.firstName} surname={trainer.secondName}
                              email={trainer.email}/>
                ))
                :
                <h5>Нет прикрепленных к секции тренеров</h5>
                }
            </Row>}

            {isEdit && <Row>
                <div className="checkList container" style={{overflowY: "scroll", maxHeight: "200px"}}>
                    <div className="list-container">
                        {checkList.map((item, index) => (
                            <div key={index}>
                                <input value={item} type="checkbox" onChange={handleCheck(index)} checked={checked.includes(index)}/>
                                <span className={isChecked(index)}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/*<div>*/}
                {/*    {`Items checked are: ${checkedItems}`}*/}
                {/*</div>*/}
            </Row>}

            <Row className={"mt-5"}>
                <Col md={12}>
                    <section>
                        {!isEdit && <pre><p style={{fontSize: "large"}}>{info.description}</p></pre>}
                        {isEdit && <textarea cols={100} rows={20} {...description}/>}
                    </section>
                </Col>
            </Row>

        </Container>
    );
};

export default SectionTab;