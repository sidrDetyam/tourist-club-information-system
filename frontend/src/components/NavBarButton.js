import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import {Button} from "react-bootstrap";

const NavBarButton = ({route, title}) => {
    const navigate = useNavigate();
    const cb = useCallback(() => navigate(route), [route, navigate])
    return <Button onClick={cb}>{title}</Button>
}

export default NavBarButton;