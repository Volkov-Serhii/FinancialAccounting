import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';

const MyLoader = (props) => {
    return (
        <div className={'page'} style={{justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh"}}>
            <div className='LogRegColumn'>
                <Spinner  animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    )
}
export default (MyLoader);