import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";

function Sections() {
    const [activeTab, setActiveTab] = useState('tab1');

    const [allSections, setAllSections] = useState([])
    const [userSections, setUserSections] = useState([])

    useEffect(() => {
        api.get("/sections/all").then(value => setAllSections(value.data.sections))
        api.get("/sections/user").then(value => setUserSections(value.data.sections))
    }, [])

    return (
        <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
            <Tab eventKey="tab1" title="Мои секции">
                <div>
                    {userSections.map((section) => <h5 key={section}>{section}</h5>)}
                </div>
            </Tab>
            <Tab eventKey="tab2" title="Все секции">
                <div>
                    {allSections.map((section) => <h5 key={section}>{section}</h5>)}
                </div>
            </Tab>
        </Tabs>
    );
}

export default Sections;