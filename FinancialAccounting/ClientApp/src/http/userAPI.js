import axios from "axios";
import Cookies from 'js-cookie';
import { axiosAuth } from "./axiosSettings";

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
            if (checked) {
                Cookies.set('AuthenticationToken', result.data.token, { expires: 14 })
            } else {
                Cookies.set('AuthenticationToken', result.data.token)
            }
        });
        return 200;
    } catch (err) {
        return err.response.status
    }
}

export const checkUser = () => {
    if (Cookies.get("AuthenticationToken")) {
        return true;
    } else {
        return false;
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

export const GetUserEmail = async (token) => {
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
                resultData = response.data;
            })
        return resultData
    } catch (err) {
        console.log("error", err);
    }
}
export const GetBills = async () => {
    try {
        const response = await axiosAuth.get('/api/Bills/GetBills')
        return response;
    } catch (err) {
        return err.response.status
    }
}
export const CreateBill = async (billName, billTypeId, isActiv, balance, currency) => {
    try {
        const response = await axiosAuth.post('/api/Bills/CreateBill',
            {
                AccountName: billName,
                AccountTypeId: billTypeId,
                isActiv: isActiv,
                Balance: balance,
                Currency: currency
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const EditBill = async (id, billName, billTypeId, isActiv, balance) => {
    try {
        const response = await axiosAuth.post('/api/Bills/EditBill',
            {
                id: id,
                AccountName: billName,
                AccountTypeId: billTypeId,
                isActiv: isActiv,
                Balance: balance
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const DeleteBill = async (id) => {
    try {
        const response = await axiosAuth.delete('/api/Bills/DeleteBill',
            {
                params: {
                    id: id
                }
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const GetAllTransactions = async () => {
    try {
        const response = await axiosAuth.get('/api/Bills/GetAllTransactions')
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const CreateTransaction = async (billId, isPositive, amount, categoryId, discription) => {
    try {
        const response = await axiosAuth.post('/api/Bills/CreateTransaction',
            {
                AccountID: billId,
                isPositive: isPositive,
                Amount: amount,
                CategoryID: categoryId,
                Discription: discription
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const EditTransaction = async (id, isPositive, amount, categoryId, discription) => {
    try {
        const response = await axiosAuth.post('/api/Bills/EditTransaction',
            {
                id: id,
                isPositive: isPositive,
                Amount: amount,
                CategoryID: categoryId,
                Discription: discription
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const DeleteTransaction = async (id) => {
    try {
        const response = await axiosAuth.delete('/api/Bills/DeleteTransaction',
            {
                params: {
                    id: id
                }
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const GetCategories = async () => {
    try {
        const response = await axiosAuth.get('/api/Bills/GetCategories')
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const CreateCategori = async (categoryName) => {
    try {
        const response = await axiosAuth.post('/api/Bills/CreateCategori', {
            CategoryName: categoryName
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const EditCategory = async (id, categoryName) => {
    try {
        const response = await axiosAuth.post('/api/Bills/EditCategory',
            {
                id: id,
                CategoryName: categoryName,
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const DeleteCategori = async (id) => {
    try {
        const response = await axiosAuth.delete('/api/Bills/DeleteCategori',
            {
                params: {
                    id: id
                }
            })
        return response;
    } catch (err) {
        return err.response.status
    }
}

export const getExchangeRates = async () => {
    var data;
    const storedData = JSON.parse(localStorage.getItem('exchangeRates')) || { data: [], lastUpdated: null };

    const currentTime = new Date().getTime();
    const lastUpdatedTime = storedData.lastUpdated;
    const oneDayInMilliseconds = 86400000;

    if (!lastUpdatedTime || currentTime - lastUpdatedTime > oneDayInMilliseconds) {
        try {
            const response = await axios.get('NBUStatService/v1/statdirectory/exchangenew?json');
            data = response.data;
            const updatedData = { data, lastUpdated: currentTime };
            localStorage.setItem('exchangeRates', JSON.stringify(updatedData));
        } catch (err) {
            console.log(err);
        }
    }else{
        data = storedData.data;
    }
    return data;
}