import React, { useState } from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import { withTranslation } from "react-i18next";
import classes from "../header/MyHeader.module.css";
import { CreateBill } from "../../../http/userAPI";

const MyAddAccountForm = (props) => {

    const [billName, setBillsName] = useState("");
    const [billTypeId, setBillTypeId] = useState(1);
    const [isActiv, setIsActiv] = useState(true);
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState("UAH");

    const { t, setActive, setIsReload, currencyArray } = props;

    const nameHandler = (e) => {
        setBillsName(e.target.value);
    }
    const billTypeIdHandler = (e) => {
        setBillTypeId(e.target.value);
    }
    const isActivHandler = () => {
        setIsActiv(!isActiv);
    }
    const balanceHandler = (e) => {
        setBalance(e.target.value);
    }
    const CurrencyHandler = async(e,target) => {
        const value = e.target.value;
        setCurrency(value);
    }

    const CreateBillClick = async () => {
        await CreateBill(billName, billTypeId, isActiv, balance, currency);
        setActive(false);
        setIsReload(true);
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", paddingBottom: "26px" }}>{t('addAccount.create')}</h1>

            <div>
                <h3 style={{ textAlign: "center" }}>{t('addAccount.account_name')}</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => nameHandler(e)}
                    //value={email}
                    //onBlur={e => blurHandler(e)}
                    name="name"
                    type="text"
                    placeholder={t('addAccount.name_input')}
                />
            </div>


            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ textAlign: "left", paddingBottom: '8px' }}>{t('addAccount.account_type')}</h3>
                    <h3 style={{ textAlign: "right", paddingBottom: '8px' }}>{t('addAccount.isActive')}</h3>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div className="account_type_switcher">
                        <select id="account-type-select" style={{ width: "160px", height: "20px" }}
                            onChange={(e) => billTypeIdHandler(e)}>
                            <option value={1}>Bill</option>
                            <option value={2}>Deposit</option>
                        </select >
                    </div>


                    <div className="account_active_switcher">
                        <input type="checkbox" id="account-active-select" name="isActiv" checked={isActiv} onChange={isActivHandler} />
                        {/* <select id="account-active-select" style={{width: "160px", height: "20px"}}
                        onChange={(e) => isActivHandler(e)}>
                            <option value={true}>Active</option>
                            <option value={false}>Passive</option>
                        </select > */}
                    </div>
                </div>
            </div>

            <div>
                <h3 style={{ textAlign: "center" }}>{t('addAccount.balance')}</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => balanceHandler(e)}
                    //value={email}
                    //onBlur={e => blurHandler(e)}
                    name="balance"
                    type="number"
                    placeholder={t('addAccount.balance')}
                />
                <select value={currency} onChange={CurrencyHandler}>
                    <option title = "Українська гривня" value="UAH">UAH</option>
                    {currencyArray.map((item, index) => (
                        <option key = {index} title = {item.txt} value={item.cc}>{item.cc}</option>
                    ))}
                </select>
            </div>


            <div style={{ display: "flex", justifyContent: "center", position: 'relative' }}>

                <MyButton
                    style={{ width: "220px", height: "60px", marginBottom: "12px" }}
                    //disabled={!formValid}
                    onClick={CreateBillClick}

                >

                    {t('addAccount.create_account')}
                </MyButton>
            </div>

            <div style={{ textAlign: "right" }}>
                <MyButton
                    style={{ height: "40px", outline: "none !important", border: "1px solid red", color: "red" }}
                    onClick={() => setActive(false)}
                >
                    {t('addAccount.cancel_creating')}
                </MyButton>

            </div>
        </div>
    );
};

export default withTranslation()(MyAddAccountForm);