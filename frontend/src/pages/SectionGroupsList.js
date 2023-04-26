import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import api from "../http/Api";
import {SECTION_GROUP_ROUTE} from "../Consts";
import NavBarButton from "../components/NavBarButton";


function SectionGroupsList() {

    // const sections = [
    //     {
    //         name: "Конная секция",
    //         groups: [
    //             20209, 20210, 20211, 20211
    //         ]
    //     },
    //     {
    //         name: "Конная секция",
    //         groups: [
    //             20209, 20210, 20211, 20211
    //         ]
    //     },
    //     {
    //         name: "Конная секция",
    //         groups: [
    //             20209, 20210, 20211, 20211
    //         ]
    //     },
    //     {
    //         name: "Конная секция",
    //         groups: [
    //             20209, 20210, 20211, 20211
    //         ]
    //     },
    // ]

    const [sections, setInfo] = useState([])

    useEffect(() => {
            api.get("sections/all-info").then(value => {
                const data = value.data.map(s => {
                    return {name: s.name, groups: s.groups}
                })
                setInfo(data)
            }, error => console.log("failed to load sections info", error))
                .catch(error => console.log(error))
        }
        , [setInfo])

    return (

        <Container>
            {sections.map((section, index) => (
                <div key={index}>
                    <Row className={"mt-5"}>
                        <Col>
                            <h2>{section.name}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            {section.groups.map((group, indexG) => (
                                // <Button key={indexG} variant={"outline-primary"} onClick={() => }>{group}</Button>
                                <NavBarButton key={group.id} route={`${SECTION_GROUP_ROUTE}/${group.id}`} title={group.name}/>
                            ))}
                        </div>

                    </Row>
                </div>
            ))}
        </Container>
    );
}

export default SectionGroupsList;