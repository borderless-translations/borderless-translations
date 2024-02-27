import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AdminClientModal from '../AdminClientModal/AdminClientModal';
import "./AdminClientDetails.css";
import { Stack, Box, Button, TableContainer, TableCell, Table, TableHead, TableBody, TableRow, Paper} from '@mui/material';
import { DateTime } from 'luxon';




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

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        fontSize: '14px',
        marginBottom: '10px'
    }

    const boxStyle = {
        border: '2px solid #332c7b', 
        borderRadius: '5px', 
        backgroundColor: 'white',
        padding: '20px 50px',
        width: 'auto',
        fontSize: '1em',
    }

    return (
        <div>
            <div className="container">
                <h2 style={{ margin: '20px 0px'}}>Admin Client Details</h2>
                <Box sx={boxStyle}>
                    <p>Business: {client.client}</p>
                    <p>Contact: {client.contact}</p>
                    <p>Country: {client.country}</p>
                    <p>Location: {client.location}</p>
                    <p>Time Zone: {client.timezone}</p>
                    <p>Email: {client.email}</p>
                    <p>Phone: {client.phone}</p>
                    <p>Client Notes: {client.client_notes}</p>
                    <Button className='btn btn_sizeSm' sx={buttonStyle} variant='contained' disableRipple
                    onClick={() => handleEditClient(client)}>Edit Client</Button>
                </Box>

                <h3 style={{color: 'black'}}>Projects</h3>

                <div>
                    {sortedProjects.map(project => (
                        <div key={project.status }>
                            <h4 style={{color: '#332c7b'}}>{project.status}</h4>
                         <TableContainer component={Paper}>
                            <Table aria-label="simple table" sx={{ border: '2px solid #332c7b' }}>
                                <TableHead>
                                     <TableRow sx={{"& th": {color: "white", fontWeight: 700, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>   
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
                                            <TableCell align="left">{project.description}</TableCell>
                                            <TableCell align="center">{DateTime.fromISO(project.created_at).toFormat('DDD')}</TableCell>
                                            <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
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
                <br />                            
                <Button className='btn btn_sizeSm' sx={buttonStyle} variant='contained' disableRipple
                    onClick={() => history.push("/admin/client")}>Return to Client List</Button>

                {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false), setClientToEdit(null) }} defaultValues={client} />}

            </div>
        </div>
    );
};

export default AdminClientDetails;