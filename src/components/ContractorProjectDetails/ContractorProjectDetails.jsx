import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProjectDetails.css";

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
        dispatch({ type: 'SET_FLAGGED_STATUS', payload: [bool, params.id]})
    }

    // Updates the project's notes on the DOM and in the database
    const updateNotes = (text) => {
        setNotes(text);
        dispatch({ type: 'SET_PROJECT_NOTES', payload: [text, params.id]})
    }

    // Updates the project status and the button text
    const handleStatusChange = (status) => {
        if (user.id === project.translator_id) {
            // Set translator status to 'in progress'
            if (status.translator === 'not started') {
                project.status = 'translator-in progress';
                setButtonStatus();
            }
            // Set translator status to 'complete'
            else if (status.translator === 'translator-in progress') {
                project.status = 'translator-complete';
                setButtonStatus();
                // TODO: This is where to integrate email notifications if we get to it
            }
            dispatch({ type: 'UPDATE_TRANSLATOR_STATUS', payload: project.translator_status });
        }
        else if ((user.id === project.proofreader_id) && (status.translator === 'complete')) {
            // Set proofreader status to 'in progress'
            if (status.proofreader === 'not started') {
                project.status = 'proofreader-in progress';
                setButtonStatus();
            }
            // Set proofreader status to 'complete'
            else if (status.proofreader === 'in progress') {
                project.status = 'proofreader-complete';
                setButtonStatus();
                // TODO: This is where to integrate email notifications if we get to it
            }
            dispatch({ type: 'UPDATE_STATUS', payload: project.status });
        }
    }

    // Sets submit button's status
    // TODO: Change ('Complete') etc. to (t('buttonKey')) for i18n
    const setButtonStatus = () => {
        // Sets status for translator
        if (user.id === project.translator_id) {
            if (project.translator_status === 'not started') {
                setStatus('Send to proofreader'); 
            }
            else if (project.translator_status === 'in progress') {
                setStatus('Complete');
            }
            else if (project.translator_status === 'complete') {
                setStatus('Complete');
            }
        }
        // Sets status for proofreader
        else if (user.id === project.proofreader_id) {
            if (project.translator_status === 'complete') {
                if (project.proofreader_status === 'not started') {
                    setStatus('Send to admin');
                }
                else if (project.proofreader_status === 'in progress') {
                    setStatus('Complete');
                }
                else if (project.proofreader_status === 'complete') {
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


    useEffect(() => {
        setButtonStatus();
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);

    return (
        <div className="container">
            <h2>Project Details</h2>
            <div className="contractor-details">
                <h3>Details</h3>
                {/* column one */}
                <p>{project.client_name}</p>
                <p>{project.description}</p>
                {/* column two */}
                <p>{project.deadline}</p>
                <p>{project.service_type}</p>
                <p>{project.duration}</p>
                <p>{project.from_language_name}--{project.to_language_name}</p>
                <p>{project.translator_name}</p>
                <p>{project.proofreader_name}</p>
            </div>

            <div className="contractor-settings">
                <h3>Settings</h3>
                <p>Flag notes?</p>
                <input type="checkbox" checked={flagged} onChange={() => updateFlagged(!flagged)}/>
                <p>Notes</p>
                {((buttonStatus === 'Complete') || 
                (buttonStatus === 'Translation still in progress')) ?
                    // Makes notes uneditable if the user's work is complete or not ready
                    <input type="text" value={notes} disabled />
                :
                    // Makes notes editable
                    <input type="text" value={notes} onChange={(e) => updateNotes(e.target.value)} />
                }
                {/* need to add an alert before submitting */}
                {((buttonStatus === 'Complete') || 
                (buttonStatus === 'Translation still in progress')) ? 
                    // Makes button unclickable if user's work is complete or not ready
                    <button disabled>{buttonStatus}</button> 
                :
                    // Submits status change and updates button text/function
                    <button onClick={() => handleStatusChange({translator_status: project.translator_status, proofreader_status: project.proofreader_status})}>{buttonStatus}</button>
                }
            </div>
        </div>
    );
};

export default ContractorProjectDetails;