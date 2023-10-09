import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import {GetBills} from "../http/userAPI";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MyAddAccountForm from "../components/UI/modalForms/MyAddAccountForm";
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';

const Home = (props) => {
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([null])
    const [modalActive, setModalActive] = useState(false)
    const [isReload, setIsReload] = useState(false);

    if (isReload) {
        window.location.reload();
    }
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

    if (loading) {

        return (
            <div className={'page'} style={{justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh"}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) // Показать индикатор загрузки, пока данные загружаются
    }
    if (!Cookies.get("AuthenticationToken")) {
        return (
            <div className={'page'}>
                Login please
            </div>
        )
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
                    <MyAddAccountForm setActive={setModalActive} setIsReload={setIsReload}>

                    </MyAddAccountForm>
                </MyModal>
            </div>
        </div>


    )
}
export default withTranslation()(Home);