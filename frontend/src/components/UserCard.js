import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";

function UserCard({name, surname, email, categoty, photoUrl}) {

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
                            <h5 className={"text-center"} style={{color: "darkgray"}}>{email}</h5>
                            <h5 className={"text-center"} style={{color: "gray"}}>{categoty}</h5>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default UserCard;