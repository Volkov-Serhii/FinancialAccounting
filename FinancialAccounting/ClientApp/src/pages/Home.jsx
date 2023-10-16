import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import MyTransactionList from "../components/UI/transactionList/MyTransactionList";
import {GetBills,GetAllTransactions} from "../http/userAPI";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MyAddAccountForm from "../components/UI/modalForms/MyAddAccountForm";
import MyAddTransactionForm from "../components/UI/modalForms/MyAddTransactionForm";
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import './Home.css';

const Home = (props) => {
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([null])
    const [modalActive, setModalActive] = useState(false)
    const [transactionModalActive, setTransactionModalActive] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [transactionsArray, setTransactionsArray] = useState([]);

    if (isReload) {
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

        return (
            <div className={'page'} style={{justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh"}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) // Показать индикатор загрузки, пока данные загружаются
    }
    if (!Cookies.get("AuthenticationToken")) {
        return (
            <div className={'page'}>
                Login please
            </div>
        )
    }

    return (
        <div className={'home'}>
            <div className={'item'} style={{width: "220px"}}>
                <MySlider array={billsArray}/>
                <MyButton
                    style={{width: "140px", height: "40px"}}
                    onClick={() => setModalActive(true)}
                >
                    Add account
                </MyButton>
                <MyTransactionList array ={transactionsArray}/>
                <MyButton
                    style={{width: "140px", height: "60px"}}
                    onClick={() => setTransactionModalActive(true)}
                >
                    Add transaction
                </MyButton>
                <MyModal active={transactionModalActive} setActive={setTransactionModalActive}>
                    <MyAddTransactionForm setActive={setTransactionModalActive} setIsReload={setIsReload} billsArray = {billsArray}>

                    </MyAddTransactionForm>
                </MyModal>
                <MyModal active={modalActive} setActive={setModalActive}>
                    <MyAddAccountForm setActive={setModalActive} setIsReload={setIsReload}>

                    </MyAddAccountForm>
                </MyModal>
            </div>
            <div className={'item'}>
            </div>
        </div>

    )
}
export default withTranslation()(Home);