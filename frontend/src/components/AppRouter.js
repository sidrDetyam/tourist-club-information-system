import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {authRoutes, publicRoutes} from "../Routes";
import {HOME_ROUTE} from "../Consts";
import Home from "./Home";

function extractRoutes(routesArray) {
    return routesArray.map(({path, Component}) => <Route key={path} path={path} element={Component}/>)
}

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Routes>
            {isAuth && extractRoutes(authRoutes)}
            {extractRoutes(publicRoutes)}
            
            <Route path={"/*"} element={<Navigate to={"/"}/>} />
        </Routes>
    );
};

export default AppRouter;