import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import {Button} from "react-bootstrap";

const NavBarButton = ({route, title}) => {
    const navigate = useNavigate();
    const cb = useCallback(() => navigate(route), [route, navigate])
    return <Button variant={"outline-secondary"} onClick={cb}>{title}</Button>
}

export default NavBarButton;