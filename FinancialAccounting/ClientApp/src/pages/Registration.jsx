import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import MyFooter from "../components/UI/footer/MyFooter";

const Registration = () => {
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
            <h1 style={{textAlign: "center", paddingTop: "26px", paddingBottom: "26px"}}>Регистрация</h1>
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3 style={{textAlign: "left"}}>Введите имя.</h3>
                <h3 style={{textAlign: "right"}}>Введите фамилию.</h3>
                </div>
                <div style={{display: "flex"}}>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                        marginRight: "16px",
                    }}
                    name="fistName"
                    type="text"
                    placeholder='Введите ваше имя...'
                />

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                        marginLeft: "16px",
                    }}
                    name="secondName"
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
                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    name="reppassword"
                    type="password"
                    placeholder='Повторите ваш пароль...'
                />
            </div>

            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    disabled={!formValid}
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
            >
                Войдите!
            </MyButton>

            </div>
            <MyFooter />
        </form>
    );
};

export default Registration;