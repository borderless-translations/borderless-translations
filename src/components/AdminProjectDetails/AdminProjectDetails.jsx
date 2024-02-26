import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Select, MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box } from '@mui/material';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';
import { DateTime } from 'luxon';
import {TableContainer, Table, TableCell, TableBody, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';


function AdminProjectDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const project = useSelector(store => store.project);

    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);


    const[modalOpen, setModalOpen] = useState(false);
    const[projectToEdit, setProjectToEdit] = useState(null);

    const handleEditProject = (project) => {
        setProjectToEdit(project);
        setModalOpen(true);
    }




    return(
        <div className="container"> 
            <h2 style={{ margin: '20px 50px'}}>Admin Project Details</h2>

            <Stack direction='row' sx={{ margin: '0px 100px', justifyContent: 'center' }}></Stack>
            <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead>
                    <TableRow sx={{"& th": {color: "white", fontWeight: 700, backgroundColor: "#332c7b"}}}>
                        <TableCell align="center">Client Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Due By</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Translator Status</TableCell>
                        <TableCell align="center">Proofreader Status</TableCell>
                        <TableCell align="center">From Language</TableCell>
                        <TableCell align="center">To Language</TableCell>
                        <TableCell align="center">Service Notes</TableCell>
                        <TableCell align="center">File Link</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableCell align="center">{project.client_name}</TableCell>
                        <TableCell align="center">{project.description}</TableCell>
                        <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                        <TableCell align="center">{project.status}</TableCell>
                        <TableCell align="center">{project.translator_name}<br/>{project.translator_status}</TableCell>
                        <TableCell align="center">{project.proofreader_name}<br/>{project.proofreader_status}</TableCell>
                        <TableCell align="center">{project.from_language_name}</TableCell>
                        <TableCell align="center">{project.to_language_name}</TableCell>
                        <TableCell align="center">{project.service}</TableCell>
                        <TableCell align="center" sx={{width: '5%'}}><a href={project.file_link} target="_blank">{project.file_link}</a></TableCell>
                </TableBody>
              </Table>
            </TableContainer>
        

        {modalOpen && <AdminProjectModal closeModal={() => { setModalOpen(false), setProjectToEdit(null) }} defaultValues={project} />}


        <button  className='btn btn_sizeSm' onClick={() => history.push("/admin/project")}>Return to Project List</button><button onClick={() => handleEditProject(project)} className='btn btn_sizeSm' >Edit</button>

        </div>
    )
}

export default AdminProjectDetails;