import React, {useContext, useEffect, useState} from 'react';
import classes from "./MyHeader.module.css";
import {useTranslation} from 'react-i18next';
import Logo from '../../../images/Logo.jpg';
import {logout, GetUserEmail} from "../../../http/userAPI";
import MyButton from "../button/MyButton";
import Cookies from 'js-cookie';
import {LOGIN_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const MyHeader = observer(() => {
    const {user} = useContext(Context)
    const [userLogin, setUserLogin] = useState('');

    const locales = {
        en: {title: 'English'},
        ua: {title: 'Українська'},
        ru: {title: 'Русский'}
    };
    const {t, i18n} = useTranslation();
    const history = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            if (user.isAuth) {
                const response = await GetUserEmail(Cookies.get("AuthenticationToken"))
                setUserLogin(response);
            } else {
                setUserLogin("");
            }
        };

        fetchData();
    }, []);

    const logoutClick = async () => {

        const response = await logout();
        window.location.reload();
    }

    return (
        <header>
            <div className={classes.logo}>
                <img src={Logo} alt='Logo'></img>
            </div>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className={classes.language_switcher}>
                <label htmlFor="language-select">{t('header.select_language')}</label>
                <select id="language-select" onChange={(e) => i18n.changeLanguage(e.target.value)}
                        value={i18n.language}>
                    {Object.keys(locales).map((locale) => (
                        <option
                            key={locale}
                            value={locale}
                            style={{fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal'}}>
                            {locales[locale].title}
                        </option>
                    ))}
                </select>
            </div>
            <div>{userLogin}</div>
            {(user.isAuth) ? (
                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    onClick={logoutClick}
                >
                    {t("header.exit")}
                </MyButton>
            ) : (
                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    onClick={() => history(LOGIN_ROUTE)}>
                    {t('header.login')}
                </MyButton>
            )
            }
        </header>

    );
});

export default MyHeader;