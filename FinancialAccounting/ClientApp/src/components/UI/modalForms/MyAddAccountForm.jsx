import React from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import {withTranslation} from "react-i18next";
import classes from "../header/MyHeader.module.css";

const MyAddAccountForm = (props) => {
    const {t, setActive} = props;


    return (
        <div>
            <h1 style={{textAlign: "center", paddingBottom: "26px"}}>{t('addAccount.create')}</h1>

            <div>
                <h3 style={{textAlign: "center"}}>{t('addAccount.account_name')}</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    //onChange={e => emailHandler(e)}
                    //value={email}
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
                        <select id="account-type-select" style={{width: "160px", height: "20px"}}>
                            <option value="Bill">Bill</option>
                            <option value="Deposit">Deposit</option>
                        </select >
                    </div>


                    <div className="account_active_switcher">
                        <select id="account-active-select" style={{width: "160px", height: "20px"}}>
                            <option value="Active">Active</option>
                            <option value="Passive">Passive</option>
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
                    //onChange={e => emailHandler(e)}
                    //value={email}
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
                    //onClick={regClick}

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

export default withTranslation()(MyAddAccountForm);