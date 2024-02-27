import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import "./ContractorProfileSettings.css";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box, Checkbox } from '@mui/material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ContractorProfileSettings() {
    const dispatch = useDispatch();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
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
    const timezoneList = [
        {id: 1, tz: "UTC -11:00 - American Samoa"}, 
        {id: 2, tz: "UTC -10:00 - Honolulu"},
        {id: 3, tz: "UTC -9:00 - Anchorage"}, 
        {id: 4, tz: "UTC -8:00 - Los Angeles"}, 
        {id: 5, tz: "UTC -7:00 - Denver"}, 
        {id: 6, tz: "UTC -6:00 - Chicago"},
        {id: 7, tz: "UTC -5:00 - New York"}, 
        {id: 8, tz: "UTC -4:00 - Halifax"},
        {id: 9, tz: "UTC -3:00 - Rio de Janeiro"}, 
        {id: 10, tz: "UTC -2:00 - Ponta Delgada"}, 
        {id: 11, tz: "UTC -1:00 - Reykjavik"}, 
        {id: 13, tz: "UTC 0:00 - London"}, 
        {id: 14, tz: "UTC +1:00 - Paris"},
        {id: 15, tz: "UTC +2:00 - Helsinki"}, 
        {id: 16, tz: "UTC +3:00 - Moscow"}, 
        {id: 17, tz: "UTC +4:00 - Dubai"}, 
        {id: 18, tz: "UTC +5:00 - Karachi"},
        {id: 19, tz: "UTC +6:00 - Dhaka"}, 
        {id: 20, tz: "UTC +7:00 - Bangkok"},
        {id: 21, tz: "UTC +8:00 - Beijing"}, 
        {id: 22, tz: "UTC +9:00 - Tokyo"}, 
        {id: 23, tz: "UTC +10:00 - Brisbane"}, 
        {id: 24, tz: "UTC +11:00 - Sydney"},
        {id: 25, tz: "UTC +12:00 - Tarawa"},
        {id: 26, tz: "UTC +13:00 - Auckland"}];
    const [refresh, setRefresh] = useState(1);

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

        Swal.fire({
            title: "Save changes?",
            text: "This action saves contact and rate settings. Skills are updated automatically.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#48a6cd",
            cancelButtonColor: "#332c7b",
            confirmButtonText: "Save",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'UPDATE_CONTRACTOR_SELF', payload: {contractor: contractorUpdate, user: userUpdate}});
                setTimeout(() => {
                    refreshPage();
                }, 500);
            }
        })
    }

    // Service editing
    const addService = (service) => {
        let newService = {
            service_id: service.id,
            contractor_id: user.user_id
        }
        console.log(newService);
        dispatch({ type: 'ADD_SERVICE_TO_CONTRACTOR', payload: newService });
        services.push({id: service.id, service_type: service.type});
        setTimeout(() => {
            refreshPage();
        }, 500);
    }

    const deleteService = (service) => {
        dispatch({ type: 'DELETE_SERVICE_FROM_CONTRACTOR', payload: service.id })
        let index = services.indexOf(service);
        services.splice(index, 1);
        refreshPage();
    }

    // Language editing
    const deleteLanguage = (language) => {
        dispatch({ type: 'DELETE_LANGUAGE_FROM_CONTRACTOR', payload: language.id })
        refreshPage();
        let index = languages.indexOf(language);
        languages.splice(index, 1);
    }

    const addLanguagePair = (fromLang, toLang) => {
        let newLanguagePair = {
            from_language_id: fromLang.id,
            to_language_id: toLang.id,
            user_id: user.user_id
        }
        dispatch({ type: 'ADD_LANGUAGE_TO_CONTRACTOR', payload: newLanguagePair });
        refreshPage();
        languages.push({from_language: fromLang.name, to_language: toLang.name, id: Math.floor((Math.random() * 200)+20)})
    }

    // Expertise editing
    const addSkill = (skill) => {
        let newSkill = {
            expertise_id: skill.expertise_id,
            contractor_id: user.user_id
        }
        skills.push({id: Math.floor((Math.random() * 200)+20), expertise_type: skill.type})
        dispatch({ type: 'ADD_EXPERTISE_TO_CONTRACTOR', payload: newSkill });
        refreshPage();
    }

    const deleteSkill = (skill) => {
        dispatch({ type: 'DELETE_EXPERTISE_FROM_CONTRACTOR', payload: skill.id })
        refreshPage();
        let index = skills.indexOf(skill);
        skills.splice(index, 1);
    }

    const containerStyle = {
        border: '1px solid #332c7b', 
        borderRadius: '5px', 
        backgroundColor: 'white',
        padding: '20px',
        marginRight: '30px',
        fontSize: '1em'
    }
  
    const boxStyle = {
        border: '1px solid #48a6cd',
        borderRadius: '0px',
        padding: '10px',
        margin: '10px 20px 30px 20px',
        fontSize: '12px'
    }

    const listStyle = {
        display: 'inline-block',
        margin: '5px',
        padding: '5px 15px',
        backgroundColor: '#e3fbfb',
        borderRadius: '20px',
        border: 'none',
        whiteSpace: 'nowrap',
        fontSize: '12px'
    }

    const selectStyle = {
        margin: '0px 0px 0px 20px',
        width: '250px', 
        textAlign: 'right',
        '& .MuiInput-underline:before': { borderBottomColor: '#48a6cd' },
        '& .MuiInput-underline:after': { borderBottomColor: '#48a6cd' },
        '& .MuiInput-arrow': {color: '#48a6cd'},
        fontSize: '12px'
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        fontSize: '16px'   
    }

    const textStyle = {
        '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#48a6cd', borderWidth: '1px'  }},
        fontSize: '12px',
        marginBottom: '10px',
        minWidth: '200px'
    }

    const checkStyle = {
        color: '#332c7b',
        '&.Mui-checked': {
            color: '#48a6cd',
        }
    }

    if (!user) {
        return (<p>Loading...</p>)
    }

    else {
        return (
            <div className="container">
                <Stack direction='column' sx={{ margin: '0px', justifyContent: 'center' }}>
                    <h2 style={{ margin: '20px 0px'}}>Profile Settings</h2>
                    <Stack direction='row' >
                        {/* Contact Info */}
                        <Stack direction='column' className="contractor-contact" sx={containerStyle}>
                            <h3 style={{textAlign: 'center' }}>Contact Information</h3>
                            <Tooltip title="Click icon to change status" placement='top'>
                                <p><Checkbox sx={checkStyle} disableRipple 
                                    icon={<NoAccountsIcon />} 
                                    checkedIcon={<AccountCircleIcon />} 
                                    checked={availability} 
                                    onClick={() => setAvailability(!availability)}/> 
                                    {availability ? <span>Availabile for work</span> : <span>Not available</span>}
                                </p>
                            </Tooltip>
                            <TextField sx={textStyle} label="Name" value={name} size="small" 
                                onChange={(e) => setName(e.target.value)} />
                            <br />
                            <TextField sx={textStyle} label="LinkedIn" value={linkedIn} size="small"
                                onChange={(e) => setLinkedIn(e.target.value)} />
                            <br />
                            <TextField sx={textStyle} label="Email" value={email} size="small"
                                onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <TextField sx={textStyle} label="Phone" value={phone} size="small"
                                onChange={(e) => setPhone(e.target.value)} />
                            <br />
                            <TextField sx={textStyle} label="Location" value={location} size="small"
                                onChange={(e) => setLocation(e.target.value)} />
                            <br />
                            <TextField sx={textStyle} value={timezone} size="small" select defaultValue={user.timezone}
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
                            <br />
                            <Button variant='contained' sx={buttonStyle} onClick={() => saveUser()}>Save</Button>
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
                                            <IconButton onClick={() => deleteLanguage(language)}
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
                                <Stack direction='row' sx={{justifyContent: 'end'}}>
                                    <Stack direction='row'>
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
                                                        value={language}>
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
                                                        maxHeight: 280
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
                                                        value={language}>
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
                                            <IconButton onClick={() => deleteSkill(skill)}
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
                                <br /><br />
                                <Stack direction='row' sx={{justifyContent: 'end'}}>
                                    <TextField sx={selectStyle} select size="small" variant="standard"
                                        value={skill} onChange={(e) => setSkill(e.target.value)} 
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
                                        {skillList.map(skill => {
                                            return (
                                                <MenuItem 
                                                    key={skill.id} 
                                                    value={skill}>
                                                        {skill.type}
                                                </MenuItem>
                                            );
                                        })} 
                                    </TextField>
            
                                    <IconButton onClick={() => addSkill(skill)}
                                            disableElevation
                                            disableRipple
                                            size="small"
                                            sx={{justifySelf: 'end'}}>
                                            <Tooltip title="Add skill">
                                                <AddIcon sx={{ 
                                                    fontSize: '20px',
                                                    stroke: '#48a6cd',
                                                    strokeWidth: 1.5
                                                }} />   
                                            </Tooltip>
                                    </IconButton>
                                </Stack>
                            </Box>  
                                                
                            <p style={{margin: '0px 0px 0px 20px'}}>Services</p>
                            <Box sx={boxStyle}>
                                {services != undefined ? 
                                    services.map((service) => {
                                        return (
                                            <span style={listStyle}>{service.service_type} 
                                            <IconButton onClick={() => deleteService(service)}
                                                disableElevation
                                                disableRipple
                                                size="small">
                                                <Tooltip title="Remove service">
                                                    <ClearIcon sx={{fontSize: '12px'}} />   
                                                </Tooltip>
                                            </IconButton></span>
                                        )
                                    })
                                :
                                    <br />
                                }
                                <br /><br />
                                <Stack direction='row' sx={{justifyContent: 'end'}}>
                                    <TextField sx={selectStyle} select size="small" variant="standard"
                                        value={service} onChange={(e) => setService(e.target.value)} 
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
                                        {serviceList.map(service => {
                                            return (
                                                <MenuItem 
                                                    key={service.id} 
                                                    value={service}>
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
                                            <AddIcon sx={{ 
                                                fontSize: '20px',
                                                stroke: '#48a6cd',
                                                strokeWidth: 1.5
                                            }} />    
                                        </Tooltip>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </Stack> 
                        <Box sx={containerStyle}>
                            <Stack direction='column' className="contractor-rates">
                                <h3 style={{textAlign: 'center' }}>Rates</h3>
                                <p>Written</p>
                                <TextField sx={textStyle} label="Written rate" value={writtenRate} size="small"
                                    onChange={(e) => setWrittenRate(e.target.value)} 
                                    InputProps={{
                                        startAdornment: <InputAdornment sx={{margin: '2px'}} position="start">$</InputAdornment>,
                                        endAdornment: <InputAdornment sx={{margin: '2px'}} position="end">per word</InputAdornment>
                                    }}/>
                                <p>Audio / Video</p>
                                <TextField sx={textStyle} label="Audio/Video rate" value={minuteRate} size="small"
                                    onChange={(e) => setMinuteRate(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment sx={{margin: '2px'}} position="start">$</InputAdornment>,
                                        endAdornment: <InputAdornment sx={{margin: '2px'}} position="end">per minute</InputAdornment>
                                    }} /> 
                            </Stack>  
                        </Box> 
                    </Stack>
                </Stack>
            </div>
        );
    }
};

export default ContractorProfileSettings;