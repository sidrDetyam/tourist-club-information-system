import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";
import UserCard from "../components/UserCard";

function Sections() {
    const [activeTab, setActiveTab] = useState('tab1');

    // const [allSections, setAllSections] = useState([])
    // const [userSections, setUserSections] = useState([])

    const [sectionInfo, setSectionsInfo] = useState([])

    useEffect(() => {
        // api.get("/sections/all").then(value => setAllSections(value.data.sections))
        // api.get("/sections/user").then(value => setUserSections(value.data.sections))


        api.get("sections/all-info").then(value => {
            setSectionsInfo(value.data);
            if(value.data.length > 0){
                setActiveTab(value.data[0].sectionId);
            }
            console.log(value.data);
        }, error => {
            console.log("failed to load sections info", error)
        });

        api.get("users/auth-info").then(value => {
            console.log(value.data)
        })
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

            <Tabs activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
                {sectionInfo.map(info => (
                    // <div key={info.sectionId}>{JSON.stringify(info)}</div>
                    <Tab eventKey={info.sectionId} title={info.name} key={info.sectionId}>
                        <Container>
                            <Row className={"mt-2"}>
                                <Col md={4}>
                                    <h2>{info.name}</h2>
                                </Col>
                                <Col>
                                    <Button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24"
                                             fill="currentColor"
                                             className="align-text-bottom">
                                            <path fillRule="evenodd"
                                                  d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
                                        </svg>
                                    </Button>
                                </Col>
                            </Row>

                            <Row className={"mt-5"}>
                                <section>
                                    <p style={{fontSize: "large"}}>{info.description}</p>
                                </section>
                            </Row>

                            <Row className={"mt-5"}>
                                <Col md={6} className="text">
                                    <h3>Руководитель</h3>
                                </Col>
                            </Row>

                            <Row>
                                <UserCard name={info.manager.firstName} surname={info.manager.secondName} email={info.manager.email}/>
                            </Row>

                            <Row className={"mt-5"}>
                                <Col md={6} className="text">
                                    <h3>Тренеры</h3>
                                </Col>
                            </Row>

                            <Row>
                                {info.trainers.map(trainer => (
                                    <UserCard key={trainer.username}
                                        name={trainer.firstName} surname={trainer.secondName} email={trainer.email}/>
                                ))}
                            </Row>

                        </Container>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
}

export default Sections;