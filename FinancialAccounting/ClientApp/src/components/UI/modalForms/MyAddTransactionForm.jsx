import React, { useState } from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import {withTranslation} from "react-i18next";
import {CreateTransaction} from "../../../http/userAPI";

const MyAddTransactionForm = (props) => {
    const initialBillId = props.billsArray.length > 0 ? props.billsArray[0].id : 0;
    const initialCategoryId = props.categorisArray.length > 0 ? props.categorisArray[0].id : 0;

    const[amount, setAmount] = useState(0);
    const[billId, setBillId] = useState(initialBillId);
    const[categoryId, setCategoryId] = useState(initialCategoryId);
    const[isPositive, setIsPositive] = useState(true);
    const[discription, setDiscription] = useState("");

    const {t, setActive,setIsReload} = props;

    const amountHandler = (e) => {
        setAmount(e.target.value);
    }
    const billIdHandler = (e) => {
        setBillId(e.target.value);
    }
    const categoryIdHandler = (e) => {
        setCategoryId(e.target.value);
    }
    const isPositiveHandler = () => {
        setIsPositive(!isPositive);
    }
    const discriptionHandler = (e) => {
        setDiscription(e.target.value);
    }

    const CreateTransacyionClick = async() => {
        await CreateTransaction(billId,isPositive,amount,categoryId,discription);
        setActive(false);
        setIsReload(true);
    }

    return (
        <div>
            <h1 style={{textAlign: "center", paddingBottom: "26px"}}>Creat Transaction</h1>

            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3 style={{textAlign: "left", paddingBottom: '8px'}}>Select bill</h3>
                    <h3 style={{textAlign: "centre", paddingBottom: '8px'}}>Select category</h3>
                    <h3 style={{textAlign: "right", paddingBottom: '8px'}}>isPositive</h3>
                </div>

                <div style={{display: "flex", justifyContent:"space-between"}}>

                    <div className="account_type_switcher">
                        <select id="account-type-select" style={{width: "160px", height: "20px"}}
                        onChange={(e) => billIdHandler(e)}>
                            {props.billsArray.map(
                                (item, index) => (
                                    <option key={index} value={item.id}>{item.accountName}</option>
                                )
                            )}
                        </select >
                    </div>

                    <div >
                        <select id="category-select" style={{width: "160px", height: "20px"}}
                        onChange={(e) => categoryIdHandler(e)}>
                            {props.categorisArray.map(
                                (item, index) => (
                                    <option key={index} value={item.id}>{item.categoryName}</option>
                                )
                            )}
                        </select >
                    </div>

                    <div className="account_active_switcher">
                        <input type="checkbox" id="account-active-select" name="isPositive" checked={isPositive} onChange={isPositiveHandler}/>
                        {/* <select id="account-active-select" style={{width: "160px", height: "20px"}}
                        onChange={(e) => isPositiveHandler(e)}>
                            <option value={true}>Positive</option>
                            <option value={false}>Negative</option>
                        </select > */}
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style={{textAlign: "center"}}>Amount</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => amountHandler(e)}
                    name="amount"
                    type="number"
                    placeholder="Amount"
                />
            </div>

            <div>
                <h3 style={{textAlign: "center"}}>Description</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => discriptionHandler(e)}
                    name="description"
                    type="text"
                    placeholder="Discription"
                />
            </div>


            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    onClick={CreateTransacyionClick}
                >
                    {t('addAccount.create_account')}
                </MyButton>
            </div>

            <div style={{textAlign: "right"}}>
                <MyButton
                    style={{height: "40px", outline: "none !important", border: "1px solid red", color: "red"}}
                    onClick={() => setActive(false)}
                >
                    {t('addAccount.cancel_creating')}
                </MyButton>

            </div>
        </div>
    );
};

export default withTranslation()(MyAddTransactionForm);