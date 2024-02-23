import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProfileSettings.css";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Select, MenuItem, Stack, Tooltip, IconButton, Button } from '@mui/material';

function ContractorProfileSettings() {

    const params = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(useSelector(store => store.contractor));
    const [availability, setAvailability] = useState(user.available);
    const [name, setName] = useState(user.contractor_name);
    const [linkedIn, setLinkedIn] = useState(user.linked_in);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [timezone, setTimezone] = useState(user.timezone);
    const [languages, setlanguages] = useState([user.languages]);
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState(user.services);
    const [writtenRate, setWrittenRate] = useState(user.base_written_rate);
    const [minuteRate, setMinuteRate] = useState(user.base_audio_video_rate);
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');
    const languageList = [{name: 'English', id: 1}, {name: 'Japanese', id: 2}, {name: 'Spanish', id: 3}];
    const serviceList = [{type: 'Audio/Visual Transcription', id: 1}, 
        {type: 'English Closed Caption', id: 2}, 
        {type: 'Global Translated Subtitles', id: 3}, 
        {type: 'Non-Fiction Episodic Format Sheet (Chryon List)', id: 4}, 
        {type: 'As-Broadcast Script', id: 5}, 
        {type: 'Interpretation', id: 6}];

    // Saves updated contractor settings

    const saveUser = () => {
        let contractorUpdate = {
            contractor_name: name,
            available: availability,
            linked_in: linkedIn,
            phone: phone,
            location: location,
            timezone: timezone,
            base_written_rate: writtenRate,
            base_video_audio_rate: minuteRate
        };
        let userUpdate = {username: email};

        dispatch({ type: 'UPDATE_CONTRACTOR_SELF', payload: [ user.user_id, contractorUpdate, userUpdate] });
    }

    const addService = (serviceId) => {
        let newService = {
            service_id: serviceId,
            contractor_id: user.user_id
        }

        dispatch({ type: 'ADD_SERVICE_TO_CONTRACTOR', payload: newService });
    }

    const deleteService = (serviceId) => {
        dispatch({ type: 'DELETE_SERVICE_FROM_CONTRACTOR', payload: serviceId })
    }

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

    useEffect(() => {
        dispatch({ type: "GET_CONTRACTOR_SELF" });
    }, [])

    return (
        <div className="container">
            <h2 style={{ margin: '20px 50px'}}>Profile Settings</h2>
            <Stack direction='row' sx={{ margin: '0px 100px', justifyContent: 'space-between' }}>
                <Stack direction='column' className="contractor-contact">
                    <h3 style={{textAlign: 'center' }}>Contact Information</h3>
                    <p>Availability</p>
                    <input type="checkbox" checked={availability} onClick={() => setAvailability(!availability)} />
                    <p>Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>LinkedIn</p>
                    <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>Timezone</p>
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} >
                        <option value="UTC -1:00">UTC -1:00</option>
                        <option value="UTC -2:00">UTC -2:00</option>
                        <option value="UTC -3:00">UTC -3:00</option>
                        <option value="UTC -4:00">UTC -4:00</option>
                        <option value="UTC -5:00">UTC -5:00</option>
                        <option value="UTC -6:00">UTC -6:00</option>
                    </select>
                </Stack>

                <Stack direction='column' className="contractor-skills">
                    <h3 style={{textAlign: 'center' }}>Skills</h3>
                    <p>Languages</p>
                    <Stack direction='row'>
                        From: 
                        <Select sx={{width: '140px'}} value={fromLanguage} label='Select Language' onChange={(e) => setFromLanguage(e.target.value)} >
                            {languageList.map(language => {
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
                            {languageList.map(language => {
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
                            <Tooltip title="Add language">
                                <AddIcon sx={{fontSize: '40px'}} />   
                            </Tooltip>
                        </IconButton>
                    </Stack>

                    {languages[0] !== null ? 
                        languages.map((language) => {
                        return (
                            <p style={{ margin: '0px 0px 0px 40px' }}>{language.from_language}→{language.to_language}
                            <IconButton onClick={() => deleteLanguage(language.id)}
                                disableElevation
                                disableRipple
                                size="small">
                                <Tooltip title="Remove language">
                                    <ClearIcon sx={{fontSize: '20px'}} />   
                                </Tooltip>
                            </IconButton></p> 
                        )
                        })
                    :
                        <br />
                    }       
                    <p>Area of Expertise</p>
                    <Select sx={{width: '140px'}} value={skills} label='Skills' onChange={(e) => setSkills(e.target.value)} >
                        <option value="medical">Medical</option>
                        <option value="literary">Legal</option>
                        <option value="academic">Academic</option>
                        <option value="tech">Tech</option>
                        <option value="fin">Finance</option>
                        <option value="cert">Has certification</option>
                    </Select>

                    <p style={{ margin: '0px' }}>Medical
                            <IconButton onClick={() => deleteService(service.id)}
                                disableElevation
                                disableRipple
                                size="small">
                                <Tooltip title="Remove skill">
                                    <ClearIcon sx={{fontSize: '20px'}} />   
                                </Tooltip>
                            </IconButton></p>
                    <p style={{ margin: '0px' }}>Has certification
                    <IconButton onClick={() => deleteService(service.id)}
                        disableElevation
                        disableRipple
                        size="small">
                        <Tooltip title="Remove skill">
                            <ClearIcon sx={{fontSize: '20px'}} />   
                        </Tooltip>
                    </IconButton></p>

                    <p>Services</p>
                    <Select sx={{width: '140px'}} value={services} label='Services' onChange={(e) => setServices(e.target.value)} >
                        {serviceList.map(service => {
                            return (
                                <MenuItem 
                                    key={service.id} 
                                    value={service.id}>
                                        {service.type}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    {services[0] !== null ? 
                        services.map((service) => {
                            return (
                                <p style={{ margin: '0px' }}>{service.service_type} 
                                <IconButton onClick={() => deleteService(service.id)}
                                    disableElevation
                                    disableRipple
                                    size="small">
                                    <Tooltip title="Remove service">
                                        <ClearIcon sx={{fontSize: '20px'}} />   
                                    </Tooltip>
                                </IconButton></p>
                            )
                        })
                    :
                        <br />
                    }
                </Stack>

                <Stack direction='column' className="contractor-rates">
                    <h3 style={{textAlign: 'center' }}>Rates</h3>
                    <p>Written</p>
                    $<input type="text" value={writtenRate} onChange={(e) => setWrittenRate(e.target.value)} />  per word
                    <p>Audio / Video</p>
                    $<input type="text" value={minuteRate} onChange={(e) => setMinuteRate(e.target.value)} /> per min.
                    <br />
                    <br />
                    <br />
                    <Button variant='contained' onClick={() => saveUser()}>Save</Button>
                </Stack>    
            </Stack>
        </div>
    );
};

export default ContractorProfileSettings;