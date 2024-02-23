import React from 'react';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import SettingsService from '../SettingsService/SettingsService.jsx';
import SettingsExpertise from '../SettingsExpertise/SettingsExpertise.jsx';
import './Settings.css';

function Settings() {

    

return(
    <div>
        <h2>Settings</h2>
        
        <h3>Languages</h3>
            <SettingsLanguage />
        
        <h3>Services</h3>
            <SettingsService />

        <h3>Expertise</h3>
            <SettingsExpertise />

    </div>
)
}

export default Settings;
