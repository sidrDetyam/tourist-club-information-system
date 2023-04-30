import React, {useEffect, useState} from 'react';
import {Container, Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";
import SectionTab from "./SectionTab";

function Sections() {
    const [activeTab, setActiveTab] = useState('tab1');

    // const [allSections, setAllSections] = useState([])
    // const [userSections, setUserSections] = useState([])

    const [sectionInfo, setSectionsInfo] = useState([])

    const [trainers, setTrainers] = useState([])
    const [state, setState] = useState(1);
    function updateCb() {
        setState(prevState => prevState + 1);
    }


    useEffect(() => {
        // api.get("/sections/all").then(value => setAllSections(value.data.sections))
        // api.get("/sections/user").then(value => setUserSections(value.data.sections))

        api.get("users/auth-info")
            .then(user => {
                api.get("sections/all-info").then(value => {
                    const data = value.data;
                    data.forEach(info => {
                        info.canEdit = true//info.manager.id === user.data.id;
                        info.isEdit = false;
                    })
                    data.sort((a, b) => a.sectionId - b.sectionId)

                    setSectionsInfo(data);
                    if (data.length > 0) {
                        setActiveTab(data.sectionId);
                    }
                });

            })
            .catch(error => console.log(error))

        api.post("trainers/get", {}).then(t => setTrainers(t.data))
    }, [state])

    return (
        <Container>
            <Tabs activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
                {sectionInfo.map(info => (
                    <Tab eventKey={info.sectionId} title={info.name} key={info.sectionId}>
                        <SectionTab info={info} updateCb={updateCb} trainers={trainers}/>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
}

export default Sections;