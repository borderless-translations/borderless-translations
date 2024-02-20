import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import './Settings.css';

function Settings() {

    

return(
    <div>
        <h2>Settings</h2>
        
        <h3>Languages</h3>
            <SettingsLanguage />
        
        <p>Services</p>

        
        <p>Area of Expertise</p>


        <p>Admin Status</p>


    </div>
)
}

export default Settings;
