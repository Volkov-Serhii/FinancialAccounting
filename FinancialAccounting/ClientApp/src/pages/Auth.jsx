import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)

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
            setEmailError('Некорректный email!')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setPasswordError('Пароль должен быть больше 3х и меньше 20 символов!')
            if (!e.target.value.length) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    return (
        <form>
            <div>
                <h1 style={{textAlign: "center"}}>Вход</h1>
                <h3 style={{textAlign: "center"}}>Введите email.</h3>
                {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                <MyInput
                    onChange={e => emailHandler(e)}
                    value={email}
                    onBlur={e => blurHandler(e)}
                    name="email"
                    type="email"
                    placeholder='Введите ваш email...'
                />
            </div>
            <div>
                <h3 style={{textAlign: "center"}}>Введите пароль.</h3>
                {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                <MyInput
                    onChange={e => passwordHandler(e)}
                    value={password}
                    onBlur={e => blurHandler(e)}
                    name="password"
                    type="password"
                    placeholder='Введите ваш пароль...'
                />
            </div>
            <hr/>
            <div style={{display: "flex", justifyContent: "space-between", position: 'relative'}}>

                <MyButton>Регистрация</MyButton>
                
                <MyButton
                    style={{}}
                    disabled={!formValid}
                >
                    Войти
                </MyButton>
            </div>
        </form>
    );
};

export default Auth;