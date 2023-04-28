import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import NavBarButton from "../components/NavBarButton";
import {SECTION_GROUP_ROUTE} from "../Consts";
import api from "../http/Api";
import SearchIcon from "../components/icons/SearchIcon";
import UploadIcon from "../components/icons/UploadIcon";
import TrashIcon from "../components/icons/TrashIcon";
import FieldSearch from "../components/FieldSearch";

const EditUsers = () => {

        const [touristCategories, setTouristCategories] = useState([{id: null, value: "Любая категория"}])
        const [curTouristCat, setCurTouristCat] = useState(0)
        const [firstName, setFirstName] = useState(null)
        const [lastName, setLastName] = useState(null)

        const touristFilters = [
            {
                label: "Имя", type: "input", variant: "text",
                onChange: setFirstName
            },
            {
                label: "Фамилия", type: "input", variant: "text",
                onChange: setLastName
            },
            {
                label: "Категория туриста", type: "select",
                options: touristCategories.map(({value}) => value),
                onIndexChanged: (ind) => setCurTouristCat
            },
        ]

        useEffect(() => {
                api.get("tourists/category-info").then(value => {
                    const cat = [{id: null, value: "Любая"}]
                    value.data.forEach(i => cat.push(i))
                    setTouristCategories(cat)

                }, error => console.log("failed to load", error))
                    .catch(error => console.log(error))
            }
            , [setTouristCategories])

        return (
            <Container>
                <Row className={"mt-5"}>
                    <Col>
                        <h2>Туристы</h2>
                    </Col>
                </Row>

                <Row className={"mt-1"}>
                    <FieldSearch filters={touristFilters} onSearchClick={() => console.log("serade")}>

                    </FieldSearch>
                </Row>

                <Row>
                    {/*<table className={"table"}>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>День</th>*/}
                    {/*        <th>Время</th>*/}
                    {/*        <th>Тип занятия</th>*/}
                    {/*        <th>Место</th>*/}
                    {/*        <th>*/}
                    {/*            <Button variant={"outline-success"} onClick={onUploadScheduleClick}>*/}
                    {/*                <UploadIcon size={16}/>*/}
                    {/*            </Button>*/}
                    {/*            <Button variant={"danger"} onClick={() => setTableEdit(false)}>*/}
                    {/*                <TrashIcon size={16}/>*/}
                    {/*            </Button>*/}
                    {/*        </th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {tableData.map(({_, day, time, type, place}, index) => (*/}
                    {/*        <tr key={index}>*/}
                    {/*            <td>*/}
                    {/*                <select name={"days"} onChange={onDayChange(index)} value={day}>*/}
                    {/*                    {days.map((value, index) => (*/}
                    {/*                        <option key={value} value={index}>{value}</option>*/}
                    {/*                    ))}*/}
                    {/*                </select>*/}

                    {/*            </td>*/}
                    {/*            <td>*/}
                    {/*                <input*/}
                    {/*                    name="time" value={time} type="text"*/}
                    {/*                    onChange={(e) => onChangeInput(e, index)}*/}
                    {/*                    placeholder="Время"*/}
                    {/*                />*/}
                    {/*            </td>*/}
                    {/*            <td>*/}
                    {/*                <input*/}
                    {/*                    name="type" type="text" value={type}*/}
                    {/*                    onChange={(e) => onChangeInput(e, index)}*/}
                    {/*                    placeholder="Тип"*/}
                    {/*                />*/}
                    {/*            </td>*/}
                    {/*            <td>*/}
                    {/*                <input*/}
                    {/*                    name="place" type="text" value={place}*/}
                    {/*                    onChange={(e) => onChangeInput(e, index)}*/}
                    {/*                    placeholder="Место"*/}
                    {/*                />*/}
                    {/*            </td>*/}
                    {/*            <td>*/}
                    {/*                <Button variant={"danger"} onClick={onDeleteClicked(index)}>*/}
                    {/*                    <TrashIcon size={16}/>*/}
                    {/*                </Button>*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*    ))}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </Row>

                <Row className={"mt-5"}>
                    <Col>
                        <h2>Тренеры</h2>
                    </Col>
                </Row>

                <Row>
                    <div>
                        Убей меня
                    </div>
                </Row>


                {/*{sections.map((section, index) => (*/}
                {/*    <div key={index}>*/}
                {/*        <Row className={"mt-5"}>*/}
                {/*            <Col>*/}
                {/*                <h2>{section.name}</h2>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <div>*/}
                {/*                {section.groups.map((group, indexG) => (*/}
                {/*                    // <Button key={indexG} variant={"outline-primary"} onClick={() => }>{group}</Button>*/}
                {/*                    <NavBarButton key={group.id} route={`${SECTION_GROUP_ROUTE}/${group.id}`} title={group.name}/>*/}
                {/*                ))}*/}
                {/*            </div>*/}

                {/*        </Row>*/}
                {/*    </div>*/}
                {/*))}*/}
            </Container>
        );
    }
;

export default EditUsers;