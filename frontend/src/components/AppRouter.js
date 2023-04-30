import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {useSelector} from "react-redux";
import {
    ADMIN_ROUTE, CREATE_USER, EDIT_USERS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, PROFILE_ROUTE,
    SECTION_GROUP_ROUTE,
    SECTION_GROUPS_ROUTE,
    SECTIONS_ROUTE
} from "../Consts";
import Login from "../pages/Login";
import Admin from "./Admin";
import Home from "../pages/Home";
import Sections from "../pages/Sections";
import SectionGroupsList from "../pages/SectionGroupsList";
import SectionGroup from "../pages/SectionGroup";
import EditUsersList from "../pages/EditUsersList";
import EditUser from "../pages/EditUser";
import Profile from "../pages/Profile";

const authRoutes = [
    {path: ADMIN_ROUTE, Component: <Admin/>},
    {path: HOME_ROUTE, Component: <Home/>},
    {path: SECTIONS_ROUTE, Component: <Sections/>},
    // {path: SECTION_GROUPS_ROUTE, Component: <SectionGroupsList/>},
    // {path: SECTION_GROUP_ROUTE + "/*", Component: <SectionGroup/>}
]

const publicRoutes = [

]

function extractRoutes(routesArray) {
    return routesArray.map(({path, Component}) => <Route key={path} path={path} element={Component}/>)
}

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Routes>
            {isAuth && extractRoutes(authRoutes)}
            {extractRoutes(publicRoutes)}

            <Route path={SECTION_GROUPS_ROUTE} element={<SectionGroupsList/>}/>
            <Route path={SECTION_GROUP_ROUTE + "/:id"} element={<SectionGroup/>}/>

            <Route path={EDIT_USERS_ROUTE} element={<EditUsersList/>}/>
            <Route path={EDIT_USERS_ROUTE + "/:id"} element={<EditUser type={"edit"}/>}/>

            <Route path={CREATE_USER} element={<EditUser type={"create"}/>}/>

            <Route path={PROFILE_ROUTE} element={<Profile/>}/>

            {!isAuth && extractRoutes([{path: LOGIN_ROUTE, Component: <Login/>}])}

            <Route path={"/*"} element={<Navigate to={isAuth? HOME_ROUTE : LOGIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;