import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import MyTransactionList from "../components/UI/transactionList/MyTransactionList";
import {GetBills,GetAllTransactions} from "../http/userAPI";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MyAddAccountForm from "../components/UI/modalForms/MyAddAccountForm";
import Cookies from 'js-cookie';

const Home = (props) => {
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([null])
    const [modalActive, setModalActive] = useState(false)
    const [isReload, setIsReload] = useState(false);
    const [transactionsArray, setTransactionsArray] = useState([]);

    if(isReload){
        window.location.reload();
    }
    useEffect(() => {
        const fetchData = async () => {

            const response = await GetBills();
            console.log(response.data);
            const responseTrans = await GetAllTransactions();
            console.log(responseTrans.data);
            setBillsArray(response.data);
            setTransactionsArray(responseTrans.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const {t} = props;

    if (loading) {
        return <div className={'page'}>Загрузка данных...</div>; // Показать индикатор загрузки, пока данные загружаются
    }
    if (!Cookies.get("AuthenticationToken")) {
        return (
            <div className={'page'}>
                Login please
            </div>
        )
    }

    return (
        <div className={'page'}>
            Home
            <div style={{width: "220px"}}>
                <MySlider array={billsArray}/>
                <MyButton
                    style={{width: "140px", height: "40px"}}
                    onClick={() => setModalActive(true)}
                >
                    Add account
                </MyButton>
                <MyTransactionList array ={transactionsArray}/>
                <MyModal active={modalActive} setActive={setModalActive}>
                    <MyAddAccountForm setActive={setModalActive} setIsReload = {setIsReload}>

                    </MyAddAccountForm>
                </MyModal>
            </div>
        </div>


    )
}
export default withTranslation()(Home);