import React, {useEffect, useState} from 'react';
import { withTranslation } from 'react-i18next';

const Home = (props) => {
    const { t } = props;
    return (
        <div className={'page'}> Home </div>
    )
}
export default withTranslation()(Home);