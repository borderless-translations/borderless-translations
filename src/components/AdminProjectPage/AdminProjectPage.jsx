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
        {id: 1, name: "Prime Academy", area_expertise: "Programming", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Spanish"},
        {id: 2, name: "Sky Sports", area_expertise: "Sports - Rugby", media: "Documentary", service: "Subtitles", contract_status: "Not Signed", from_language: "English", to_language: "Japanese"},
        {id: 3, name: "Mayo Clinic", area_expertise: "Science - Medical", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Korean"},
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
                        <td>Area of Expertise</td>
                        <td>Media</td>
                        <td>Service</td>
                        <td>Contract Status</td>
                        <td>From Language</td>                      
                        <td>To Language</td>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => {
                        return (
                            <tr key={project.id}>
                                <td>
                                    <Link to={`/project/details/${project.id}`}>{project.name}</Link>
                                </td>
                                <td>{project.area_expertise}</td>
                                <td>{project.media}</td>
                                <td>{project.service}</td>
                                <td>{project.contract_status}</td>
                                <td>{project.from_language}</td> 
                                <td>{project.to_language}</td>
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