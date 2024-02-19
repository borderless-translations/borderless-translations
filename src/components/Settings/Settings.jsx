import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Settings.css';

function Settings() {

    const dispatch = useDispatch();

    const languages = useSelector(store => store.allLanguages);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_LANGUAGES'});
    },[]);

return(
    <div>
        <h2>Settings</h2>
        

        
        <ul>Languages</ul>
            {languages.map(language => {
                return(
                    <li key={language.id}>{language.name}</li>
                )
            })
        }


        <p>Services</p>

        
        <p>Area of Expertise</p>


        <p>Admin Status</p>


    </div>
)
}

export default Settings;
