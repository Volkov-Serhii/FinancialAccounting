import React, { useEffect, useState } from 'react';
import { withTranslation } from "react-i18next";
import MyButton from '../button/MyButton';
import MyModal from "../modal/MyModal";
import MyEditTransactionForm from "../modalForms/MyEditTransactionForm"
import { DeleteTransaction } from "../../../http/userAPI";

const MyTransactionslistitem = ({ item, setIsReload, categorisArray }) => {

    const [id, setId] = useState(0);
    const [isPositive, setIsPositive] = useState(true);
    const [amount, setAmount] = useState(0);
    const [categoryID, setCategoryID] = useState(true);
    const [discription, setDiscription] = useState("");
    const [modalActive, setModalActive] = useState(false)
    const [currencyName, setCurrencyName] = useState("UAH");


    const Edit = (id, isPositive, amount, categoryID, discription, currency) => {
        setId(id);
        setIsPositive(isPositive);
        setAmount(amount);
        setCategoryID(categoryID);
        setDiscription(discription);
        setCurrencyName(currency);
        setModalActive(true);
    }

    const Delete = async (id) => {
        await DeleteTransaction(id);
        window.location.reload();
    }

    return (
        <div>
            {item.amount}
            {item.currency}
            {item.dateTime}
            <MyButton
                onClick={() => Edit(item.transactionID, item.isPositive, item.amount, item.categoryID, item.discription, item.currency)}>
                Edit
            </MyButton>
            <MyButton
                onClick={() => Delete(item.transactionID)}>
                Delete
            </MyButton>
            <MyModal active={modalActive} setActive={setModalActive}>
                <MyEditTransactionForm modalActive={modalActive} setActive={setModalActive} setIsReload={setIsReload} categorisArray={categorisArray} id={id} isPositive={isPositive}
                    amount={amount} categoryID={categoryID} discription={discription} currencyName={currencyName}>
                </MyEditTransactionForm>
            </MyModal>
        </div>
    );
};

export default withTranslation()(MyTransactionslistitem);