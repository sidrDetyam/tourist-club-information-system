import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import {Button} from "react-bootstrap";

const NavBarButton = ({route, title, variant}) => {
    const navigate = useNavigate();
    const cb = useCallback(() => navigate(route), [route, navigate])
    return <Button variant={variant===undefined? "outline-secondary" : variant} onClick={cb}>{title}</Button>
}

export default NavBarButton;