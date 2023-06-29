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
            <div style={{textAlign: "end"}}>
                <input type="checkbox" id="rememberme" name="rememberUser" checked/>
                <label htmlFor="rememberme">Запомнить меня</label>
            </div>
            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                    <MyButton
                        style={{width: "220px", height: "60px", marginBottom: "12px"}}
                        disabled={!formValid}
                    >
                        Войти на сайт
                    </MyButton>

            </div>

            <hr style={{marginBottom: "12px"}} />

                <div style={{display: "flex", justifyContent: "space-between"}}><MyButton
                    style={{height: "40px", outline: "none !important", border: "0 !important"}}
                >
                    Забыли email или пароль?
                </MyButton>


                <MyButton
                    style={{width: "140px", height: "40px"}}
                >
                    Регистрация
                </MyButton>
                </div>
            <footer style={{
                position: "absolute", left: "0", bottom: "0", width: "100%", height: "15px", textAlign:"center"
            }}><a href={"https://www.linkedin.com/in/сергей-волков-89531b207/"}>Serhii Volkov</a> & <a href={"https://www.linkedin.com/in/алексей-волков-6448761b5/"}>Oleksii Volkov</a></footer>
        </form>
    );
};

export default Auth;