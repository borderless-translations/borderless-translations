import React from 'react';
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage.jsx';
import SettingsService from '../SettingsService/SettingsService.jsx';
import SettingsExpertise from '../SettingsExpertise/SettingsExpertise.jsx';
import './Settings.css';
import { Stack } from '@mui/material';

function Settings() {

    

return(
    <div className="container">
        <Stack direction='column' sx={{margin: '0px 0px'}}>
            <h2>Settings</h2>
            <Stack direction="row" sx={{justifyContent:'start'}} spacing={2}>
            
                <SettingsLanguage />
            
                <SettingsService />
            
                <SettingsExpertise />
            </Stack>
        </Stack>

    </div>
)
}

export default Settings;
