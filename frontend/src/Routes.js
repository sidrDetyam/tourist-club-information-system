import Admin from "./components/Admin";
import {ADMIN_ROUTE, HOME_ROUTE} from "./Consts";
import Home from "./components/Home";
import TestLogin from "./components/TestLogin";

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
    {
        path: "/test",
        Component: <TestLogin/>
    }
]