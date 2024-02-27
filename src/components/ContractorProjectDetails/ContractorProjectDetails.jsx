import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import "./ContractorProjectDetails.css";
import { Box, Stack, IconButton, Tooltip, TextField, Button, Checkbox }  from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import WestIcon from '@mui/icons-material/West';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function ContractorProjectDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector(store => store.user);
    const project = useSelector(store => store.project);
    const [notes, setNotes] = useState(project.translator_notes);
    const [flagged, setFlagged] = useState(project.flagged);
    const [buttonStatus, setStatus] = useState('');

    // Updates the project's flagged status on the DOM and in the database
    const updateFlagged = (bool) => {
        setFlagged(bool);
        console.log(project);
        dispatch({ type: 'TOGGLE_PROJECT_FLAG', payload: [project.id]})
    }

    // Updates the project's notes on the DOM and in the database
    const updateNotes = (text) => {
        setNotes(text);
        dispatch({ type: 'ADD_PROJECT_NOTE', payload: [text, project.id]})
    }

    // Updates the project status and the button text
    const handleStatusChange = (status) => {
        Swal.fire({
            title: "You are about to change the project status",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#48a6cd",
            cancelButtonColor: "#332c7b",
            confirmButtonText: "Change Status",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (user.id === project.translator_id) {
                    // Set translator status to 'in progress'
                    if (status.translator === 'Not Started') {
                        project.translator_status = 'In Progress';
                    }
                    // Set translator status to 'complete'
                    else if (status.translator === 'In Progress') {
                        project.translator_status = 'Complete';
                        // TODO: This is where to integrate email notifications if we get to it
                    }
                    setButtonStatus();
                    dispatch({ type: 'UPDATE_TRANSLATOR_STATUS', payload: [project.translator_status, params.id] });
                }
                else if ((user.id === project.proofreader_id) && (status.translator === 'Complete')) {
                    // Set proofreader status to 'in progress'
                    if (status.proofreader === 'Not Started') {
                        project.proofreader_status = 'In Progress';
                    }
                    // Set proofreader status to 'complete'
                    else if (status.proofreader === 'in Progress') {
                        project.proofreader_status = 'Complete';
                        // TODO: This is where to integrate email notifications if we get to it
                    }
                    setButtonStatus();
                    dispatch({ type: 'UPDATE_PROOFREADER_STATUS', payload: [project.proofreader_status, params.id] });
                }
            }
        })
    }

    // Sets submit button's status
    // TODO: Change ('Complete') etc. to (t('buttonKey')) for i18n
    const setButtonStatus = () => {
        // Sets status for translator
        if (user.id === project.translator_id) {
            if (project.translator_status === 'Not Started') {
                setStatus('Start project'); 
            }
            else if (project.translator_status === 'In Progress') {
                setStatus('Send to proofreader');
            }
            else if (project.translator_status === 'Complete') {
                setStatus('Complete');
            }
        }
        // Sets status for proofreader
        else if (user.id === project.proofreader_id) {
            if (project.translator_status === 'Complete') {
                if (project.proofreader_status === 'Not Started') {
                    setStatus('Send to admin');
                }
                else if (project.proofreader_status === 'In Progress') {
                    setStatus('Complete');
                }
                else if (project.proofreader_status === 'Complete') {
                    setStatus('Complete');
                }
            }
            else {
                // Button is disabled until translator is done
                setStatus('Translation still in progress'); 
            }
        }
    }

    const containerStyle = {
        border: '2px solid #332c7b', 
        borderRadius: '10px', 
        backgroundColor: 'white',
        padding: '20px',
        maxWidth: '60%',
        minWidth: '45%',
        margin: '0px 30px 0px 0px'
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        }
    }

    const completeStyle = {
        backgroundColor: '#332c7b',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        }
    }

    const textStyle = {
        width: '100%', 
        '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#48a6cd', borderWidth: '2px'  }}
    }

    const checkStyle = {
        color: '#48a6cd',
        '&.Mui-checked': {
            color: '#332c7b',
        }
    }

    const viewFile = (projectId) => {
        setTimeout(() => {
            history.push(`/user/project/file/${projectId}`);
        }, 500);
    }

    const toLink = (link) => {
        window.open(`${link}`);
    }

    const toDashboard = () => {
        history.push('/dashboard');
    }

    useEffect(() => {
        setButtonStatus();
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);

    return (
        <div className="container">
            <Stack direction='column' sx={{margin: '0px 30px'}}>
                <h2>
                    <IconButton onClick={() => toDashboard()}
                        disableElevation
                        disableRipple
                        size="small">
                        <Tooltip title="Back">
                            <WestIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                        </Tooltip>
                    </IconButton>
                    Back to dashboard
                </h2>
                <Stack direction='row'>
                    <Box sx={containerStyle} className="contractor-details">
                        <h3 style={{textAlign: 'center'}}>Details</h3>
                        <Stack direction='row' sx={{justifyContent: 'space-between', margin: '0px 50px'}}>
                            <Stack direction='column'>
                            <p>Client: {project.client_name}</p>
                            <p>Project description: {project.description}</p>
                            {project.text_to_translate !== null && project.file_link !== null &&
                                <div>
                                    <p>View text file: 
                                        <IconButton onClick={() => viewFile(project.id)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Link">
                                                <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                            </Tooltip>
                                        </IconButton></p>
                                    <p>External link:
                                        <IconButton onClick={() => toLink(project.file_link)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Link">
                                                <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                            </Tooltip>
                                        </IconButton>
                                    </p>
                                </div>
                            }
                            {project.text_to_translate !== null && project.file_link === null &&
                                <p>View text file: 
                                <IconButton onClick={() => viewFile(project.id)}
                                    disableElevation
                                    disableRipple
                                    size="small">
                                    <Tooltip title="Link">
                                        <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                    </Tooltip>
                                </IconButton></p>
                            }
                            {project.text_to_translate === null && project.file_link !== null &&
                                <p>External link:
                                    <IconButton onClick={() => toLink(project.file_link)}
                                        disableElevation
                                        disableRipple
                                        size="small">
                                        <Tooltip title="Link">
                                            <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                        </Tooltip>
                                    </IconButton>
                                </p>
                            }

                            </Stack>
                            <Stack direction='column'>
                            <p>Deadline: {DateTime.fromISO(project.due_at).toFormat('DDD')}</p>
                            <p>Service type: {project.service_type}</p>
                            <p>Project length: {project.duration}</p>
                            <p>Languages: {project.from_language_name}→{project.to_language_name}</p>
                            <p>Translator: {project.translator_name}</p>
                            <p>Proofreader: {project.proofreader_name}</p>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box sx={containerStyle} className="contractor-settings">
                        <h3 style={{textAlign: 'center'}}>Settings</h3>
                        <Stack direction='column' sx={{ margin: '0px 50px'}}>
                        <Tooltip title="Click icon to change status" placement='top-start'>
                            <p><Checkbox sx={checkStyle} disableRipple 
                                icon={<RadioButtonUncheckedIcon />} 
                                checkedIcon={<ErrorOutlineIcon />} 
                                checked={flagged} 
                                onClick={() => updateFlagged(!flagged)}/> 
                                {flagged ? <span>Flagged</span> : <span>Not flagged</span>}
                            </p>
                        </Tooltip>
                            <p>Notes</p>
                            {((buttonStatus === 'Complete') || 
                            (buttonStatus === 'Translation still in progress')) ?
                                // Makes notes uneditable if the user's work is complete or not ready
                                <TextField sx={textStyle} multiline value={notes} disabled />
                            :
                                // Makes notes editable
                                <TextField sx={textStyle} multiline value={notes} 
                                    onChange={(e) => updateNotes(e.target.value)} />
                            }
                            <br />
                            {/* need to add an alert before submitting */}
                            {((buttonStatus === 'Complete') || 
                            (buttonStatus === 'Translation still in progress')) ? 
                                // Makes button unclickable if user's work is complete or not ready
                                <Button sx={completeStyle} disabled variant='contained'>{buttonStatus}</Button> 
                            :
                                // Submits status change and updates button text/function
                                <Button sx={buttonStyle} variant='contained'
                                    onClick={() => handleStatusChange({translator: project.translator_status, proofreader: project.proofreader_status})}>
                                    {buttonStatus}
                                </Button>
                            }
                        </Stack>
                    </Box>
                </Stack>    
            </Stack>
        </div>
    );
};

export default ContractorProjectDetails;