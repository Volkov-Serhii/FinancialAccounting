import React, {useState} from 'react';
import './styles/App.css';
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "reactstrap";
import { Suspense } from 'react';
import { useTranslation} from 'react-i18next';

function App() {
/*
    const [loading, setLoading] = useState(true)

    if(loading) {
        return <Spinner animation = {"grow"}/>
    }
*/
const locales = {
    en: { title: 'English' },
    ua: { title: 'Українська' },
    ru: { title: 'Русский'}
  };

const { t, i18n } = useTranslation();
    return (
        <div className={"App"}>
            <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                {Object.keys(locales).map((locale) => (
                    <option  
                    key={locale} 
                    value={locale} 
                    style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}>
                            {locales[locale].title}
                    </option >
                ))}
            </select >
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
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
