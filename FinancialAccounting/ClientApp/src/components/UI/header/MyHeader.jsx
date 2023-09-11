import React from 'react';
import classes from "./MyHeader.module.css";
import { useTranslation} from 'react-i18next';
import Logo from '../../../images/Logo.jpg';

const MyHeader = () => {
  const locales = {
    en: { title: 'English' },
    ua: { title: 'Українська' },
    ru: { title: 'Русский'}
  };
  const { t, i18n } = useTranslation();

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
    </header>
   
    );
};

export default MyHeader;