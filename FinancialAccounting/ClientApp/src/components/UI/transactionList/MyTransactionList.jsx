import React, {useEffect, useState} from 'react';
import {withTranslation} from "react-i18next";


const MyTransactionList = (props) => {
    return(
        <div>
            <h1>Transactions</h1>
            <ul>
                {props.array.map((item, index) => (  
                    <li key={index} title={item.Discription}>
                        {item.amount}
                        {item.dateTime}
                    </li>    
                ))}
            </ul>
        </div>
    );
}
export default withTranslation()(MyTransactionList);