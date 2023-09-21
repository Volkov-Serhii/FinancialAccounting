import axios from "axios";
import Cookies from 'js-cookie';

export const registration = async (email, password, repasword, firstName, lastName) => {
    try {
        await axios.post('/api/Account/Register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            PasswordConfirm: repasword
        }).then((resp) => {
            Cookies.set('AuthenticationToken', resp.data.token)
        })
    } catch (err) {
        console.log("error", err);
    }
}

export const login = async (email, password, checked) => {
    try {
        await axios.post('/api/Account/Login', {
            email: email,
            password: password,
            RememberMe: checked,
        }).then(result => Cookies.set('AuthenticationToken', result.data.token));
    } catch (err) {
        throw err;
    }
}

export const logout = async () => {
    try {
        await Cookies.remove('AuthenticationToken');
        await axios.post('/api/Account/Logout');
    } catch (err) {
        console.log("error", err);
    }
}

export const GetUserEmail = async(token) =>{
        try {
            await axios.get('/api/Account/GetUserEmail',    
            {
                params: {
                    token: token
                }
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
        } catch (err) {
            console.log("error", err);
        }

}
