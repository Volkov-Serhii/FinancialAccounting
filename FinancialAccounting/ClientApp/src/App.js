import React, { useContext, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import MyHeader from "../src/components/UI/header/MyHeader";
import MyFooter from "./components/UI/footer/MyFooter";
import { Context } from "./index";
import { checkUser } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import MyLoader from "./components/UI/loader/MyLoader";


const App = observer(() => {

    const { user } = useContext(Context)
    /*
        useEffect(() => {
            checkUser().then(data =>{
                user.setIsAuth(data)
                console.log('useEffect()' + user.isAuth)
            })
        }, [])
    */

    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className={"App"}>
                <BrowserRouter>
                    <div>
                        <MyHeader />
                    </div>
                    <div className={"content"}>
                        <AppRouter />
                    </div>
                    <div className={"footer"}>
                        <MyFooter className={"footer"} />
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
})

export default function WrappedApp() {
    return (
        <Suspense fallback={<MyLoader />}>
            <App />
        </Suspense>
    )
};
