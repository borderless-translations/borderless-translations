import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Select, MenuItem, TextField, FormControl, InputLabel} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AdminProjectModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

    let [project, setProject] = useState(defaultValues || { admin_id: "", client_id: "", description: "", duration: "", due_at: "", project_id: "", from_language_id: "", to_language_id: "", service_id: "" });

    const handleChangeFor = (key, value) => {
        setProject({ ...project, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'CREATE_NEW_PROJECT', payload: project });
            console.log("Sent project information to server");
        } else {
            dispatch({ type: "UPDATE_PROJECT", payload: project });
            console.log("Updated project information on server", project);
        }
        setProject({ admin_id: "", client_id: "", description: "", duration: "", due_at: null, project_id: "", from_language_id: "", to_language_id: "", service_id: "" });
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
                        <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                            <InputLabel id="client-select-label">Client</InputLabel>
                            <Select
                                labelId="client-select-label"
                                label="Client"
                                value={project.client_id}
                                onChange={(event) => handleChangeFor("client_id", event.target.value)}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {clients.map((client) => {
                                    return (
                                        <MenuItem key={client.id} value={client.id}>{client.client}</MenuItem>
                                    )
                                })};
                            </Select>
                        </FormControl>
                        <TextField
                            label="Project Name"
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>   
                        <DatePicker
                            label="Due Date"
                            value={project.due_at}
                            onChange={(event) => handleChangeFor("due_at", event.target.value)}
                        />
                        </LocalizationProvider>
                        <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                            <InputLabel id="select-from-language">From Language</InputLabel>
                            <Select
                                labelId="select-from-language"
                                label="From Language"
                                value={project.from_language_id}
                                onChange={(event) => handleChangeFor("from_language_id", event.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {languages.map((language) => {
                                    return (
                                        <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                            <InputLabel id="select-to-language">To Language</InputLabel>
                            <Select
                                labelId="select-to-language"
                                label="To Language"
                                value={project.to_language_id}
                                onChange={(event) => handleChangeFor("to_language_id", event.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {languages.map((language) => {
                                    return (
                                        <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
                                    )
                                })};

                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '400px', margin: '20px 0' }}>
                            <InputLabel id="service-select-label">Service</InputLabel>
                            <Select
                                labelId="service-select-label"
                                label="Service"
                                value={project.service_id}
                                onChange={(event) => handleChangeFor("service_id", event.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {services.map((service) => {
                                    return (
                                        <MenuItem key={service.id} value={service.id}>{service.type}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <button className='btn btn_sizeSm' type="submit">Save</button>
                    </Stack>
                </form>

            </div>
        </div >
    );
};


export default AdminProjectModal;