import React, {useState} from 'react';
import {Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Image from 'react-bootstrap/Image';

function UserCard({name, surname, photoUrl}) {

    if(photoUrl === undefined){
        photoUrl = 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'
    }

    return (
        <Col className={"mt-4"} xs={4}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={6}>
                            <Image src={photoUrl} roundedCircle style={{height: '100%', width: '100%'}}/>
                        </Col>
                        <Col xs={6} className={"d-flex flex-column justify-content-center align-items-center"}>
                            <h3 className={"text-center"}>{surname}</h3>
                            <h3 className={"text-center"}>{name}</h3>
                            <h5 className={"text-center"}>example@gmail.com</h5>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}



function SectionGroups() {
    const [activeTab, setActiveTab] = useState('tab1')

    const shed = {}

    return (
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
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Понедельник</td>
                                    <td>10:00 - 11:30</td>
                                    <td>Йога</td>
                                </tr>
                                <tr>
                                    <td>Вторник</td>
                                    <td>16:00 - 17:30</td>
                                    <td>Танцы</td>
                                </tr>
                                <tr>
                                    <td>Среда</td>
                                    <td>14:00 - 15:30</td>
                                    <td>Фитнес</td>
                                </tr>
                                <tr>
                                    <td>Четверг</td>
                                    <td>9:00 - 10:30</td>
                                    <td>Пилатес</td>
                                </tr>
                                <tr>
                                    <td>Пятница</td>
                                    <td>18:00 - 19:30</td>
                                    <td>Йога</td>
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
    );
}

export default SectionGroups;