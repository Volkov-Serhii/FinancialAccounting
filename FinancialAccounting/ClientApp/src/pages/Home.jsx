import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import {GetBills} from "../http/userAPI";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MyAddAccountForm from "../components/UI/modalForms/MyAddAccountForm";

const Home = (props) => {
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([null])
    const [modalActive, setModalActive] = useState(false)


    useEffect(() => {
        const fetchData = async () => {

            const response = await GetBills()
            console.log(response.data)
            setBillsArray(response.data)
            setLoading(false);
        };

        fetchData();
    }, []);

    const {t} = props;

    const closeModal = () => {
        setModalActive(false); // Функция для закрытия модального окна
    }

    if (loading) {
        return <div className={'page'}>Загрузка данных...</div>; // Показать индикатор загрузки, пока данные загружаются
    }
    return (
        <div className={'page'}>
            Home
            <div style={{width: "220px"}}>
                <MySlider array={billsArray}/>
                <MyButton
                    style={{width: "140px", height: "40px"}}
                    onClick={() => setModalActive(true)}
                >
                    Add account
                </MyButton>
                <MyModal active={modalActive} setActive={setModalActive}>
                    <MyAddAccountForm setActive={closeModal}>

                    </MyAddAccountForm>
                </MyModal>
            </div>
        </div>


    )
}
export default withTranslation()(Home);