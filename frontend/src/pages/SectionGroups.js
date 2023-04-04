import React, {useState} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import UserCard from "../components/UserCard";


function SectionGroups() {
    const [activeTab, setActiveTab] = useState('tab1')

    const shed = {}

    return (

        <Container>

            <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                <Tab eventKey="tab1" title="20209">
                    <Container>
                        <Row className={"mt-2"}>
                            <Col md={6}>
                                <h2>Группа 20209, Конная секция</h2>
                            </Col>
                        </Row>

                        <Row className={"mt-5"}>
                            <Col md={6} className="text">
                                <h3>Расписание</h3>
                            </Col>
                        </Row>

                        <Row className={"mt-1"}>
                            <Col md={12}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>День недели</th>
                                        <th>Время</th>
                                        <th>Название занятия</th>
                                        <th>Место</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Понедельник</td>
                                        <td>10:00 - 11:30</td>
                                        <td>Йога</td>
                                        <td>Лес</td>
                                    </tr>
                                    <tr>
                                        <td>Вторник</td>
                                        <td>16:00 - 17:30</td>
                                        <td>Танцы</td>
                                        <td>Лес</td>
                                    </tr>
                                    <tr>
                                        <td>Среда</td>
                                        <td>14:00 - 15:30</td>
                                        <td>Фитнес</td>
                                        <td>Спортзал</td>
                                    </tr>
                                    </tbody>
                                </table>
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
                </Tab>
                <Tab eventKey="tab2" title="20210">
                    <div>
                        Tab2
                    </div>
                </Tab>
            </Tabs>

        </Container>
    );
}

export default SectionGroups;