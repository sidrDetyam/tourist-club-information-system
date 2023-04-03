import React, {useCallback} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SECTIONS_ROUTE} from "../Consts";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthAction} from "../store/UserReducer";
import {clearTokens} from "../services/AuthService";

export const BruhNavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector(state => state.user)


    const logOut = useCallback(() => {
        clearTokens()
        dispatch(setIsAuthAction(false))
        navigate(LOGIN_ROUTE)
    }, [dispatch, navigate])

    return (
        <>
            {isAuth &&
                <Navbar className={"navbar navbar-expand-lg navbar-light bg-light"}>
                    <Container className={"container-fluid"}>
                        <NavLink to={HOME_ROUTE}>Туристический клуб</NavLink>
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            {/*<Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>*/}
                            {/*    Админ панель*/}
                            {/*</Button>*/}

                            <Button onClick={() => navigate(SECTIONS_ROUTE)} className={"ml-2"}>
                                Секции
                            </Button>

                            <Button onClick={logOut} className={"ml-2"}>
                                Выйти
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            }
        </>
    );
};
