import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { withTranslation } from "react-i18next";
import MyButton from '../button/MyButton';
import { DeleteBill } from "../../../http/userAPI";
import MyModal from "../modal/MyModal";
import MyEditAccountForm from "../modalForms/MyEditAccountForm"

const MySlider = (props) => {

    const [id, setId] = useState(0);
    const [billName, setBillsName] = useState("");
    const [billTypeId, setBillTypeId] = useState(1);
    const [isActiv, setIsActiv] = useState(true);
    const [balance, setBalance] = useState(0);
    const [modalActive, setModalActive] = useState(false)
    const [isReload, setIsReload] = useState(false);

    const Delete = async (id) => {
        await DeleteBill(id);
        window.location.reload();
    }

    const Edit = (id, billName, billTypeId, isActiv, balance) => {
        setId(id);
        setBillsName(billName);
        setBillTypeId(billTypeId);
        setIsActiv(isActiv);
        setBalance(balance);
        setModalActive(true);
    }
    if (isReload) {
        window.location.reload();
    }

    return (
        <CarouselProvider
            style={{ textAlign: "center", justifyContent: "center" }}
            naturalSlideWidth={320}
            naturalSlideHeight={200}
            totalSlides={props.array.length}
        >
            <Slider style={{ textAlign: "center", border: "1px solid teal", backgroundColor: "hsla(180,100%,25%, 0.5)", borderRadius: "12px", position: "relative" }}>
                {props.array.map((item, index) => (
                    <Slide style={{ display: "table-cell", verticalAlign: "middle" }} index={index} key={index}>
                        <div>
                            {item.accountName}
                        </div>
                        <div>
                            {item.balance.toFixed(2)}
                            {item.currencyName}
                        </div>
                        <div>
                            <MyButton
                                onClick={() => Edit(item.id, item.accountName, item.accountTypeId, item.isActiv, item.balance)}>
                                Edit
                            </MyButton>
                            <MyButton
                                onClick={() => Delete(item.id)}>
                                Delete
                            </MyButton>
                        </div>
                    </Slide>
                ))}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
            <MyModal active={modalActive} setActive={setModalActive}>
                <MyEditAccountForm modalActive={modalActive} setActive={setModalActive} setIsReload={setIsReload} id={id} billName={billName}
                    billTypeId={billTypeId} isActiv={isActiv} balance={balance}>
                </MyEditAccountForm>
            </MyModal>
        </CarouselProvider>

    );
}

export default withTranslation()(MySlider);