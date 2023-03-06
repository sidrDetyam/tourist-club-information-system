import React, {useCallback} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../Consts";
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
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <NavLink style={{color: 'white'}} to={HOME_ROUTE}>Туристический клуб</NavLink>
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
                                Админ панель
                            </Button>
                            <Button variant={"outline-light"} onClick={logOut} className="ml-2">
                                Выйти
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            }
        </>
    );
};
