import React, {useEffect, useState} from 'react';
import classes from "./MyHeader.module.css";
import { useTranslation} from 'react-i18next';
import Logo from '../../../images/Logo.jpg';
import {logout,GetUserEmail} from "../../../http/userAPI";
import MyButton from "../button/MyButton";
import Cookies from 'js-cookie';
import {LOGIN_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import {axiosAuth} from "../../../http/axiosSettings";

const MyHeader = () => {
  const [userLogin, setUserLogin] = useState('');
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  
  const locales = {
    en: { title: 'English' },
    ua: { title: 'Українська' },
    ru: { title: 'Русский'}
  };
  const { t, i18n } = useTranslation();
  const history = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("AuthenticationToken")) {
        try {
          await axiosAuth.get('/api/Account/GetUserEmail',    
          {
              params: {
                  token: Cookies.get("AuthenticationToken")
              }
          })
          .then((response) => {
              console.log(response.data);
              setUserLogin(response.data);
              setIsAuthenticated(true);
          })
        }catch (err) {
          console.log("error", err);
        }
        // const userEmail = await UserEmail(Cookies.get("AuthenticationToken"));
        // setUserLogin(userEmail);
      } else {
        setIsAuthenticated(false);
        setUserLogin("");
      }
    };
  
    fetchData();
  }, []);

  // const UserEmail = async(token) =>{
  //   const userEmail = await GetUserEmail(token);
  //   return userEmail;
  // }

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
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <div className={classes.language_switcher}>
            <label htmlFor="language-select">{t('header.select_language')}</label>
            <select id="language-select" onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}>
                {Object.keys(locales).map((locale) => (
                    <option  
                    key={locale} 
                    value={locale} 
                    style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}>
                            {locales[locale].title}
                    </option >
                ))}
            </select >
        </div>
        <div>{userLogin}</div>
        {(isAuthenticated) ? (
            <MyButton
                          style={{width: "220px", height: "60px", marginBottom: "12px"}}
                          onClick={logoutClick}
                      >
                          {t("header.exit")}
            </MyButton>
        ):(
            <MyButton
            style={{width: "220px", height: "60px", marginBottom: "12px"}}
            onClick={() => history(LOGIN_ROUTE)}>
                {t('header.login')}
            </MyButton>
        )
      }
    </header>
   
    );
};

export default MyHeader;