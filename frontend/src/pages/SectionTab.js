import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import EditIcon from "../components/icons/EditIcon";
import TrashIcon from "../components/icons/TrashIcon";
import UserCard from "../components/UserCard";
import useInput from "../hooks/UseInput";
import api from "../http/Api";
import UploadIcon from "../components/icons/UploadIcon";
import EntityTable from "../components/EntityTable";
import CheckIcon from "../components/icons/CheckIcon";
import XIcon from "../components/icons/XIcon";
import NavBarButton from "../components/NavBarButton";
import {SECTION_GROUP_ROUTE} from "../Consts";

const SectionTab = ({info, updateCb, trainers}) => {

    // const [description, setDescription] = useState(info_.description)
    const description = useInput(info.description)
    const sectionName = useInput(info.name)
    const [isEdit, setEdit] = useState(false)

    // console.log(info)

    const onEditClick = useCallback(() => {
        const bruh = []

        trainers.forEach((t, i) => {
            if (info.trainers.map(tt => tt.id).indexOf(t.id) !== -1) {
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
                setEdit(false)
                updateCb()
            })
    }

    const onDeleteClick = () => {
        api.post("/sections/delete", {id: info.sectionId})
            .then(() => {
                setEdit(false)
                updateCb()
            })
    }

    const [checked, setChecked] = useState([]);
    const handleCheck = (id) => {
        return () => {
            var updatedList = [...checked];
            if (isChecked(id)) {
                updatedList.splice(checked.indexOf(id), 1);
            } else {
                updatedList = [...checked, id];
            }
            setChecked(updatedList);
        }
    };
    var isChecked = (id) => checked.includes(id)

    return (
        <Container>
            <Row className={"mt-2"}>
                <Col md={4}>
                    {!isEdit && <h2>{info.name}</h2>}
                    {isEdit && <input className={"form-control"} {...sectionName}/>}
                </Col>
                <Col>
                    {info.canEdit && (!isEdit ?
                            <Button onClick={onEditClick}>
                                <EditIcon size={20}/> Редактировать
                            </Button>
                            :
                            <>
                                <Button variant={"primary"} onClick={onAcceptClick}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-primary"} onClick={onEditClick}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"danger"} onClick={onDeleteClick}>
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
                        {info.manager === null ?
                            <h5>Нет руководителя</h5>
                            :
                            <UserCard name={info.manager.firstName} surname={info.manager.secondName}
                                      email={info.manager.email}/>
                        }
                    </Row>
                </>
            }

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Тренеры</h3>
                </Col>
            </Row>


            {!isEdit && <Row>
                {info.trainers.length !== 0 ? info.trainers.map(trainer => (
                        <UserCard key={trainer.username}
                                  name={trainer.firstName}
                                  surname={trainer.secondName}
                                  email={trainer.email}
                                  categoty={trainer.trainerCategory}
                        />
                    ))
                    :
                    <h5>Нет прикрепленных к секции тренеров</h5>
                }
            </Row>}

            {isEdit && <>

                {/*style={{overflowY: "scroll", maxHeight: "400px"}}*/}
                <Row>
                    <EntityTable data={trainers}
                                 fields={["firstName", "secondName", "email", "trainerCategory"]}
                                 head={["Имя", "Фамилия", "email", "Квалификация"]}

                                 rowComponentFactory={(index) => {
                                     const flag = isChecked(index)
                                     return (<Button variant={flag ? "primary" : "outline-secondary"}
                                                     onClick={handleCheck(index)}>
                                         <CheckIcon size={20}></CheckIcon>
                                     </Button>)
                                 }}
                    />
                </Row>
            </>
            }

            {!isEdit &&
                <>
                    <Row className={"mt-5"}>
                        <h3>Группы</h3>
                    </Row>
                    <Row className={"mt-2"}>
                        <div>
                            {info.groups.map((group) => (
                                <NavBarButton key={group.id} route={`${SECTION_GROUP_ROUTE}/${group.id}`}
                                              title={group.name}/>
                            ))}
                        </div>
                    </Row>
                </>
            }

            <Row className={"mt-5"}>
                <h3>О секции</h3>
            </Row>

            <Row className={"mt-2"}>
                <Col md={12}>
                    <section>
                        {!isEdit && <p style={{fontSize: "large"}}>{info.description}</p>}
                        {isEdit && <textarea className={"form-control"} cols={100} rows={20} {...description}/>}
                    </section>
                </Col>
            </Row>

        </Container>
    );
};

export default SectionTab;