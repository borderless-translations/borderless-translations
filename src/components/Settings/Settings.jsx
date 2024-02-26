import React from 'react';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import SettingsService from '../SettingsService/SettingsService.jsx';
import SettingsExpertise from '../SettingsExpertise/SettingsExpertise.jsx';
import './Settings.css';
import { Stack } from '@mui/material';

function Settings() {

    

return(
    <div className="container">
        <h2>Settings</h2>
        <Stack direction="row" sx={{ margin: '0px 100px', justifyContent:'center'}} spacing={2}>
        
            <SettingsLanguage />
        
            <SettingsService />
        
            <SettingsExpertise />
        </Stack>

    </div>
)
}

export default Settings;
