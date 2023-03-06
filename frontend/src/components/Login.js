import React, {useCallback, useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import useInput from "../hooks/UseInput";

const Login = () => {

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const username = useInput("")
    const password = useInput("")

    const onSubmit = () => {
        console.log(username.value)
        console.log(password.value)
    }


    return (
        <Container className={"container-fluid"}>

            <Row className={"align-items-center justify-content-center min-vh-100"}>
                <Col className={"col-4"}>

                    <Row>
                    <Form className={"p-0"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control {...username} placeholder="Enter username"/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...password} type="password" placeholder="Password"/>
                        </Form.Group>
                    </Form>
                    </Row>

                        <Row className={"justify-content-end"}>
                            <Col className={"col-3"}>
                                <Button className={"mt-3"} variant="primary" onClick={onSubmit}>
                                    Sign in
                                </Button>
                            </Col>
                        </Row>

                </Col>
            </Row>

        </Container>
    );
};

export default Login;