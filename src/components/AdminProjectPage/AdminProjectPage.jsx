import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { Card, CardContent, Typography, Paper, Grid, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';

function AdminProjectPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    // const projects = [
    //     {id: 1, name: "Prime Digital Academy", description: "Translating a vimeo video on how sagas and reducers work in...", due_at: "03/15/24", status: "In Progress", translator_status: "Complete", proofreader_status: "In Progress", flagged: ""},
    //     {id: 2, name: "Sky Sports", description: "Translating a commercial for a premier league team that will air...", due_at: "04/30/24", status: "In Progress", translator_status: "In Progress", proofreader_status: "Not Started", flagged: ""},
    //     {id: 3, name: "Mayo Clinic", description: "Translating a documentary about a new breakthrough vaccine for...", due_at: "09/30/24", status: "Not Started", translator_status: "Not Started", proofreader_status:"Not Started", flagged: ""},
    // ]
    const projects = useSelector(store => store.allProjects);
    const clients = useSelector(store => store.allClients)
    // const segments = [
    //     {id: 1, segmentName: "Conditionals", translator: "Brock Nelson", status: "Available", proofreader: }
    // ]
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        dispatch({ type: 'GET_ALL_PROJECTS' });
        dispatch({ type: 'GET_ALL_CLIENTS' });
    }, [modalOpen]);

    const handleAddProject = () => {
        setModalOpen(true)
    }

    const [projectToEdit, setProjectToEdit] = useState(null);

    const handleEditProject = (project) => {
        setModalOpen(true)
        setProjectToEdit(project)
    }
    const tableRowStyle = {
        '&:nth-of-type(odd)': { backgroundColor: "white" },
        '&:nth-of-type(even)': { backgroundColor: "#e3fbfb" }
    }

    return (
        <>
            <div>
                <h2>Admin Project Main</h2>
                <button className='btn btn_sizeSm' onClick={() => handleAddProject()}>Add Project</button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{"& th": {color: "white", fontWeight: 700, backgroundColor: "#332c7b"}}}>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Due By</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Translator Status</TableCell>
                                <TableCell align="center">Proofreader Status</TableCell>
                                <TableCell align="center">Project Scope</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(project => (
                                <TableRow key={project.project_id}  sx={tableRowStyle}>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/project/details/${project.id}`}>{project.client_name}</Link>
                                    </TableCell>
                                    <TableCell align="center">{project.project_description}</TableCell>
                                    <TableCell align="center">{project.due_at}</TableCell>
                                    <TableCell align="center">{project.project_status}</TableCell>
                                    <TableCell align="center">{project.translator_status}</TableCell>
                                    <TableCell align="center">{project.proofreader_status}</TableCell>
                                    <TableCell align="center">{project.duration}</TableCell>
                                    <TableCell align="center">
                                        <button className='btn btn_sizeSm' onClick={() => handleEditProject(project)}>Edit Project</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {modalOpen && <AdminProjectModal closeModal={() => { setModalOpen(false); setProjectToEdit(null); }} defaultValues={projectToEdit} />}
            </div>
        </>
    );
}

export default AdminProjectPage;