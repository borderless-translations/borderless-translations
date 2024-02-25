import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProfileSettings.css";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Select, MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box } from '@mui/material';
import AvailabilityToggle from '../AvailabilityToggle/AvailabilityToggle';

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
    console.log(languages);


    useEffect(() => {
        refreshPage();
    }, [])

    const refreshPage = () => {
        dispatch({ type: "GET_CONTRACTOR_SELF" });
        dispatch({ type: "GET_ALL_LANGUAGES" });
        dispatch({ type: "GET_ALL_SERVICES" });
        dispatch({ type: "GET_ALL_EXPERTISE" });
    }

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
        setTimeout(() => {
            refreshPage();
        }, 500);
  
    }

    // Service editing
    const addService = (serviceId) => {
        let newService = {
            service_id: serviceId,
            contractor_id: user.user_id
        }
        console.log(newService);
        dispatch({ type: 'ADD_SERVICE_TO_CONTRACTOR', payload: newService });
        setTimeout(() => {
            refreshPage();
        }, 500);
    }

    const deleteService = (serviceId) => {
        dispatch({ type: 'DELETE_SERVICE_FROM_CONTRACTOR', payload: serviceId })
        refreshPage();
    }

    // Language editing
    const deleteLanguage = (languageId) => {
        dispatch({ type: 'DELETE_LANGUAGE_FROM_CONTRACTOR', payload: languageId })
        refreshPage();
    }

    const addLanguagePair = (fromLang, toLang) => {
        let newLanguagePair = {
            from_language_id: fromLang,
            to_language_id: toLang,
            user_id: user.user_id
        }
        console.log(newLanguagePair);
        dispatch({ type: 'ADD_LANGUAGE_TO_CONTRACTOR', payload: newLanguagePair });
        refreshPage();
    }

    // Expertise editing
    const addSkill = (skillId) => {
        let newSkill = {
            expertise_id: skillId,
            contractor_id: user.user_id
        }
        console.log(newSkill);
        dispatch({ type: 'ADD_EXPERTISE_TO_CONTRACTOR', payload: newSkill });
        refreshPage();
    }

    const deleteSkill = (skillId) => {
        dispatch({ type: 'DELETE_EXPERTISE_FROM_CONTRACTOR', payload: skillId })
        refreshPage();
    }

    const containerStyle = {
        border: '1px solid #332c7b', 
        borderRadius: '10px', 
        backgroundColor: 'white',
        padding: '20px',
        margin: '0px 30px'
    }
  
    const boxStyle = {
        border: '1px solid #48a6cd',
        borderRadius: '0px',
        padding: '10px',
        margin: '10px 20px 30px 20px',
        fontSize: '1em'

    }

    const listStyle = {
        display: 'inline-block',
        margin: '5px',
        padding: '5px 15px',
        backgroundColor: '#e3fbfb',
        borderRadius: '20px',
        border: 'none',
        whiteSpace: 'nowrap'
    }

    const selectStyle = {
        margin: '0px 0px 0px 20px',
        width: '250px', 
        textAlign: 'right',
        '& .MuiInput-underline:before': { borderBottomColor: '#48a6cd' },
        '& .MuiInput-underline:after': { borderBottomColor: '#48a6cd' },
        '& .MuiInput-arrow': {color: '#48a6cd'}
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
          }
    }

    if (!user) {
        return (<p>Loading...</p>)
    }

    else {
        return (
            <div className="container">
                <h2 style={{ margin: '20px 130px'}}>Profile Settings</h2>
                <Stack direction='row' sx={{ margin: '0px 100px', justifyContent: 'center' }}>
                    {/* Contact Info */}
                    <Stack direction='column' className="contractor-contact" sx={containerStyle}>
                        <h3 style={{textAlign: 'center' }}>Contact Information</h3>
                        <p><AvailabilityToggle /> Availability </p>
                        {/* <input type="checkbox" checked={availability} onClick={() => setAvailability(!availability)} />*/}
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
                        <TextField value={timezone} size="small" select defaultValue={user.timezone}
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
                                        value={timezone.tz}>
                                            {timezone.tz}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                            
                        <Stack direction='column' className="contractor-rates">
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
                            <Button variant='contained' sx={buttonStyle} onClick={() => saveUser()}>Save</Button>
                        </Stack>   
                    </Stack>
    
                    {/* Skills */}
                    <Stack direction='column' className="contractor-skills" sx={containerStyle}>
                        <h3 style={{textAlign: 'center' }}>Skills</h3>
                        <p style={{margin: '0px 0px 0px 20px'}}>Languages</p>
                        <Box sx={boxStyle}>
                            {languages != undefined ? 
                                languages.map((language) => {
                                    return (
                                        <span style={listStyle}>{language.from_language} → {language.to_language}
                                        <IconButton onClick={() => deleteLanguage(language.id)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Remove language">
                                                <ClearIcon sx={{fontSize: '12px'}} />   
                                            </Tooltip>
                                        </IconButton></span> 
                                    )
                                })
                            :
                            <br />
                            }
                            <br /><br />
                            <Stack direction='row'>
                                <Stack direction='row' sx={{ justifyContent: 'space-between'}}>
                                    <TextField sx={selectStyle} select size="small" variant="standard"
                                        value={fromLanguage} defaultValue={languageList[0]} 
                                        onChange={(e) => setFromLanguage(e.target.value)} 
                                        InputProps={{ 
                                            startAdornment: <InputAdornment position="start">From:</InputAdornment>
                                        }}
                                        SelectProps={{
                                            MenuProps: {
                                                style: {
                                                    maxHeight: 280,
                                                },
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: "top",
                                                    horizontal: "left"
                                                }
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
        
                                    <TextField sx={selectStyle} 
                                        select size="small" variant="standard" 
                                        value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} 
                                        InputProps={{ 
                                            startAdornment: <InputAdornment position="start">To:</InputAdornment>
                                        }}
                                        SelectProps={{
                                            MenuProps: {
                                                style: {
                                                    maxHeight: 280,
                                                },
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: "top",
                                                    horizontal: "left"
                                                }
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
                                        <AddIcon sx={{ 
                                            fontSize: '20px',
                                            stroke: '#48a6cd',
                                            strokeWidth: 1.5
                                        }} />   
                                    </Tooltip>
                                </IconButton>
                            </Stack>
                        </Box>   
                        
                        <p style={{margin: '0px 0px 0px 20px'}}>Expertise</p>
                        <Box sx={boxStyle}>
                            {skills != undefined ? 
                                skills.map((skill) => {
                                    return (
                                        <span style={listStyle}>{skill.expertise_type}
                                        <IconButton onClick={() => deleteSkill(skill.id)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Remove skill">
                                                <ClearIcon sx={{fontSize: '12px'}} />   
                                            </Tooltip>
                                        </IconButton></span> 
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
                        <Button variant='contained' onClick={() => saveUser()}>Save</Button>
                    </Stack>    
                </Stack>
            </div>
        );
    }
};

export default ContractorProfileSettings;