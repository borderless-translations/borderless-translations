import React from 'react';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import SettingsService from '../SettingsService/SettingsService.jsx';
import SettingsExpertise from '../SettingsExpertise/SettingsExpertise.jsx';
import './Settings.css';
import { Stack } from '@mui/material';

function Settings() {

    

return(
    <div>
        <h2>Settings</h2>
        <Stack direction="row" spacing={2}>
        <h3>Languages</h3>
            <SettingsLanguage />
        
        <h3>Services</h3>
            <SettingsService />

        
            <SettingsExpertise />
        </Stack>

    </div>
)
}

export default Settings;
