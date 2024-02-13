import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { Card, CardContent, Typography, Paper, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




function AdminProjectPage(){

    const dispatch = useDispatch();
    const history = useHistory();

    const projects = [
        {id: 1, name: "Prime Academy", area_expertise: "Programming", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Spanish"},
        {id: 2, name: "Sky Sports", area_expertise: "Sports - Rugby", media: "Documentary", service: "Subtitles", contract_status: "Not Signed", from_language: "English", to_language: "Japanese"},
        {id: 3, name: "Mayo Clinic", area_expertise: "Science - Medical", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Korean"},
    ]

    useEffect(() => {
        dispatch({ type: 'GET_ALL_PROJECTS' })       
      }, []);

    return(
        <>
        <div>
            <h2>Admin Project Main</h2>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <br/>
                        <td>Area of Expertise</td>
                        <br/>
                        <td>Media</td>
                        <br/>
                        <td>Service</td>
                        <br/>
                        <td>Contract Status</td>
                        <br/>
                        <td>From Language</td>
                        <br/>
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
                                <br/>
                                <td>{project.area_expertise}</td>
                                <br/>
                                <td>{project.media}</td>
                                <br/>
                                <td>{project.service}</td>
                                <br/>
                                <td>{project.contract_status}</td>
                                <br/>
                                <td>{project.from_language}</td>
                                <br/>
                                <td>{project.to_language}</td>
                                <br/>
                                <button>Edit Project</button>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )  
}





export default AdminProjectPage;