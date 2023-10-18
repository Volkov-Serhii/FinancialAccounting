import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {checkUser} from "../http/userAPI";


const AppRouter = () => {
    const {user} = useContext(Context)
    user.setIsAuth(checkUser());

    return (
        <Routes className={"App"}>
            {user.isAuth && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} exact/>
            ))}
            {!user.isAuth && publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} exact/>
            ))}
            <Route path='*' element={(user.isAuth)? (<Navigate to={HOME_ROUTE} />) : (<Navigate to={LOGIN_ROUTE} />)} />
        </Routes>
    );
};

export default AppRouter;