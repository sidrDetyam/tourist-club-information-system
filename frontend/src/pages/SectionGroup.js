import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import PlusIcon from "../components/icons/PlusIcon";
import TrashIcon from "../components/icons/TrashIcon";

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
        type: 'раз',
        place: 'Frontend Developer',
    },
    {
        id: 2,
        day: 2,
        time: 'johndoe@email.com',
        type: 'раз',
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
    const [tableData, setTableData] = useState(origindata)

    const onChangeInput = (e, id) => {
        const {name, value} = e.target

        const editData = tableData.map((item) =>
            item.id === id && name ? {...item, [name]: value} : item
        )

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

    return (
        <div className="container">
            <h1 className="title">ReactJS Editable Table</h1>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>День</th>
                    <th>Время</th>
                    <th>Тип</th>
                    <th>Место</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tableData.map(({id, day, time, type, place}, index) => (
                    <tr key={id}>
                        <td>
                            {/*<input*/}
                            {/*    name="day"*/}
                            {/*    value={day}*/}
                            {/*    type="text"*/}
                            {/*    onChange={(e) => onChangeInput(e, id)}*/}
                            {/*    placeholder="Type Name"*/}
                            {/*/>*/}
                            <select name={"days"} onChange={onDayChange(index)} value={day}>
                                {days.map((value, index) => (
                                    <option key={value} value={index}>{value}</option>
                                ))}
                            </select>

                        </td>
                        <td>
                            <input
                                name="time"
                                value={time}
                                type="text"
                                onChange={(e) => onChangeInput(e, id)}
                                placeholder="Type Email"
                            />
                        </td>
                        <td>
                            <input
                                name="type"
                                type="text"
                                value={type}
                                onChange={(e) => onChangeInput(e, id)}
                                placeholder="Type Position"
                            />
                        </td>
                        <td>
                            <input
                                name="place"
                                type="text"
                                value={place}
                                onChange={(e) => onChangeInput(e, id)}
                                placeholder="Type Position"
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
        </div>
    )
};

export default SectionGroup;