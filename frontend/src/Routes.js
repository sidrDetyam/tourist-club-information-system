import Admin from "./components/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "./Consts";
import Login from "./components/Login";
import {HOME_ROUTE} from "./Consts";
import Home from "./components/Home";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    }
]