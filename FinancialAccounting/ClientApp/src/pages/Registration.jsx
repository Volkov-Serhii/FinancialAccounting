import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyFooter from "../components/UI/footer/MyFooter";
import {goToLoginPage, registration} from "../http/userAPI";
import axios from "axios";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [repasword, setRepassword] = useState('')
    const [repasswordDirty, setRepasswordDirty] = useState(false)
    const [repasswordError, setRepasswordError] = useState('Пароли должны совпадать!')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameDirty, setFirstNameDirty] = useState(false)
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [firstNameError, setFirstNameError] = useState('Поле должно быть заполнено!')
    const [lastNameError, setLastNameError] = useState('Поле должно быть заполнено!')


    useEffect(() => {
        if (emailError || passwordError || repasswordError || firstNameError || lastNameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, repasswordError, firstNameError, lastNameError])

    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.post('https://localhost:7065/Account/Register', {
                    Email: email,
                    FirstName: firstName,
                    LastName: lastName,
                })
                    .then((resp) => {
                        console.log(resp)
                    })
            } catch (err) {
                console.log("error", err);
                alert("error");
            }

        };
        fetch();
    }, []);
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
            setFirstNameError('Поле должно быть заполнено!')
        } else{
            setFirstNameError('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)

        if(e.target.value.length < 1) {
            setLastNameError('Поле должно быть заполнено!')
        } else {
            setLastNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email!')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        passwordsIsMatching(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setPasswordError('Пароль должен быть больше 3х и меньше 20 символов!')
            if (!e.target.value.length) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    const passwordsIsMatching = (password) => {
        if(password !== repasword){
            setRepasswordError('Пароли должны совпадать!')
        } else {
            setRepasswordError('')
        }
    }

    const repasswordHandler = (e) => {
        setRepassword(e.target.value);
        if(e.target.value !== password){
            setRepasswordError('Пароли должны совпадать!')
        } else {
            setRepasswordError('')
        }
    }

    const regClick = async () => {

       const response = await registration(email, password, firstName, lastName);

    }
    const loginPageClick = async() => {
        const response = await goToLoginPage(email, password, firstName, lastName);
    }

    return (
        <form>
            <h1 style={{textAlign: "center", paddingTop: "26px", paddingBottom: "26px"}}>Регистрация</h1>
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3 style={{textAlign: "left", paddingBottom: '8px'}}>Введите имя.</h3>
                    <h3 style={{textAlign: "right", paddingBottom: '8px'}}>Введите фамилию.</h3>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {(firstNameDirty && firstNameError) && <div style={{color: "red", marginRight: "auto"}}>{firstNameError}</div>}
                    {(lastNameDirty && lastNameError) && <div style={{color: "red", marginLeft: "auto"}}>{lastNameError}</div>}
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
                    placeholder='Введите ваше имя...'
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
                    placeholder='Введите вашу фамилию...'
                />
                </div>
            </div>

            <div>
                <h3 style={{textAlign: "center"}}>Введите email.</h3>
                {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
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
                    placeholder='Введите ваш email...'
                />
            </div>
            <div>
                <h3 style={{textAlign: "center",}}>Введите пароль.</h3>
                {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
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
                    placeholder='Введите ваш пароль...'
                />
            </div>

            <div>
                <h3 style={{textAlign: "center",}}>Повторите пароль.</h3>
                {(repasswordDirty && repasswordError) && <div style={{color: "red"}}>{repasswordError}</div>}
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
                    placeholder='Повторите ваш пароль...'
                />
            </div>

            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    disabled={!formValid}
                    onClick={regClick}
                    
                >

                    Зарегистрироваться
                </MyButton>
            </div>

            <hr style={{marginBottom: "12px"}} />

            <div>
                <h3 style={{textAlign: "right"}}>Уже есть аккаунт?</h3>
            </div>
            <div style={{textAlign: "right"}}><MyButton
                style={{ height: "40px", outline: "none !important", border: "0 !important"}}
                onClick={loginPageClick}
            >
                Войдите!
            </MyButton>

            </div>
            <MyFooter />
        </form>
    );
};

export default Registration;