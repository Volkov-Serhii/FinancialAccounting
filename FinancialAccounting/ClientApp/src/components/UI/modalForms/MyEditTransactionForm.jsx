import React, { useState , useEffect} from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import {withTranslation} from "react-i18next";
import classes from "../header/MyHeader.module.css";
import {EditTransaction} from "../../../http/userAPI";

const MyEditTransactionForm = (props) => {
    const {t, modalActive, setActive, setIsReload, categorisArray, id, isPositive, amount, categoryID, discription} = props;

    const[ispositive, setIsPositive] = useState(isPositive);
    const[amounts, setAmounts] = useState(amount);
    const[categoryid, setCategoryId] = useState(categoryID);
    const[Discription, setDiscription] = useState(discription);

    useEffect(() => {
        setIsPositive(isPositive);
        setAmounts(amount);
        setCategoryId(categoryID);
        setDiscription(discription);
    }, [modalActive]);

    const amountHandler = (e) => {
        setAmounts(e.target.value);
    }
    const categoryIdHandler = (e) => {
        setCategoryId(e.target.value);
    }
    const isPositiveHandler = () => {
        setIsPositive(!ispositive);
    }
    const discriptionHandler = (e) => {
        setDiscription(e.target.value);
    }

    const EditTransactionClick = async() => {
        await EditTransaction(id,ispositive,amounts,categoryid,Discription);
        setActive(false);
        setIsReload(true);
    }

    return (
        <div>
        <h1 style={{textAlign: "center", paddingBottom: "26px"}}>Edit Transaction</h1>

        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3 style={{textAlign: "left", paddingBottom: '8px'}}>Select category</h3>
                <h3 style={{textAlign: "right", paddingBottom: '8px'}}>isPositive</h3>
            </div>

            <div style={{display: "flex", justifyContent:"space-between"}}>

                <div className="account_type_switcher">
                    <select id="category-select" style={{width: "160px", height: "20px"}}
                    onChange={(e) => categoryIdHandler(e)} value = {categoryid}>
                        {categorisArray.map(
                            (item, index) => (
                                <option key={index} value={item.id}>{item.categoryName}</option>
                            )
                        )}
                    </select >
                </div>

                <div className="account_active_switcher">
                    <input type="checkbox" id="account-active-select" name="isPositive" checked={isPositive} onChange={isPositiveHandler}/>
                    {/* <select id="account-active-select" style={{width: "160px", height: "20px"}}
                    onChange={(e) => isPositiveHandler(e)} value={ispositive}>
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
                value = {amounts}
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
                value = {Discription}
                name="description"
                type="text"
                placeholder="Discription"
            />
        </div>


        <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>
            <MyButton
                style={{width: "220px", height: "60px", marginBottom: "12px"}}
                onClick={EditTransactionClick}
            >
                Edit
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

export default withTranslation()(MyEditTransactionForm);