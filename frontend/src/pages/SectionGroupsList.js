import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import api from "../http/Api";
import {SECTION_GROUP_ROUTE} from "../Consts";
import NavBarButton from "../components/NavBarButton";
import PlusIcon from "../components/icons/PlusIcon";
import NewSectionGroupForm from "../components/NewSectionGroupForm";

const noForm = 0;
const newSection = 1;
const newGroup = 2;

function SectionGroupsList() {
    const [sections, setInfo] = useState([])
    const [currentEdit, setCurrentEdit] = useState(noForm)

    const [curSecId, setCurSecId] = useState(null)

    useEffect(() => {
            api.get("sections/all-info").then(value => {
                setInfo(value.data)
                console.log(value.data)
            })
                .catch(error => console.log(error))
        }
        , [setInfo])

    const onNewGroupClick = (sectionId) => () => {
        setCurSecId(sectionId)
        setCurrentEdit(newGroup)
    }

    return (
        <div className={"container"}>
            <Row>
                <Col className={currentEdit === noForm ? "col-12" : "col-4"}>
                    {sections.map(s => {return {name: s.name, groups: s.groups, id: s.sectionId}})
                        .map((section, index) => (
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
                                        <NavBarButton key={group.id} route={`${SECTION_GROUP_ROUTE}/${group.id}`}
                                                      title={group.name}/>
                                    ))}
                                    <Button variant={"outline-primary"} onClick={onNewGroupClick(section)}>
                                        <PlusIcon size={20}></PlusIcon>
                                    </Button>
                                </div>
                            </Row>
                        </div>
                    ))}

                    <Row className={"mt-5"}>
                        <div>
                            <Button variant={"outline-primary"}>
                                <PlusIcon size={20}></PlusIcon>
                            </Button>
                        </div>
                    </Row>
                </Col>

                {currentEdit === newGroup &&
                    <Col className={"col-8"}>
                        <NewSectionGroupForm section={curSecId}/>
                    </Col>
                }
            </Row>
        </div>
    );
}

export default SectionGroupsList;