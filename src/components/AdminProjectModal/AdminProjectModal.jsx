import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Button, TextField } from '@mui/material';


function AdminProjectModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

    let [project, setProject] = useState(defaultValues || { admin_id: "", client_id: "", description: "", duration: "", due_at: "", project_id: "", from_language_id: "", to_language_id: "", service_id: ""});

    const handleChangeFor = (key, value) => {
        setProject({ ...project, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'CREATE_NEW_PROJECT', payload: project });
            console.log("Sent client information to server");
        } else {
            dispatch({ type: "UPDATE_PROJECT", payload: project });
            console.log("Updated client information on server", project);
        }
        setProject({ admin_id: "", client_id: "", description: "", duration: "", due_at: "", project_id: "", from_language_id: "", to_language_id: "", service_id: ""});
        closeModal();
    };

    useEffect(() => {
        dispatch({ type: 'GET_ALL_CLIENTS' });
        dispatch({ type: 'GET_ALL_LANGUAGES' });
        dispatch({ type: 'GET_ALL_SERVICES' });
    }, []);

    const clients = useSelector(store => store.allClients);
    const languages = useSelector(store => store.allLanguages);
    const services = useSelector(store => store.allServices);

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" justifyContent="flex-end">
                        <TextField
                            label="Client"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.client_id}
                            onChange={(event) => handleChangeFor("client_id", event.target.value)}
                        />
                        <TextField
                            label="Description"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.description}
                            onChange={(event) => handleChangeFor("description", event.target.value)}
                        />
                        <TextField
                            label="duration"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.duration}
                            onChange={(event) => handleChangeFor("duration", event.target.value)}
                        />
                        <TextField
                            label="due_at"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.due_at}
                            onChange={(event) => handleChangeFor("due_at", event.target.value)}
                        />
                        <TextField
                            label="project_id"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.project_id}
                            onChange={(event) => handleChangeFor("project_id", event.target.value)}
                        />
                        <TextField
                            label="from_language_id"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.from_language_id}
                            onChange={(event) => handleChangeFor("from_language_id", event.target.value)}
                        />
                        <TextField
                            label="to_language_id"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.to_language_id}
                            onChange={(event) => handleChangeFor("to_language_id", event.target.value)}
                        />
                    
                        <TextField
                            label="service_id"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={project.service_id}
                            onChange={(event) => handleChangeFor("service_id", event.target.value)}
                        />
                    
                    <button className='btn btn_sizeSm' type="submit">Save</button>
                    </Stack>
                </form>
                
            </div>
        </div>
    );
};


export default AdminProjectModal;