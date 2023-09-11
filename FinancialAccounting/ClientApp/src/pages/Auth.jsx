import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyFooter from "../components/UI/footer/MyFooter";
import {login} from "../http/userAPI";
import {REGISTRATION_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import { withTranslation } from 'react-i18next';


const Auth = (props) => {
    const { t } = props;
    const email_cannot_be_empty = t('general.email_cannot_be_empty')
    const password_cannot_be_empty = t('general.password_cannot_be_empty')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState(email_cannot_be_empty)
    const [passwordError, setPasswordError] = useState(password_cannot_be_empty)
    const [formValid, setFormValid] = useState(false)
    const [checked, setChecked] = useState(true);

    const history = useNavigate()

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break

            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError(t('general.incorrect_email'))
        } else {
            setEmailError('')
        }
    }

    function handleChange() {
        setChecked(!checked); // инвертируем стейт
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setPasswordError(t('general.password_length'))
            if (!e.target.value.length) {
                setPasswordError(password_cannot_be_empty)
            }
        } else {
            setPasswordError('')
        }
    }

    const loginClick = async () => {

        const response = await login(email, password);

    }

    return (
        <form>
            <div>
                <h1 style={{textAlign: "center", paddingTop: "80px", paddingBottom: "26px"}}>{t('auth.entrance')}</h1>
                <h3 style={{textAlign: "center"}}>{t('general.email')}</h3>
                {(emailDirty && emailError) && <div style={{color: "red", textAlign: "center",
                    marginTop: "8px"}}>{emailError}</div>}
                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => emailHandler(e)}
                    value={email}
                    onBlur={e => blurHandler(e)}
                    name="email"
                    type="email"
                    placeholder={t('general.enter_email')}
                />
            </div>
            <div>
                <h3 style={{textAlign: "center",}}>{t('general.password')}</h3>
                {(passwordDirty && passwordError) && <div style={{color: "red", textAlign: "center",
                    marginTop: "8px"}}>{passwordError}</div>}
                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => passwordHandler(e)}
                    value={password}
                    onBlur={e => blurHandler(e)}
                    name="password"
                    type="password"
                    placeholder={t('general.enter_password')}
                />
            </div>
            <div style={{textAlign: "end"}}>
                <input type="checkbox" id="rememberme" name="rememberUser" checked={checked} onChange={handleChange}/>
                <label htmlFor="rememberme">{t('auth.rememberme')}</label>
            </div>
            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                    <MyButton
                        style={{width: "220px", height: "60px", marginBottom: "12px"}}
                        disabled={!formValid}
                    >
                        {t('auth.enter')}
                    </MyButton>

            </div>

            <hr style={{marginBottom: "12px"}} />

                <div style={{display: "flex", justifyContent: "space-between"}}><MyButton
                    style={{height: "40px", outline: "none !important", border: "0 !important"}}
                >
                    {t('auth.forgot_email_password')}
                </MyButton>


                <MyButton
                    style={{width: "140px", height: "40px"}}
                    onClick={() => history(REGISTRATION_ROUTE)}
                >
                    {t('general.registration')}
                </MyButton>
                </div>
            <MyFooter />
        </form>
    );
};

export default withTranslation()(Auth);