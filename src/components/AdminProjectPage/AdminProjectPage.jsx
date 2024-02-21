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
        {id: 1, name: "Prime Academy", description: "Programming", duration: "Video", created_at: "Closed Captions", due_at: "Signed"},
        {id: 2, name: "Sky Sports", description: "Sports - Rugby", duration: "Documentary", created_at: "Subtitles", due_at: "Not Signed"},
        {id: 3, name: "Mayo Clinic", description: "Science - Medical", duration: "Video", created_at: "Closed Captions", due_at: "Signed"},
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
                        <td>Duration</td>
                        <td>Created At</td>
                        <td>Due At</td>
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
                                <td>{project.duration}</td>
                                <td>{project.created_at}</td>
                                <td>{project.due_at}</td>
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