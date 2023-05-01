import React, {useCallback} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useNavigate} from "react-router-dom";
import {
    EDIT_USERS_ROUTE, HIKES_LIST_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    SECTION_GROUPS_ROUTE,
    SECTIONS_ROUTE
} from "../Consts";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthAction} from "../store/UserReducer";
import {clearTokens} from "../services/AuthService";
import NavBarButton from "./NavBarButton";
import LogoutIcon from "./icons/LogoutIcon";

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
                        <NavBarButton route={HOME_ROUTE} title={"Главная"} variant={"secondary"}></NavBarButton>
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            {/*<Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>*/}
                            {/*    Админ панель*/}
                            {/*</Button>*/}

                            {/*<Button onClick={() => navigate(SECTIONS_ROUTE)} className={"ml-2"}>*/}
                            {/*    Секции*/}
                            {/*</Button>*/}

                            <NavBarButton route={SECTIONS_ROUTE} title={"Секции"} className={"ml-2"}/>

                            <NavBarButton route={SECTION_GROUPS_ROUTE} title={"Группы"}/>

                            <NavBarButton route={HOME_ROUTE} title={"Соревнования"}/>

                            <NavBarButton route={HIKES_LIST_ROUTE} title={"Походы"}/>

                            <NavBarButton route={PROFILE_ROUTE} title={"Личный кабинет"}/>

                            <NavBarButton route={EDIT_USERS_ROUTE} title={"Пользователи"}/>

                            <Button variant={"outline-danger"} onClick={logOut} className={"ml-2"}>
                                <LogoutIcon size={20}/>
                                Выйти
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            }
        </>
    );
};
