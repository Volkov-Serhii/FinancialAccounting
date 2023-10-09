import axios from "axios";
import Cookies from 'js-cookie';
import {axiosAuth} from "./axiosSettings";

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
        return 200;
    } catch (err) {
        return err.response.status
    }
}

export const login = async (email, password, checked) => {
    try {
        await axios.post('/api/Account/Login', {
            email: email,
            password: password,
            RememberMe: checked,
        }).then(result => {
            if(checked){
                Cookies.set('AuthenticationToken', result.data.token,{expires: 14})
            }else{
                Cookies.set('AuthenticationToken', result.data.token)
            }
        });
        return 200;
    } catch (err) {
           return err.response.status
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
    let resultData = null
        try {
            const response = await axiosAuth.get('/api/Account/GetUserEmail',
            {
                params: {
                    token: token
                }
            })
            .then((response) => {
                console.log(response.data)
                resultData= response.data;
            })
            return resultData
        } catch (err) {
            console.log("error", err);
        }
}
export const GetBills = async() => {
    try {
        const response = await axiosAuth.get('/api/Bills/GetBills')
        console.log("req api done " + response)
        return response;
    } catch (err) {
        return err.response.status
    }
}
export const CreateBill = async(billName,billTypeId,isActiv,balance) => {
    try {
        const response = await axiosAuth.post('/api/Bills/CreateBill',
        {
            AccountName: billName,
            AccountTypeId: billTypeId,
            isActiv: isActiv,
            Balance: balance
        })
        console.log("req api done " + response)
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const EditBill = async(id,billName,billTypeId,isActiv,balance) => {
    try {
        const response = await axiosAuth.post('/api/Bills/EditBill',
        {
            id: id,
            AccountName: billName,
            AccountTypeId: billTypeId,
            isActiv: isActiv,
            Balance: balance
        })
        console.log("req api done " + response)
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const DeleteBill = async(id) => {
    try {
        const response = await axiosAuth.delete('/api/Bills/DeleteBill',
        {   
            params: {
            id: id
            }
        })
        console.log("req api done " + response)
        return response;
    } catch (err) {
        return err.response.status
    }
}