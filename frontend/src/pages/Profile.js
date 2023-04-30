import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {api_rejected} from "../http/Api";
import FullPageLoading from "../components/FullPageLoading";
import {EDIT_USERS_ROUTE} from "../Consts";

const Profile = () => {
    const nav = useNavigate()
    useEffect(() => {
        api_rejected.get("users/auth-info")
            .then((response) => nav(`${EDIT_USERS_ROUTE}/${response.data.id}`))
    }, [nav])

    return (
        <FullPageLoading loadingText={"Loading"}/>
    );
};

export default Profile;