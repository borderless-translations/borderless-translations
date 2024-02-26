import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Select, MenuItem, Stack, Tooltip, IconButton, Button, TextField, InputAdornment, Box } from '@mui/material';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';


function AdminProjectDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const project = useSelector(store => store.project);

    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
        dispatch({ type: "GET_ALL_CONTRACTORS" });
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
            <p>Client Name: {project.client_name}</p>
            <p>Description: {project.description}</p>
            <p>Due By: {project.due_at}</p>
            <p>Status: {project.status}</p>
            <p>Translator: {project.translator_name}</p>
            <p>Translator Status: {project.translator_status}</p>
            <p>Proofreader: {project.proofreader_name}</p>
            <p>Proofreader Status: {project.proofreader_status}</p>
            <p>From Language: {project.from_language_name}</p>
            <p>To Language: {project.to_language_name}</p>
            <p>Service Notes: {project.service}</p>
            <p>File Link:{project.file_link}</p>
            
        

        {modalOpen && <AdminProjectModal closeModal={() => { setModalOpen(false), setProjectToEdit(null) }} defaultValues={project} />}


        <button  className='btn btn_sizeSm' onClick={() => history.push("/admin/project")}>Return to Project List</button><button onClick={() => handleEditProject(project)} className='btn btn_sizeSm' >Edit</button>

        </div>
    )
}

export default AdminProjectDetails;