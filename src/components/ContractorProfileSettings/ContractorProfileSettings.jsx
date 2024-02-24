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
    const languageList = useSelector(store => store.allLanguages);
    const serviceList = useSelector(store => store.allServices);
    const skillList = useSelector(store => store.allExpertise);
    const user = useSelector(store => store.contractor);
    const [availability, setAvailability] = useState(user.available);
    const [name, setName] = useState(user.contractor_name);
    const [linkedIn, setLinkedIn] = useState(user.linked_in);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [location, setLocation] = useState(user.location);
    const [timezone, setTimezone] = useState(user.timezone);
    const languages = useState(user.languages)[0];
    const skills  = useState(user.expertise)[0];
    const services = useState(user.services)[0];
    const [writtenRate, setWrittenRate] = useState(user.base_written_rate);
    const [minuteRate, setMinuteRate] = useState(user.base_audio_video_rate);
    const [fromLanguage, setFromLanguage] = useState({});
    const [toLanguage, setToLanguage] = useState({});
    const [skill, setSkill] = useState({});
    const [service, setService] = useState({});

    // Saves updated contractor settings
    const saveUser = () => {
        let contractorUpdate = {
            name: name,
            available: availability,
            linked_in: linkedIn,
            phone: phone,
            location: location,
            timezone: timezone,
            base_written_rate: writtenRate,
            base_video_audio_rate: minuteRate
        };
        let userUpdate = {username: email};

        dispatch({ type: 'UPDATE_CONTRACTOR_SELF', payload: {contractor: contractorUpdate, user: userUpdate}});
    }

    // Service editing
    const addService = (serviceId) => {
        let newService = {
            service_id: serviceId,
            contractor_id: user.user_id
        }
        console.log(newService);
        dispatch({ type: 'ADD_SERVICE_TO_CONTRACTOR', payload: newService });
    }

    const deleteService = (serviceId) => {
        dispatch({ type: 'DELETE_SERVICE_FROM_CONTRACTOR', payload: serviceId })
    }

    // Language editing
    const deleteLanguage = (languageId) => {
        dispatch({ type: 'DELETE_LANGUAGE_FROM_CONTRACTOR', payload: languageId })
    }

    const addLanguagePair = (fromLang, toLang) => {
        let newLanguagePair = {
            from_language_id: fromLang,
            to_language_id: toLang,
            user_id: user.user_id
        }
        console.log(newLanguagePair);
        dispatch({ type: 'ADD_LANGUAGE_TO_CONTRACTOR', payload: newLanguagePair });
    }

    // Expertise editing
    const addSkill = (skillId) => {
        let newSkill = {
            expertise_id: skillId,
            contractor_id: user.user_id
        }
        console.log(newSkill);
        dispatch({ type: 'ADD_EXPERTISE_TO_CONTRACTOR', payload: newSkill });
    }

    const deleteSkill = (skillId) => {
        dispatch({ type: 'DELETE_EXPERTISE_FROM_CONTRACTOR', payload: skillId })
    }

    useEffect(() => {
        dispatch({ type: "GET_CONTRACTOR_SELF" });
        dispatch({ type: "GET_ALL_LANGUAGES" });
        dispatch({ type: "GET_ALL_SERVICES" });
        dispatch({ type: "GET_ALL_EXPERTISE" });
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
                    <p>Phone</p>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <p>Location</p>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
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

                    {languages.length > 0 ? 
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
                    <Stack direction='row'>
                        <Select sx={{width: '140px'}} value={skill} label='Skill' onChange={(e) => setSkill(e.target.value)} >
                            {skillList.map(skill => {
                                return (
                                    <MenuItem 
                                        key={skill.id} 
                                        value={skill.id}>
                                            {skill.type}
                                    </MenuItem>
                                );
                            })} 
                        </Select>

                        <IconButton onClick={() => addSkill(skill)}
                                disableElevation
                                disableRipple
                                size="small">
                                <Tooltip title="Add skill">
                                    <AddIcon sx={{fontSize: '40px'}} />   
                                </Tooltip>
                        </IconButton>
                    </Stack>

                    {skills.length > 0 ? 
                        skills.map((skill) => {
                            return (
                                <p style={{ margin: '0px 0px 0px 40px' }}>{skill.expertise_type}
                                <IconButton onClick={() => deleteSkill(skill.id)}
                                    disableElevation
                                    disableRipple
                                    size="small">
                                    <Tooltip title="Remove skill">
                                        <ClearIcon sx={{fontSize: '20px'}} />   
                                    </Tooltip>
                                </IconButton></p> 
                            )
                        })
                    :
                        <br />
                    }   


                    <p>Services</p>
                    <Stack direction='row'>
                        <Select sx={{width: '140px'}} value={service} label='Services' onChange={(e) => setService(e.target.value)} >
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

                        <IconButton onClick={() => addService(service)}
                            disableElevation
                            disableRipple
                            size="small">
                            <Tooltip title="Add service">
                                <AddIcon sx={{fontSize: '40px'}} />   
                            </Tooltip>
                        </IconButton>
                    </Stack>

                    {services.length > 0 ? 
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
                    $<input type="text" value={writtenRate} onChange={(e) => setWrittenRate(e.target.value)} /> per word
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