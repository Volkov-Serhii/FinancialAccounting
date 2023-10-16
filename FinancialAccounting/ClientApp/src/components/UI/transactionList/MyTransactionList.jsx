import React, {useEffect, useState} from 'react';
import {withTranslation} from "react-i18next";
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import MyButton from '../button/MyButton';
import {DeleteTransaction} from "../../../http/userAPI";
import MyModal from "../modal/MyModal";
import MyEditTransactionForm from "../modalForms/MyEditTransactionForm"


const MyTransactionList = (props) => {
    const [id, setId] = useState(0);
    const [isPositive, setIsPositive] = useState(true);
    const [amount, setAmount] = useState(0);
    const [categoryID, setCategoryID] = useState(true);
    const [discription, setDiscription] = useState("");
    const [modalActive, setModalActive] = useState(false)
    const [isReload, setIsReload] = useState(false);

    if(isReload){
        window.location.reload();
    }

    const Edit = (id,isPositive,amount,categoryID,discription) =>{
        setId(id);
        setIsPositive(isPositive);
        setAmount(amount);
        setCategoryID(categoryID);
        setDiscription(discription);
        setModalActive(true);
    }

    const Delete = async(id) =>{
        await DeleteTransaction(id);
        window.location.reload();
    }

    return(
        <div>
            <h1>Transactions</h1>
            <Col sm={35}>
            <ListGroup as="ul">
                {props.array.map((item, index) => (  
                    <ListGroup.Item key={index} title={item.Discription}  variant="dark">
                        {item.amount}
                        {item.dateTime}
                        <MyButton
                            onClick={() => Edit(item.id,item.isPositive,item.amount,item.categoryID,item.discription)}>
                                Edit
                        </MyButton>
                        <MyButton
                            onClick={() => Delete(item.id)}>
                                Delete
                        </MyButton>
                    </ListGroup.Item>    
                ))}
            </ListGroup>
            </Col>
            <MyModal active={modalActive} setActive={setModalActive}>
                <MyEditTransactionForm modalActive={modalActive} setActive={setModalActive} setIsReload = {setIsReload} id ={id} isPositive={isPositive} 
                    amount={amount} categoryID={categoryID} discription={discription}>
                </MyEditTransactionForm>
            </MyModal>
        </div>
    );
}
export default withTranslation()(MyTransactionList);