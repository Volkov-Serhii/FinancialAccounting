import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]