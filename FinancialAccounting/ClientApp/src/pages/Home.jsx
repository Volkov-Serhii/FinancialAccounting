import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import MySlider from "../components/UI/slider/MySlider";
import Cookies from "js-cookie";
import {GetBills} from "../http/userAPI";

const Home = (props) => {
    const [loading, setLoading] = useState(true)
    const [billsArray, setBillsArray] = useState([null])


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
        return <div className={'page'}>Загрузка данных...</div>; // Показать индикатор загрузки, пока данные загружаются
    }
    return (

        <div className={'page'}>
            Home
            <div style={{width: "220px"}}>
                <MySlider array={billsArray}/>
            </div>
        </div>


    )
}
export default withTranslation()(Home);