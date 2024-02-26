import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AdminClientModal from '../AdminClientModal/AdminClientModal';
import "./AdminClientDetails.css";
import { Select, MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box } from '@mui/material';
import {TableContainer, TableCell, Table, TableHead, TableBody, TableRow, Paper} from '@mui/material';




function AdminClientDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        dispatch({ type: "GET_CLIENT", payload: { id: params.id } });
    }, [params.id]);

    useEffect(() => {
        dispatch({ type: "GET_CLIENT_PROJECTS", payload: { id: params.id } });
    }, [params.id]);


    // Make this functional and remove dummy data when database is functional
    const client = useSelector(store => store.client);
    const clientProjects = useSelector(store => store.clientProjects);

    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {
        const filteredProjects = [... new Set(clientProjects.map(project => project.status))];
        const sorted = filteredProjects.map(status => ({
            status,
            project: clientProjects.filter(project => project.status === status)
        }));
        setSortedProjects(sorted);
    }, [clientProjects])

    // Controls for operating the modal
    const [modalOpen, setModalOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null);

    const handleEditClient = (client) => {
        setClientToEdit(client);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="container">
                <h2 style={{ margin: '20px 50px'}}>Admin Client Details</h2>
                <Stack direction='row' sx={{ margin: '0px 100px', justifyContent: 'center' }}></Stack>
                <button  className='btn btn_sizeSm' onClick={() => handleEditClient(client)}>Edit Client</button>

                <p>Business: {client.client}</p>
                <p>Contact: {client.contact}</p>
                <p>Country: {client.country}</p>
                <p>Location: {client.location}</p>
                <p>Time Zone: {client.timezone}</p>
                <p>Email: {client.email}</p>
                <p>Phone: {client.phone}</p>
                <p>Client Notes: {client.client_notes}</p>

                <h3>Projects</h3>

                <div>
                    {sortedProjects.map(project => (
                        <div key={project.status }>
                            <h4>{project.status}</h4>
                         <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                     <TableRow>   
                                        <TableCell align="center">Project Description</TableCell>
                                        <TableCell align="center">Start Date</TableCell>
                                        <TableCell align="center">Due Date</TableCell>
                                        <TableCell align="center">Translator Status</TableCell>
                                        <TableCell align="center">Proofreader Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {project.project.map((project, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{project.description}</TableCell>
                                            <TableCell align="center">{project.created_at}</TableCell>
                                            <TableCell align="center">{project.due_at}</TableCell>
                                            <TableCell align="center">{project.translator_status}</TableCell>
                                            <TableCell align="center">{project.proofreader_status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                               
                            </Table>
                        </TableContainer>
                        </div>
                    ))}
                </div>

                <button className='btn btn_sizeSm' onClick={() => history.push("/admin/client")}>Return to Client List</button>

                {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false), setClientToEdit(null) }} defaultValues={client} />}

            </div>
        </div>
    );
};

export default AdminClientDetails;