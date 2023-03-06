import Admin from "./components/Admin";
import {ADMIN_ROUTE, HOME_ROUTE} from "./Consts";
import Home from "./components/Home";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: HOME_ROUTE,
        Component: <Home/>
    }
]

export const publicRoutes = [
    // {
    //     path: LOGIN_ROUTE,
    //     Component: <Login/>
    // }
]