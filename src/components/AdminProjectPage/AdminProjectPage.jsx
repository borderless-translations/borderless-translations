import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Tooltip } from '@mui/material';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';

function AdminProjectPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const projects = useSelector(store => store.allProjects);
    const clients = useSelector(store => store.allClients);

    const toProject = (id) => {
        const action = { type: 'GET_ALL_PROJECTS', payload: id };
        dispatch(action);
        setTimeout(() => {
            history.push(`/project/details/${id}`);
        }, 500);
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        }
    }
   
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
                                <TableCell align="center">Due Date</TableCell>
                                <TableCell align="center">Translator Status</TableCell>
                                <TableCell align="center">Proofreader Status</TableCell>
                                <TableCell align="center">Project Scope</TableCell>
                                <TableCell align="center">View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(project => (
                                <TableRow key={project.project_id}  sx={tableRowStyle}>
                                    <TableCell component="th" scope="row" align="center">{project.client_name}</TableCell>
                                    <TableCell align="center">{project.project_description}</TableCell>
                                    <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                                    <TableCell align="center">{project.translator_name}<br/>{project.translator_status}</TableCell>
                                    <TableCell align="center">{project.proofreader_name}<br/>{project.proofreader_status}</TableCell>
                                    <TableCell align="center">{project.duration}</TableCell>
                                    <TableCell align="center">
                                    <IconButton onClick={() => toProject(project.project_id)}
                                        disableElevation
                                        disableRipple
                                        size="small"
                                        sx={buttonStyle}
                                        >
                                        <Tooltip title="View project details">
                                            <VisibilityIcon />
                                        </Tooltip>
                                    </IconButton>
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