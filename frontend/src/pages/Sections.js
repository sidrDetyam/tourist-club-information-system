import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";
import UserCard from "../components/UserCard";
import EditIcon from "../components/icons/EditIcon";
import XIcon from "../components/icons/XIcon";
import TrashIcon from "../components/icons/TrashIcon";
import SectionTab from "../components/SectionTab";

function Sections() {
    const [activeTab, setActiveTab] = useState('tab1');

    // const [allSections, setAllSections] = useState([])
    // const [userSections, setUserSections] = useState([])

    const [sectionInfo, setSectionsInfo] = useState([])
    const [userInfo, setUserInfo] = useState({})

    const findIndById = (id) => {
        return sectionInfo.findIndex(info => info.sectionId === id);
    }

    const onEditClick = (id) => {
        const ind = findIndById(id);
        sectionInfo[ind].isEdit = !sectionInfo[ind].isEdit;
        setSectionsInfo([...sectionInfo]);
    }

    useEffect(() => {
        // api.get("/sections/all").then(value => setAllSections(value.data.sections))
        // api.get("/sections/user").then(value => setUserSections(value.data.sections))

        api.get("users/auth-info")
            .then(user => {
                console.log(user.data);
                setUserInfo(user.data)
                api.get("sections/all-info").then(value => {
                    const data = value.data;
                    data.forEach(info => {
                        info.canEdit = info.manager.id === user.data.id;
                        info.isEdit = false;
                    })

                    setSectionsInfo(data);
                    if (data.length > 0) {
                        setActiveTab(data.sectionId);
                    }
                    console.log(data);
                }, error => console.log("failed to load sections info", error));

            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Container>
            <Tabs activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
                {sectionInfo.map(info => (
                    <Tab eventKey={info.sectionId} title={info.name} key={info.sectionId}>
                        <SectionTab info_={info}/>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
}

export default Sections;