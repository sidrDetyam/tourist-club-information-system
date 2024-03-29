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
import EntityTable from "../components/EntityTable";
import CheckIcon from "../components/icons/CheckIcon";

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
    const [info, setInfo] = useState({tourists: [], trainer: null})

    const [tableData, setTableDataRaw] = useState([])
    const [isTableEdit, setTableEdit] = useState(false)

    const setTableData = useCallback((data) => {
        data.sort((a, b) => a.day - b.day)
        setTableDataRaw(data)
    }, [setTableDataRaw])


    const [state, setState] = useState(0)

    const [trainers, setTrainers] = useState([])
    const [tourists, setTourists] = useState([])

    const [isEdit, setEdit] = useState(false)
    const [inputs, setInputs] = useState({name: "", trainer: null, tourists: []})
    const nav = useNavigate()

    useEffect(() => {
        api.post("trainers/get", {}).then(t => setTrainers(t.data))
        api.post("tourists/get", {}).then(t => setTourists(t.data))
    }, [setTrainers])

    useEffect(() => {
            api.post("sections/section-group-info", {id: groupId}).then(value => {
                console.log(value.data)
                setTableData(value.data.schedule)
                setInfo(value.data)
                setInputs(s => {
                    s.name = value.data.name
                    return s
                })
            })
                .catch(error => console.log(error))
        }
        , [groupId, setInfo, setTableData, state, setInputs])

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

    const onDeleteClick = () => {
        api.post("section-groups/delete", {id: groupId})
            .then(() => nav(SECTION_GROUPS_ROUTE))
            .catch(e => console.log(e))
    }

    const isTrainerChecked = (ind) => {
        return inputs.trainer === ind;
    }

    const handleTrainerCheck = (ind) => () => {
        if (isTrainerChecked(ind)) {
            setInputs({...inputs, trainer: null})
        } else {
            setInputs({...inputs, trainer: ind})
        }
    }
    const handleTouristCheck = (ind) => {
        return () => {
            var updatedList = [...inputs.tourists];
            if(isTouristChecked(ind)){
                updatedList.splice(inputs.tourists.indexOf(ind), 1);
            }
            else{
                updatedList = [...inputs.tourists, ind];
            }
            setInputs({...inputs, tourists: updatedList});
        }
    };
    var isTouristChecked = (ind) => inputs.tourists.includes(ind)

    const onSubmitInfoClick = () => {
        const newInfo = {
            groupId: groupId,
            trainerId: inputs.trainer===null? null : trainers[inputs.trainer].id,
            touristIds: inputs.tourists.map(index => tourists[index].id),
            name: inputs.name
        }
        // console.log(newInfo)
        api.post("section-groups/edit", newInfo).then(() => {
            setState(s => s+1)
            setEdit(false)
        })
    }

    return (

        <Container>
            <Row className={"mt-5"}>
                <Col md={3}>
                    {isEdit ?
                        <input type={"text"} className={"form-control"} value={inputs.name}
                               onChange={(e) => setInputs({...inputs, name: e.target.value})}></input>
                        :
                        <h2>Группа {info.name}</h2>
                    }
                </Col>
                <Col>
                    <div>
                        {!isEdit &&
                            <Button onClick={() => setEdit(true)} variant={"secondary"}>
                                <EditIcon size={20}></EditIcon>
                                Редактировать
                            </Button>
                        }

                        {isEdit &&
                            <>
                                <Button variant={"secondary"} onClick={onSubmitInfoClick}>
                                    <UploadIcon size={20}/>
                                </Button>
                                <Button variant={"outline-secondary"} onClick={() => setEdit(false)}>
                                    <XIcon size={20}/>
                                </Button>
                                <Button variant={"outline-danger"} onClick={onDeleteClick}>
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
                                        <Button onClick={() => setTableEdit(true)} variant={"secondary"}>
                                            <EditIcon size={16}/>
                                        </Button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map(({_, day, time, type, place}, index) => (
                                    <tr key={index}>
                                        <td style={{backgroundColor: (index + 1) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{days[day]}</td>
                                        <td style={{backgroundColor: (index + 2) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{time}</td>
                                        <td style={{backgroundColor: (index + 3) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{type}</td>
                                        <td style={{backgroundColor: (index + 4) % 2 === 0 ? "#f2f2f2" : "#ffffff"}}>{place}</td>
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
                                        <Button variant={"secondary"} onClick={onUploadScheduleClick}>
                                            <UploadIcon size={20}/>
                                        </Button>
                                        <Button variant={"outline-secondary"} onClick={() => setTableEdit(false)}>
                                            <XIcon size={20}/>
                                        </Button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map(({_, day, time, type, place}, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select name={"days"} onChange={onDayChange(index)} value={day}
                                                    className={"form-select"}>
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
                                            <Button variant={"outline-danger"} onClick={onDeleteClicked(index)}>
                                                <TrashIcon size={16}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <Row className={"align-items-center justify-content-center"}>
                                <div style={{width: 20, height: 20}}>
                                    <Button variant={"secondary"} onClick={onAddClicked}>
                                        <PlusIcon size={20}/>
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
                {isEdit ?
                    <EntityTable data={trainers}
                                 fields={["firstName", "secondName", "email", "trainerCategory"]}
                                 head={["Имя", "Фамилия", "email", "Квалификация"]}

                                 rowComponentFactory={(index) => {
                                     const flag = isTrainerChecked(index)
                                     return (<Button variant={flag ? "secondary" : "outline-secondary"}
                                                     onClick={handleTrainerCheck(index)}>
                                         {flag? <CheckIcon size={20}/> : <PlusIcon size={20}/>}
                                     </Button>)
                                 }}
                    /> : (info.trainer === null ?
                        <h4>Тренер не выбран</h4>
                        :
                        <UserCard name={info.trainer.firstName} surname={info.trainer.secondName}
                                  email={info.trainer.email} categoty={info.trainer.trainerCategory}></UserCard>)
                }
            </Row>

            <Row className={"mt-5"}>
                <Col md={6} className="text">
                    <h3>Участники</h3>
                </Col>
            </Row>

            <Row>
                {isEdit ?
                    <EntityTable data={tourists}
                                 fields={["firstName", "secondName", "email", "touristCategory"]}
                                 head={["Имя", "Фамилия", "email", "Категория"]}

                                 rowComponentFactory={(index) => {
                                     const flag = isTouristChecked(index)
                                     return (<Button variant={flag ? "secondary" : "outline-secondary"}
                                                     onClick={handleTouristCheck(index)}>
                                         {flag? <CheckIcon size={20}/> : <PlusIcon size={20}/>}
                                     </Button>)
                                 }}
                    /> : (info.tourists.length === 0 ?
                        <h4>Нет туристов</h4>
                        : (<>
                            {info.tourists.map((t) => (
                                <UserCard key={t.id} name={t.firstName} surname={t.secondName}
                                          email={t.email} categoty={t.touristCategory}></UserCard>)
                            )}
                        </>))
                }
            </Row>

        </Container>
    )
};

export default SectionGroup;