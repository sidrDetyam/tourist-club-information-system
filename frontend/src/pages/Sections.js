import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import api from "../http/Api";
import {setIsAuthAction} from "../store/UserReducer";
import {ACCESS_TOKEN_LS} from "../Consts";

function VerticalLink({ url, label }) {
    return (
        <a href={url} style={{ display: 'block', margin: '10px 0' }}>
            {label}
        </a>
    );
}

function Sections(props) {
    const [activeTab, setActiveTab] = useState('tab1');

    useEffect(() => {
        api.get("/sections/all").then(value => {
            console.log(value.data)
            console.log(typeof value.data)
        })
    }, [])

    return (
        <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
            <Tab eventKey="tab1" title="Мои секции">
                <div>
                    <VerticalLink url="https://example.com/page1" label="Link 1"/>
                    <VerticalLink url="https://example.com/page2" label="Link 2"/>
                    <VerticalLink url="https://example.com/page3" label="Link 3"/>
                </div>
            </Tab>
            <Tab eventKey="tab2" title="Все секции">
                <div>
                    <VerticalLink url="https://example.com/page1" label="Link 4"/>
                    <VerticalLink url="https://example.com/page2" label="Link 5"/>
                    <VerticalLink url="https://example.com/page3" label="Link 6"/>
                </div>
            </Tab>
        </Tabs>
    );
}

export default Sections;