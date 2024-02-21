import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Paper, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';




function AdminProjectPage(){

    const dispatch = useDispatch();
    const history = useHistory();

    const projects = [
        {id: 1, name: "Prime Digital Academy", description: "Translating a vimeo video on how sagas and reducers work in...", due_at: "03/15/24", status: "In Progress", translator_status: "Complete", proofreader_status: "In Progress", flagged: ""},
        {id: 2, name: "Sky Sports", description: "Translating a commercial for a premier league team that will air...", due_at: "04/30/24", status: "In Progress", translator_status: "In Progress", proofreader_status: "Not Started", flagged: ""},
        {id: 3, name: "Mayo Clinic", description: "Translating a documentary about a new breakthrough vaccine for...", due_at: "09/30/24", status: "Not Started", translator_status: "Not Started", proofreader_status:"Not Started", flagged: ""},
    ]

    // const projects = useSelector(store => store.allProjects);

    // const segments = [
    //     {id: 1, segmentName: "Conditionals", translator: "Brock Nelson", status: "Available", proofreader: }
    // ]
    useEffect(() => {
        dispatch({ type: 'GET_ALL_PROJECTS' })       
      }, []);


      const [modalOpen, setModalOpen] = useState(false);

      const handleAddProject = () => {
        setModalOpen(true)
      }

    const [projectToEdit, setProjectToEdit] = useState(null); 

      const handleEditProject = (project) => {
        setModalOpen(true)
        setProjectToEdit(project)
      }

    return(
        <>
        <div>
            <h2>Admin Project Main</h2>
            <button onClick={() => handleAddProject()}>Add Project</button>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Due By</td>
                        <td>Status</td>
                        <td>Translator Status</td>
                        <td>Proofreader Status</td>
                        <td>Flagged</td>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => {
                        return (
                            <tr key={project.id}>
                                <td>
                                    <Link to={`/project/details/${project.id}`}>{project.name}</Link>
                                </td>
                                <td>{project.description}</td>
                                <td>{project.due_at}</td>
                                <td>{project.status}</td>
                                <td>{project.translator_status}</td>
                                <td>{project.proofreader_status}</td>
                                <td>{project.flagged}</td>
                                <button onClick={() => handleEditProject(project)}>Edit Project</button>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {modalOpen && <AdminProjectModal closeModal={() => { setModalOpen(false), setProjectToEdit(null)}} defaultValues={projectToEdit} />}
        </div>
        </>
    )  
}





export default AdminProjectPage;