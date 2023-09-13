import React, {useState} from 'react';
import './styles/App.css';
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "reactstrap";
import { Suspense } from 'react';
import { useTranslation} from 'react-i18next';
import MyHeader from "../src/components/UI/header/MyHeader";
import MyFooter from "./components/UI/footer/MyFooter";

function App() {
/*
    const [loading, setLoading] = useState(true)

    if(loading) {
        return <Spinner animation = {"grow"}/>
    }
*/

const { t, i18n } = useTranslation();
    return (
        <div>
        <div className={"App"}>

            <BrowserRouter>
                <MyHeader/>
                <AppRouter/>
                <MyFooter/>
            </BrowserRouter>
        </div>
        </div>
    );
}

export default function WrappedApp(){
    return (
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    )
  };
