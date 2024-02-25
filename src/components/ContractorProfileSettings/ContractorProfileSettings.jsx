import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProfileSettings.css";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Select, MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box } from '@mui/material';

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
    const timezoneList = [{id: 1, tz: "UTC -1:00"}, {id: 2, tz: "UTC -2:00"},
        {id: 3, tz: "UTC -3:00"}, {id: 4, tz: "UTC -4:00"}, {id: 5, tz: "UTC -5:00"}, {id: 6, tz: "UTC -6:00"}];

    useEffect(() => {
        dispatch({ type: "GET_CONTRACTOR_SELF" });
        dispatch({ type: "GET_ALL_LANGUAGES" });
        dispatch({ type: "GET_ALL_SERVICES" });
        dispatch({ type: "GET_ALL_EXPERTISE" });
    }, [])

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

    const containerStyle = {
        border: '2px solid black', 
        borderRadius: '20px', 
        padding: '20px',
        margin: '0px 30px'
    }
  
    const boxStyle = {
        border: '2px solid blue',
        borderRadius: '10px',
        padding: '50px'
    }

    if (!user) {
        return (<p>Loading...</p>)
    }

    else {
        return (
            <div className="container">
                <h2 style={{ margin: '20px 50px'}}>Profile Settings</h2>
                <Stack direction='row' sx={{ margin: '0px 100px', justifyContent: 'center' }}>
                    {/* Contact Info */}
                    <Stack direction='column' className="contractor-contact" sx={containerStyle}>
                        <h3 style={{textAlign: 'center' }}>Contact Information</h3>
                        <p>Availability</p>
                        <input type="checkbox" checked={availability} onClick={() => setAvailability(!availability)} />
                        <TextField label="Name" sx={{width: '300px'}} value={name} size="small" 
                            onChange={(e) => setName(e.target.value)} />
                        <br />
                        <TextField label="LinkedIn" value={linkedIn} size="small"
                            onChange={(e) => setLinkedIn(e.target.value)} />
                        <br />
                        <TextField label="Email" value={email} size="small"
                            onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <TextField label="Phone" value={phone} size="small"
                            onChange={(e) => setPhone(e.target.value)} />
                        <br />
                        <TextField label="Location" value={location} size="small"
                            onChange={(e) => setLocation(e.target.value)} />
                        <br />
                        <TextField value={timezone} size="small" select
                            onChange={(e) => setTimezone(e.target.value)} 
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        maxHeight: {
                                            xs: '200px'
                                        },
                                        width: 200
                                    }
                                },
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                }
                            }}>
                            {timezoneList.map(timezone => {
                                return (
                                    <MenuItem 
                                        key={timezone.id} 
                                        value={timezone.id}>
                                            {timezone.tz}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </Stack>
    
                    {/* Skills */}
                    <Stack direction='column' className="contractor-skills" sx={containerStyle}>
                        <h3 style={{textAlign: 'center' }}>Skills</h3>
                        <Stack direction='row'>
                            <Stack direction='row' sx={{ justifyContent: 'space-between'}}>
                                <TextField sx={{width: '250px', textAlign: 'right' }} label="Language" select size="small"
                                    value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)} 
                                    InputProps={{ 
                                        startAdornment: <InputAdornment sx={{margin: '10px'}} position="start">From:</InputAdornment>
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                maxHeight: {
                                                    xs: '200px'
                                                },
                                                width: 200
                                            }
                                        },
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        }
                                    }}>
                                    {languageList.map(language => {
                                        return (
                                            <MenuItem 
                                                key={language.id} 
                                                value={language.id}>
                                                    {language.name}
                                            </MenuItem>
                                        );
                                    })} 
                                </TextField>
    
                                <TextField sx={{width: '250px', textAlign: 'right' }} 
                                    label="Language" select value={toLanguage} size="small"
                                    onChange={(e) => setToLanguage(e.target.value)} 
                                    InputProps={{ 
                                        startAdornment: <InputAdornment sx={{margin: '10px'}} position="start">To:</InputAdornment>
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                maxHeight: {
                                                    xs: '200px'
                                                },
                                                width: 200
                                            }
                                        },
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        }
                                    }}>
                                    {languageList.map(language => {
                                        return (
                                            <MenuItem 
                                                key={language.id} 
                                                value={language.id}>
                                                    {language.name}
                                            </MenuItem>
                                        );
                                    })} 
                                </TextField>
                            </Stack>
    
                            <IconButton onClick={() => addLanguagePair(fromLanguage, toLanguage)}
                                disableElevation
                                disableRipple
                                size="small">
                                <Tooltip title="Add language">
                                    <AddIcon sx={{fontSize: '40px'}} />   
                                </Tooltip>
                            </IconButton>
                        </Stack>
                        
                        <Box sx={{boxStyle}}>
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
                        </Box>     
    
    
                        <Stack direction='row'>
                            <TextField sx={{width: '200px'}} value={skill} select label="Skills" size="small"
                                onChange={(e) => setSkill(e.target.value)} 
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: {
                                                xs: '200px'
                                            },
                                            maxWidth: 500
                                        }
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                      transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    }
                                }}>
                                {skillList.map(skill => {
                                    return (
                                        <MenuItem 
                                            key={skill.id} 
                                            value={skill.id}>
                                                {skill.type}
                                        </MenuItem>
                                    );
                                })} 
                            </TextField>
    
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
                            <TextField sx={{width: '200px'}} value={service} select label="Services" size="small"
                                onChange={(e) => setService(e.target.value)} 
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: {
                                                xs: '200px'
                                            },
                                            maxWidth: 500
                                        }
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                      transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    }
                                }}>
                                {serviceList.map(service => {
                                    return (
                                        <MenuItem 
                                            key={service.id} 
                                            value={service.id}>
                                                {service.type}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
    
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
    
                    <Stack direction='column' className="contractor-rates" sx={containerStyle}>
                        <h3 style={{textAlign: 'center' }}>Rates</h3>
                        <p>Written</p>
                        <TextField label="Written rate" value={writtenRate} size="small"
                            onChange={(e) => setWrittenRate(e.target.value)} 
                            InputProps={{
                                startAdornment: <InputAdornment sx={{margin: '2px'}} position="start">$</InputAdornment>,
                                endAdornment: <InputAdornment sx={{margin: '2px'}} position="end">per word</InputAdornment>
                              }}/>
                        <p>Audio / Video</p>
                        <TextField label="Audio/Video rate" value={minuteRate} size="small"
                            onChange={(e) => setMinuteRate(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment sx={{margin: '2px'}} position="start">$</InputAdornment>,
                                endAdornment: <InputAdornment sx={{margin: '2px'}} position="end">per minute</InputAdornment>
                              }} /> 
                        <br />
                        <br />
                        <br />
                        <button bbutton className='btn btn_sizeSm' onClick={() => saveUser()}>Save</button>
                    </Stack>    
                </Stack>
            </div>
        );
    }
};

export default ContractorProfileSettings;