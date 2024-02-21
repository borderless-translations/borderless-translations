import React from 'react';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import SettingsService from '../SettingsService/SettingsService.jsx';
import './Settings.css';

function Settings() {

    

return(
    <div>
        <h2>Settings</h2>
        
        <h3>Languages</h3>
            <SettingsLanguage />
        
        <p>Services</p>
            <SettingsService />
        
        <p>Rates</p>

        <p>Admin Status</p>


    </div>
)
}

export default Settings;
