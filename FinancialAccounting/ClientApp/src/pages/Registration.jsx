import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {registration} from "../http/userAPI";
import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import { withTranslation } from 'react-i18next';

const Registration = (props) => {
    const { t } = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState(t('general.email_cannot_be_empty'))
    const [passwordError, setPasswordError] = useState(t('general.password_cannot_be_empty'))
    const [formValid, setFormValid] = useState(false)
    const [repasword, setRepassword] = useState('')
    const [repasswordDirty, setRepasswordDirty] = useState(false)
    const [repasswordError, setRepasswordError] = useState(t('registration.passwords_match'))
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameDirty, setFirstNameDirty] = useState(false)
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [firstNameError, setFirstNameError] = useState(t('registration.field_filled'))
    const [lastNameError, setLastNameError] = useState(t('registration.field_filled'))

    const history = useNavigate()

    useEffect(() => {
        if (emailError || passwordError || repasswordError || firstNameError || lastNameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, repasswordError, firstNameError, lastNameError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break

            case 'password':
                setPasswordDirty(true)
                break

            case  'repassword':
                setRepasswordDirty(true)
                break

            case 'firstName':
                setFirstNameDirty(true)
                break

            case 'lastName':
                setLastNameDirty(true)
                break
        }
    }

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)

        if(e.target.value.length < 1) {
            setFirstNameError(t('registration.field_filled'))
        } else{
            setFirstNameError('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)

        if(e.target.value.length < 1) {
            setLastNameError(t('registration.field_filled'))
        } else {
            setLastNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError(t('emailIncorrectError'))
            if (!e.target.value.length) {
                setEmailError('emailIsEmpty')
            } 
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        passwordsIsMatching(e.target.value);
        if (e.target.value.length < 6 || e.target.value.length > 20) {
            setPasswordError(('passIsTooShort'))
            if (!e.target.value.length) {
                setPasswordError(t('passIsEmpty'))
            }
        } else {
            setPasswordError('')
        }
    }

    const passwordsIsMatching = (password) => {
        if(password !== repasword){
            setRepasswordError(t('registration.passwords_match'))
        } else {
            setRepasswordError('')
        }
    }

    const repasswordHandler = (e) => {
        setRepassword(e.target.value);
        if(e.target.value !== password){
            setRepasswordError(t('registration.passwords_match'))
        } else {
            setRepasswordError('')
        }
    }

    const regClick = async () => {

       const response = await registration(email, password, repasword, firstName, lastName);
        window.location.reload();

    }

    return (
        <div>
            <h1 style={{textAlign: "center", paddingTop: "96px", paddingBottom: "26px"}}>{t('general.registration')}</h1>
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3 style={{textAlign: "left", paddingBottom: '8px'}}>{t('registration.name')}</h3>
                    <h3 style={{textAlign: "right", paddingBottom: '8px'}}>{t('registration.last_name')}</h3>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {(firstNameDirty && firstNameError) && <div style={{color: "red", marginRight: "auto"}}>{t('registration.field_filled')}</div>}
                    {(lastNameDirty && lastNameError) && <div style={{color: "red", marginLeft: "auto"}}>{t('registration.field_filled')}</div>}
                </div>
                <div style={{display: "flex"}}>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                        marginRight: "16px",
                    }}
                    onChange={e => firstNameHandler(e)}
                    value={firstName}
                    onBlur={e => blurHandler(e)}
                    name="firstName"
                    type="text"
                    placeholder={t('registration.enter_name')}
                />

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                        marginLeft: "16px",
                    }}
                    onChange={e => lastNameHandler(e)}
                    value={lastName}
                    onBlur={e => blurHandler(e)}
                    name="lastName"
                    type="text"
                    placeholder={t('registration.enter_last_name')}
                />
                </div>
            </div>

            <div>
                <h3 style={{textAlign: "center"}}>{t('general.email')}</h3>
                <div style={ (emailDirty) ? (emailError === "emailIncorrectError") ? {color: "red", textAlign: "center",
                    marginTop: "8px"} : {display: "none", color: "red", textAlign: "center", marginTop: "8px"} : {display: "none"} }>{t('general.incorrect_email')}</div>

                <div style={ (emailDirty) ? (emailError === "emailIsEmpty") ? {color: "red", textAlign: "center",
                    marginTop: "8px"} :{display: "none", color: "red", textAlign: "center", marginTop: "8px"} : {display: "none"} }>{t('general.email_cannot_be_empty')}</div>
                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    //ФРОНТЕНД ЭТО ДЛЯ УМСТВЕННО ОТСТАЛЫХ!
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
                {(passwordDirty && passwordError === "passIsTooShort") && <div style={{color: "red", textAlign: "center",
                    marginTop: "8px"}}>{t('general.password_length')}</div>}

                {(passwordDirty && passwordError === "passIsEmpty") && <div style={{color: "red", textAlign: "center",
                    marginTop: "8px"}}>{t('general.password_cannot_be_empty')}</div>}
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

            <div>
                <h3 style={{textAlign: "center",}}>{t('registration.repeat_password')}</h3>
                {(repasswordDirty && repasswordError) && <div style={{color: "red", textAlign: "center",
                    marginTop: "8px"}}>{t('registration.passwords_match')}</div>}
                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => repasswordHandler(e)}
                    value={repasword}
                    onBlur={e => blurHandler(e)}
                    name="repassword"
                    type="password"
                    placeholder={t('registration.enter_repeat_password')}
                />
            </div>

            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    disabled={!formValid}
                    onClick={regClick}
                    
                >

                    {t('registration.register')}
                </MyButton>
            </div>

            <hr style={{marginBottom: "12px"}} />

            <div>
                <h3 style={{textAlign: "right"}}>{t('registration.have_account')}</h3>
            </div>
            <div style={{textAlign: "right"}}><MyButton
                style={{ height: "40px", outline: "none !important", border: "0 !important"}}
                onClick={() => history(LOGIN_ROUTE)}

            >
                {t('registration.sign_in')}
            </MyButton>

            </div>

        </div>
    );
};

export default withTranslation()(Registration);