import React, {useState} from 'react';
import './styles/App.css';
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "reactstrap";


function App() {
/*
    const [loading, setLoading] = useState(true)

    if(loading) {
        return <Spinner animation = {"grow"}/>
    }
*/
    return (
        <div className={"App"}>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
        </div>
    );
}

export default App;
