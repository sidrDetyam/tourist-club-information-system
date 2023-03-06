import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {useSelector} from "react-redux";
import {authRoutes, publicRoutes} from "../Routes";
import {HOME_ROUTE, LOGIN_ROUTE} from "../Consts";

function extractRoutes(routesArray) {
    return routesArray.map(({path, Component}) => <Route key={path} path={path} element={Component}/>)
}

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Routes>
            {isAuth && extractRoutes(authRoutes)}
            {extractRoutes(publicRoutes)}

            <Route path={"/*"} element={<Navigate to={isAuth? HOME_ROUTE : LOGIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;