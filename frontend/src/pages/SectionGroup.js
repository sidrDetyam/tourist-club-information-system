import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import PlusIcon from "../components/icons/PlusIcon";
import TrashIcon from "../components/icons/TrashIcon";
import EditIcon from "../components/icons/EditIcon";
import UploadIcon from "../components/icons/UploadIcon";
import UserCard from "../components/UserCard";
import api from "../http/Api";
import {useNavigate, useParams} from "react-router-dom";
import XIcon from "../components/icons/XIcon";
import {SECTION_GROUPS_ROUTE} from "../Consts";

const origindata = [
    {
        id: 0,
        day: 0,
        time: 'johndoe@email.com',
        type: 'раз',
        place: 'Frontend Developer',
    },
    {
        id: 1,
        day: 1,
        time: 'johndoe@email.com',
        type: 'два',
        place: 'Frontend Developer',
    },
    {
        id: 2,
        day: 2,
        time: 'johndoe@email.com',
        type: 'три',
        place: 'Frontend Developer',
    },
]

const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
]


const SectionGroup = () => {

    const params = useParams();
    const groupId = params.id
    const [info, setInfo] = useState({})

    const [tableData, setTableDataRaw] = useState([])
    const [isTableEdit, setTableEdit] = useState(false)

    const setTableData = useCallback((data) => {
        data.sort((a, b) => a.day - b.day)
        setTableDataRaw(data)
    }, [setTableDataRaw])

    const [state, setState] = useState(0)
    useEffect(() => {
            api.post("sections/section-group-info", {id: groupId}).then(value => {
                console.log(value.data)
                setTableData(value.data.schedule)
                setInfo(value.data)
            })
                .catch(error => console.log(error))
        }
        , [groupId, setInfo, setTableData, state])

    const onUploadScheduleClick = () => {
        const changes = {
            id: groupId,
            schedule: tableData
        }
        api.post("/sections/edit-schedule", changes)
            .then(value => {
                console.log(value)
                setTableEdit(false)
                setState(s => s + 1)
            })
    }

    const onChangeInput = (e, index) => {
        const {name, value} = e.target
        const editData = [...tableData]
        editData[index][name] = value
        setTableData(editData)
    }

    const onDayChange = (id) => {
        return (event) => {
            const editData = [...tableData]
            editData[id].day = Number(event.target.value)
            setTableData(editData)
        }
    }

    const onDeleteClicked = (id) => {
        return () => {
            const edata = [...tableData]
            edata.splice(id, 1)
            setTableData(edata)
        }
    }

    const onAddClicked = () => {
        const newItem = {id: null, day: 0, time: "", type: "", place: ""}
        setTableData([...tableData, newItem])
    }

    const [isEdit, setEdit] = useState(false)
    const [inputs, setInputs] = useState({name: "", trainer: null, tourists: []})
    const nav = useNavigate()

    const onDeleteClick = () => {
        api.post("section-groups/delete", {id: groupId})
            .then(() => nav(SECTION_GROUPS_ROUTE))
            .catch(e => console.log(e))
    }

    return (

        <Container>
            <Row className={"mt-5"}>
                <Col md={3}>
                    {isEdit ?
                        <input type={"text"} className={"form-control"}
                               onChange={(e) => setInputs({...inputs, name: e.target.value})}></input>
                        :
                        <h2>Группа {info.name}</h2>
                    }
                </Col>
                <Col>
                    <div>
                        {!isEdit &&
                            <Button onClick={() => setEdit(true)}>
                                <EditIcon size={20}></EditIcon>
                            </Button>
                        }

                        {isEdit &&
                            <>
                                <Button variant={"primary"}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-primary"} onClick={() => setEdit(false)}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"danger"} onClick={onDeleteClick}>
                                    <TrashIcon size={20}/>
                                </Button>
                            </>
                        }

                    </div>
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <Col className="text-center">
                    <h3>Расписание</h3>
                </Col>
            </Row>

            <Row className={"mt-1"}>
                <Col md={12}>

                    {!isTableEdit &&
                        <>
                            <table className={"table"}>
                                <thead>
                                <tr>
                                    <th className={"text-center"}>День</th>
                                    <th className={"text-center"}>Время</th>
                                    <th className={"text-center"}>Тип занятия</th>
                                    <th className={"text-center"}>Место</th>
                                    <th>
                                        <Button onClick={() => setTableEdit(true)}>
                                            <EditIcon size={16}/>
                                        </Button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map(({_, day, time, type, place}, index) => (
                                    <tr key={index}>
                                        <td style={{backgroundColor: (index+1) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{days[day]}</td>
                                        <td style={{backgroundColor: (index+2) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{time}</td>
                                        <td style={{backgroundColor: (index+3) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{type}</td>
                                        <td style={{backgroundColor: (index+4) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{place}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    }

                    {isTableEdit &&
                        <>
                            <table className={"table"}>
                                <thead>
                                <tr>
                                    <th className={"text-center"}>День</th>
                                    <th className={"text-center"}>Время</th>
                                    <th className={"text-center"}>Тип занятия</th>
                                    <th className={"text-center"}>Место</th>
                                    <th>
                                        <Button variant={"primary"} onClick={onUploadScheduleClick}>
                                            <UploadIcon size={16}/>
                                        </Button>
                                        <Button variant={"outline-primary"} onClick={() => setTableEdit(false)}>
                                            <XIcon size={16}/>
                                        </Button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map(({_, day, time, type, place}, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select name={"days"} onChange={onDayChange(index)} value={day} className={"form-select"}>
                                                {days.map((value, index) => (
                                                    <option key={value} value={index}>{value}</option>
                                                ))}
                                            </select>

                                        </td>
                                        <td>
                                            <input
                                                name="time" value={time} type="time" className={"form-control"}
                                                onChange={(e) => onChangeInput(e, index)}
                                                placeholder="Время"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name="type" type="text" value={type} className={"form-control"}
                                                onChange={(e) => onChangeInput(e, index)}
                                                placeholder="Тип"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name="place" type="text" value={place} className={"form-control"}
                                                onChange={(e) => onChangeInput(e, index)}
                                                placeholder="Место"
                                            />
                                        </td>
                                        <td>
                                            <Button variant={"danger"} onClick={onDeleteClicked(index)}>
                                                <TrashIcon size={16}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <Row className={"align-items-center justify-content-center"}>
                                <div style={{width: 20, height: 20}}>
                                    <Button variant={"primary"} onClick={onAddClicked}>
                                        <PlusIcon size={16}/>
                                    </Button>
                                </div>
                            </Row>

                        </>
                    }
                </Col>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Тренер</h3>
                </Col>
            </Row>

            <Row>
                <UserCard name={'Имя'} surname={"Фамилия"}/>
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Участники</h3>
                </Col>
            </Row>

            <Row>
                <UserCard name={'Имя'} surname={"Фамилия"}/>
                <UserCard name={'Имя'} surname={"Фамилия"}/>
                <UserCard name={'Имя'} surname={"Фамилия"}/>
                <UserCard name={'Имя'} surname={"Фамилия"}/>
            </Row>

        </Container>
    )
};

export default SectionGroup;