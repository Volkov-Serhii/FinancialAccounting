import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";

export const registration = async (email, password, firstName, lastName) => {
    console.log("success")

 
        const fetch = async () => {
            try {
                //https://localhost:44395/
                //https://localhost:7065
                await axios.post('/api/Account/Register', {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'johndoe1@example.com',
                    password: 'Secretpassword8*',
                    PasswordConfirm: "Secretpassword8*"

                })
                    .then((resp) => {
                        console.log(resp)
                    })
            } catch (err) {
                console.log(err.resp.data);
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

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}