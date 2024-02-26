import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProjectDetails.css";
import { Box, Stack, IconButton, Tooltip }  from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

function ContractorProjectDetails() {
    const dispatch = useDispatch();
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
        dispatch({ type: 'ADD_PROJECT_NOTE', payload: [text, params.id]})
    }

    // Updates the project status and the button text
    const handleStatusChange = (status) => {
        console.log(status);
        if (user.id === project.translator_id) {
            // Set translator status to 'in progress'
            if (status.translator === 'Not started') {
                project.translator_status = 'In progress';
            }
            // Set translator status to 'complete'
            else if (status.translator === 'In progress') {
                project.translator_status = 'Complete';
                // TODO: This is where to integrate email notifications if we get to it
            }
            setButtonStatus();
            dispatch({ type: 'UPDATE_TRANSLATOR_STATUS', payload: [project.translator_status, params.id] });
        }
        else if ((user.id === project.proofreader_id) && (status.translator === 'complete')) {
            // Set proofreader status to 'in progress'
            if (status.proofreader === 'Not started') {
                project.proofreader_status = 'In progress';
            }
            // Set proofreader status to 'complete'
            else if (status.proofreader === 'in progress') {
                project.proofreader_status = 'Complete';
                // TODO: This is where to integrate email notifications if we get to it
            }
            setButtonStatus();
            dispatch({ type: 'UPDATE_PROOFREADER_STATUS', payload: [project.proofreader_status, params.id] });
        }
        console.log(buttonStatus);
    }

    // Sets submit button's status
    // TODO: Change ('Complete') etc. to (t('buttonKey')) for i18n
    const setButtonStatus = () => {
        // Sets status for translator
        if (user.id === project.translator_id) {
            if (project.translator_status === 'Not started') {
                setStatus('Start project'); 
            }
            else if (project.translator_status === 'In progress') {
                setStatus('Send to proofreader');
            }
            else if (project.translator_status === 'Complete') {
                setStatus('Complete');
            }
        }
        // Sets status for proofreader
        else if (user.id === project.proofreader_id) {
            if (project.translator_status === 'Complete') {
                if (project.proofreader_status === 'Not started') {
                    setStatus('Send to admin');
                }
                else if (project.proofreader_status === 'In progress') {
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
        console.log('user:', user.id, 'translator:', project.translator_id, project.translator_status, 
        'proofreader:', project.proofreader_id, project.proofreader_status);
    }

    const containerStyle = {
        border: '1px solid #332c7b', 
        borderRadius: '10px', 
        backgroundColor: 'white',
        padding: '20px',
        margin: '0px 30px',
        maxWidth: '40%'
    }

    const viewFile = (projectId) => {
        
    }

    useEffect(() => {
        setButtonStatus();
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);

    return (
        <div className="container">
            <h2>Project Details</h2>
            <Stack direction='row'>
                <Box sx={containerStyle} className="contractor-details">
                    <h3>Details</h3>
                    <Stack direction='row' sx={{justifyContent: 'space-between', margin: '0px 50px'}}>
                        <Stack direction='column'>
                        <p>Client: {project.client_name}</p>
                        <p>Project description: {project.description}</p>
                        <p>View file: 
                            <IconButton onClick={() => viewFile(project.id)}
                                disableElevation
                                disableRipple
                                size="small">
                                <Tooltip title="Link">
                                    <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                </Tooltip>
                            </IconButton></p>

                        </Stack>
                        <Stack direction='column'>
                        <p>Deadline: {project.due_at}</p>
                        <p>Service type: {project.service_type}</p>
                        <p>Project length: {project.duration}</p>
                        <p>Languages: {project.from_language_name}→{project.to_language_name}</p>
                        <p>Translator: {project.translator_name}</p>
                        <p>Proofreader: {project.proofreader_name}</p>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={containerStyle} className="contractor-settings">
                    <h3>Settings</h3>
                    <Stack direction='column'>
                        <p>Flag notes? <input type="checkbox" checked={flagged} onChange={() => updateFlagged(!flagged)}/></p>
                        <p>Notes</p>
                        {((buttonStatus === 'Complete') || 
                        (buttonStatus === 'Translation still in progress')) ?
                            // Makes notes uneditable if the user's work is complete or not ready
                            <input type="text" value={notes} disabled />
                        :
                            // Makes notes editable
                            <input type="text" value={notes} onChange={(e) => updateNotes(e.target.value)} />
                        }
                        <br />
                        {/* need to add an alert before submitting */}
                        {((buttonStatus === 'Complete') || 
                        (buttonStatus === 'Translation still in progress')) ? 
                            // Makes button unclickable if user's work is complete or not ready
                            <button disabled>{buttonStatus}</button> 
                        :
                            // Submits status change and updates button text/function
                            <button onClick={() => handleStatusChange({translator: project.translator_status, proofreader: project.proofreader_status})}>{buttonStatus}</button>
                        }
                    </Stack>
                </Box>
            </Stack>
        </div>
    );
};

export default ContractorProjectDetails;