import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";
import UserCard from "../components/UserCard";

function Sections() {
    const [activeTab, setActiveTab] = useState('tab1');

    const [allSections, setAllSections] = useState([])
    const [userSections, setUserSections] = useState([])

    useEffect(() => {
        api.get("/sections/all").then(value => setAllSections(value.data.sections))
        api.get("/sections/user").then(value => setUserSections(value.data.sections))
    }, [])

    return (
        // <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        //     <Tab eventKey="tab1" title="Мои секции">
        //         <div>
        //             {userSections.map((section) => <h5 key={section}>{section}</h5>)}
        //         </div>
        //     </Tab>
        //     <Tab eventKey="tab2" title="Все секции">
        //         <div>
        //             {allSections.map((section) => <h5 key={section}>{section}</h5>)}
        //         </div>
        //     </Tab>
        // </Tabs>

        <Container>

            <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                <Tab eventKey="tab1" title="Конная секция">
                    <Container>
                        <Row className={"mt-2"}>
                            <Col md={6}>
                                <h2>Конная секция</h2>
                            </Col>
                        </Row>

                        <Row className={"mt-5"}>
                            <section>
                                <p style={{fontSize: "large"}}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi assumenda atque,
                                    aut consequatur eius error esse expedita id illo iure minus, mollitia nobis numquam
                                    obcaecati optio, porro quaerat ullam? </p>
                            </section>
                        </Row>

                        <Row className={"mt-5"}>
                            <Col md={6} className="text">
                                <h3>Руководитель</h3>
                            </Col>
                        </Row>

                        <Row>
                            <UserCard name={'Имя'} surname={"Фамилия"}/>
                        </Row>

                        <Row className={"mt-5"}>
                            <Col md={6} className="text">
                                <h3>Тренеры</h3>
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

            </Tabs>
        </Container>
    );
}

export default Sections;