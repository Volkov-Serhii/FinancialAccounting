import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";
import Cookies from 'js-cookie';


export const registration = async (email, password, repasword, firstName, lastName) => {
    console.log("success")
        const fetch = async () => {
            try {
                //https://localhost:44395/
                //https://localhost:7065
                await axios.post('/api/Account/Register', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    PasswordConfirm: repasword
                    // firstName: 'John',
                    // lastName: 'Doe',
                    // email: 'johndoe@example.com',
                    // password: 'Secretpassword8*',
                    // PasswordConfirm: "Secretpassword8*"

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
        
    /*const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)*/
}
export const goToLoginPage = async() => {

}

export const login = async (email, password, checked) => {
    // const {data} = await $host.post('api/user/login', {email, password})
    var user;
    const fetch = async () => {
        try {
            const response = await axios.post('/api/Account/Login', {
                email: email,
                password: password,
                RememberMe: checked,
                //ReturnUrl: ""
            })
            .then(async(response) => {
                // alert(JSON.stringify(response));
                user = response.status;
                console.log(user);
                console.log(response.data)
                Cookies.set('AuthenticationToken', response.data.token);
            })
            return response.data;
        } catch (err) {
            console.log("error", err);
        }

    };
    const response1 = fetch();
    user = response1
    console.log(user)
    return user;
    // localStorage.setItem('token', data.token)
    // return jwt_decode(data.token)

}

export const logout = async () => {
    const fetch = async () => {
        try {
            Cookies.remove('AuthenticationToken');
            await axios.post('/api/Account/Logout')
        } catch (err) {
            console.log("error", err);
        }

    };
    fetch();
}

export const GetUserEmail = async(token) =>{
    // const fetch = async () => {
        try {
            await axios.get('/api/Account/GetUserEmail',    
            {
                params: {
                    token: token
                }
            })
            .then((response) => {
                // alert(JSON.stringify(response));\
                console.log(response.data)
                return response.data
            })
        } catch (err) {
            console.log("error", err);
        }

    // };
    // const resp = fetch();
    // return resp;
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}