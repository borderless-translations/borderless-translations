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
        
        <h3>Services</h3>
            <SettingsService />

    </div>
)
}

export default Settings;
