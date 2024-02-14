import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ContractorProjectDetails.css";

function ContractorProjectDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    // const user = useSelector(store => store.user);
    // const project = useSelector(store => store.project);
    // Dummy data
    const user = {id: 3};
    const project = {
        client: 'Client Name', 
        description: 'Description of project goes here.', 
        deadline: 'dd/mm/yyyy', 
        type: 'text/audio/video', 
        length: '# of words', 
        quote: '$$$$$', 
        languages: 'Language 1 --> Language 2', 
        translator: 'Translator 1',
        translatorId: 3, 
        proofreader: 'Proofreader 2',
        proofreaderId: 4,
        translatorStatus: 'not started',
        proofreaderStatus: 'not started',
        notes: 'These are the notes'
    }
    const [notes, setNotes] = useState(project.notes);
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
        if (user.id === project.translatorId) {
            // Set translator status to 'in progress'
            if (status.translator === 'not started') {
                project.translatorStatus = 'in progress';
                setButtonStatus();
            }
            // Set translator status to 'complete'
            else if (status.translator === 'in progress') {
                project.translatorStatus = 'complete';
                setButtonStatus();
                // TODO: This is where to integrate email notifications if we get to it
            }
            dispatch({ type: 'UPDATE_TRANSLATOR_STATUS', payload: project.translatorStatus });
        }
        else if ((user.id === project.proofreaderId) && (status.translator === 'complete')) {
            // Set proofreader status to 'in progress'
            if (status.proofreader === 'not started') {
                project.proofreaderStatus = 'in progress';
                setButtonStatus();
            }
            // Set proofreader status to 'complete'
            else if (status.proofreader === 'in progress') {
                project.proofreaderStatus = 'complete';
                setButtonStatus();
                // TODO: This is where to integrate email notifications if we get to it
            }
            dispatch({ type: 'UPDATE_PROOFREADER_STATUS', payload: project.proofreaderStatus });
        }
    }

    // Sets submit button's status
    // TODO: Change ('Complete') etc. to (t('buttonKey')) for i18n
    const setButtonStatus = () => {
        // Sets status for translator
        if (user.id === project.translatorId) {
            if (project.translatorStatus === 'not started') {
                setStatus('Send to proofreader'); 
            }
            else if (project.translatorStatus === 'in progress') {
                setStatus('Complete');
            }
            else if (project.translatorStatus === 'complete') {
                setStatus('Complete');
            }
        }
        // Sets status for proofreader
        else if (user.id === project.proofreaderId) {
            if (project.translatorStatus === 'complete') {
                if (project.proofreaderStatus === 'not started') {
                    setStatus('Send to admin');
                }
                else if (project.proofreaderStatus === 'in progress') {
                    setStatus('Complete');
                }
                else if (project.proofreaderStatus === 'complete') {
                    setStatus('Complete');
                }
            }
            else {
                // Button is disabled until translator is done
                setStatus('Translation still in progress'); 
            }
        }
        console.log('user:', user.id, 'translator:', project.translatorId, project.translatorStatus, 
        'proofreader:', project.proofreaderId, project.proofreaderStatus);
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
                <p>{project.client}</p>
                <p>{project.description}</p>
                {/* column two */}
                <p>{project.deadline}</p>
                <p>{project.type}</p>
                <p>{project.length}</p>
                <p>{project.quote}</p>
                <p>{project.languages}</p>
                <p>{project.translator}</p>
                <p>{project.proofreader}</p>
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
                    <button onClick={() => handleStatusChange({translator: project.translatorStatus, proofreader: project.proofreaderStatus})}>{buttonStatus}</button>
                }
            </div>
        </div>
    );
};

export default ContractorProjectDetails;