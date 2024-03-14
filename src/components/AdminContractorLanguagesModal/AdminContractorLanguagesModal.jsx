import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Select, MenuItem, Tooltip, IconButton } from '@mui/material';
import { AddIcon} from '@mui/icons-material/Add';

function AdminContractorLanguagesModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const allLanguages = useSelector(store => store.allLanguages);
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
        const isChecked = event.target.checked;
        console.log(`${value} is ${checked}`)

            if (isChecked) {
                setSelectedLanguages([...selectedLanguages, value])
            } else {
                setSelectedLanguages(selectedLanguages.filter(
                        (event) => event !== value
                    )
                )
            }   
    };


    const deleteLanguage = (languageId) => {
        dispatch({ type: 'DELETE_LANGUAGE_FROM_CONTRACTOR', payload: languageId })
    }

    const addLanguagePair = (fromLang, toLang) => {
        let newLanguagePair = {
            from_language_id: fromLang,
            to_language_id: toLang,
            user_id: user.user_id
        }

        dispatch({ type: 'ADD_LANGUAGE_TO_CONTRACTOR', payload: newLanguagePair });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                <div className="language-div form-group">
                <Stack direction='column' className="contractor-skills">
                    <h3 style={{textAlign: 'center' }}>Skills</h3>
                    <p>Languages</p>
                    <Stack direction='row'>
                        From: 
                        <Select sx={{width: '140px'}} value={fromLanguage} label='Select Language' onChange={(e) => setFromLanguage(e.target.value)} >
                            {allLanguages.map(language => {
                                return (
                                    <MenuItem 
                                        key={language.id} 
                                        value={language.id}>
                                            {language.name}
                                    </MenuItem>
                                );
                            })} 
                        </Select>

                        To: 
                        <Select sx={{width: '140px'}} value={toLanguage} label='Select Language' onChange={(e) => setToLanguage(e.target.value)} >
                            {allLanguages.map(language => {
                                return (
                                    <MenuItem 
                                        key={language.id} 
                                        value={language.id}>
                                            {language.name}
                                    </MenuItem>
                                );
                            })} 
                        </Select>

                        <IconButton onClick={() => addLanguagePair(fromLanguage, toLanguage)}
                            disableElevation
                            disableRipple
                            size="small">
                            {/* <Tooltip title="Add language">
                                <AddIcon sx={{fontSize: '40px'}} />   
                            </Tooltip> */}
                        </IconButton>
                    </Stack>
                    </Stack>
                        </div>
                    <button  className='btn btn_sizeSm' type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorLanguagesModal;