import React, { useContext, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import MyList from "../components/UI/list/MyList";
import MyCategorisListItem from "../components/UI/listItems/MyCategorisListItem";
import MyTransactionslistitem from "../components/UI/listItems/MyTransactionslistitem";
import { GetBills, GetAllTransactions, GetCategories, getExchangeRates } from "../http/userAPI";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MyAddAccountForm from "../components/UI/modalForms/MyAddAccountForm";
import MyAddTransactionForm from "../components/UI/modalForms/MyAddTransactionForm";
import MyAddCategoryForm from "../components/UI/modalForms/MyAddCategoryForm";
import MyLoader from '../components/UI/loader/MyLoader';
import './Home.css';
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Home = observer((props) => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [transactionModalActive, setTransactionModalActive] = useState(false);
    const [categoryModalActive, setCategoryModalActive] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [transactionsArray, setTransactionsArray] = useState([]);
    const [categorisArray, setCategorisArray] = useState([]);
    const [currencyArray, setCurrencyArray] = useState([]);

    if (isReload) {
        window.location.reload();
    }
    useEffect(() => {
        const fetchData = async () => {

            const response = await GetBills();
            console.log("Bills:",response.data);
            const responseTrans = await GetAllTransactions();
            console.log("responseTrans:",responseTrans.data);
            const responseCateg = await GetCategories();
            console.log("responseCateg:",responseCateg.data);
            const responseExchangeRates = await getExchangeRates();
            console.log("responseExchangeRates:",responseExchangeRates);
            setBillsArray(response.data);
            setTransactionsArray(responseTrans.data);
            setCategorisArray(responseCateg.data);
            setCurrencyArray(responseExchangeRates);
            setLoading(false);
        };

        fetchData();
    }, []);

    const { t } = props;

    if (loading) {

        return (
            <MyLoader />
        ) // Показать индикатор загрузки, пока данные загружаются
    }

    return (
        <div className={'home'}>
            <div className={'item'}>
                <MySlider array={billsArray} />
                <MyButton
                    style={{ width: "140px", height: "40px" }}
                    onClick={() => setModalActive(true)}
                >
                    {t('home.addaccount')}
                </MyButton>
                <h1>{t('home.transactions')}</h1>
                <div style={{ height: '150px', overflowY: 'auto' }}>
                    <MyList array={transactionsArray}>
                        <MyTransactionslistitem categorisArray={categorisArray}></MyTransactionslistitem>
                    </MyList>
                </div>
                <MyButton
                    style={{ width: "140px", height: "60px" }}
                    onClick={() => setTransactionModalActive(true)}
                >
                    {t('home.addtransaction')}
                </MyButton>
                <MyModal active={transactionModalActive} setActive={setTransactionModalActive}>
                    <MyAddTransactionForm setActive={setTransactionModalActive} setIsReload={setIsReload} billsArray={billsArray} categorisArray={categorisArray}>

                    </MyAddTransactionForm>
                </MyModal>
                <MyModal active={modalActive} setActive={setModalActive}>
                    <MyAddAccountForm setActive={setModalActive} setIsReload={setIsReload} currencyArray={currencyArray}>

                    </MyAddAccountForm>
                </MyModal>
            </div>
            <div className={'item'}>
                <h1>{t('home.categoris')}</h1>
                <div style={{ height: '50%', overflowY: 'auto' }}>
                    <MyList array={categorisArray}>
                        <MyCategorisListItem></MyCategorisListItem>
                    </MyList>
                </div>
                <MyButton
                    style={{ width: "140px", height: "60px" }}
                    onClick={() => setCategoryModalActive(true)}
                >
                    {t('home.addcategory')}
                </MyButton>
                <MyModal active={categoryModalActive} setActive={setCategoryModalActive}>
                    <MyAddCategoryForm setActive={setCategoryModalActive} setIsReload={setIsReload} >

                    </MyAddCategoryForm>
                </MyModal>
            </div>
        </div>

    )
})
export default withTranslation()(Home);