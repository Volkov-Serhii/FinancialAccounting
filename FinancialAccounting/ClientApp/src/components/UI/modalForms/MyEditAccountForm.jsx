import React, { useState , useEffect} from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import {withTranslation} from "react-i18next";
import classes from "../header/MyHeader.module.css";
import {EditBill} from "../../../http/userAPI";

const MyEditAccountForm = (props) => {
    const {t, modalActive, setActive, setIsReload, id, billName, billTypeId, isActiv,balance} = props;

    const[billsName, setBillsName] = useState(billName);
    const[billsTypeId, setBillTypeId] = useState(billTypeId);
    const[isactiv, setIsActiv] = useState(isActiv);
    const[Balance, setBalance] = useState(balance);

    useEffect(() => {
        setBillsName(billName);
        setBillTypeId(billTypeId);
        setIsActiv(isActiv);
        setBalance(balance);
    }, [modalActive]);

    const nameHandler = (e) => {
        setBillsName(e.target.value);
    }
    const billTypeIdHandler = (e) => {
        setBillTypeId(e.target.value);
    }
    const isActivHandler = (e) => {
        setIsActiv(e.target.value);
    }
    const balanceHandler = (e) => {
        setBalance(e.target.value);
    }

    const EditBillClick = async() => {
        await EditBill(id,billsName,billsTypeId,isactiv,Balance);
        setActive(false);
        setIsReload(true);
    }

    return (
        <div>
            <h1 style={{textAlign: "center", paddingBottom: "26px"}}>Edit Bill</h1>

            <div>
                <h3 style={{textAlign: "center"}}>{t('addAccount.account_name')}</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => nameHandler(e)}
                    value={billsName}
                    //onBlur={e => blurHandler(e)}
                    name="name"
                    type="text"
                    placeholder={t('addAccount.name_input')}
                />
            </div>


            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3 style={{textAlign: "left", paddingBottom: '8px'}}>{t('addAccount.account_type')}</h3>
                    <h3 style={{textAlign: "right", paddingBottom: '8px'}}>{t('addAccount.isActive')}</h3>
                </div>

                <div style={{display: "flex", justifyContent:"space-between"}}>

                    <div className="account_type_switcher">
                        <select id="account-type-select" value={billsTypeId} style={{width: "160px", height: "20px"}}
                        onChange={(e) => billTypeIdHandler(e)}>
                            <option value={1}>Bill</option>
                            <option value={2}>Deposit</option>
                        </select >
                    </div>


                    <div className="account_active_switcher">
                        <select id="account-active-select" value={isactiv} style={{width: "160px", height: "20px"}}
                        onChange={(e) => isActivHandler(e)}>
                            <option value={true}>Active</option>
                            <option value={false}>Passive</option>
                        </select >
                    </div>
                </div>
            </div>

            <div>
                <h3 style={{textAlign: "center"}}>{t('addAccount.balance')}</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => balanceHandler(e)}
                    value={Balance}
                    //onBlur={e => blurHandler(e)}
                    name="balance"
                    type="number"
                    placeholder={t('addAccount.balance')}
                />
            </div>


            <div style={{display: "flex", justifyContent: "center", position: 'relative'}}>

                <MyButton
                    style={{width: "220px", height: "60px", marginBottom: "12px"}}
                    //disabled={!formValid}
                    onClick={EditBillClick}

                >

                    Edit Bill
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

export default withTranslation()(MyEditAccountForm);