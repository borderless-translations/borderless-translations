import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsService() {
    const dispatch = useDispatch();
    const services = useSelector(store => store.allServices);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_SERVICES' });
    }, []);

    
    return(
        <h1>Services</h1>
    
   
    );
}

export default SettingsService;
