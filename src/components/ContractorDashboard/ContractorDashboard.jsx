import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ContractorDashboard.css";

function ContractorDashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const ongoingProjects = useSelector(store => store.ongoingProjects);
    // const completedProjects = useSelector(store => store.completedProjects);
    // Dummy data
    const ongoingProjects = [
        {
            id: 1,
            client: 'Client Name', 
            description: 'Short project description goes here', 
            role: 'Translator',
            status: 'In progress',
            due: '02-14-2024'
        },
        {
            id: 2,
            client: 'Client Name', 
            description: 'Short project description goes here', 
            role: 'Proofreader',
            status: 'Not started',
            due: '03-14-2024'
        }
    ]
    const completedProjects = [
        {
            id: 3,
            client: 'Client Name', 
            description: 'Short project description goes here', 
            role: 'Translator',
            status: 'Complete',
            due: '02-01-2024'
        },
        {
            id: 4,
            client: 'Client Name', 
            description: 'Short project description goes here', 
            role: 'Proofreader',
            status: 'Complete',
            due: '02-05-2024'
        }
    ]

    const toProject = (projectId) => {
        dispatch({ type: 'SET_PROJECT', payload: projectId  });
        history.push(`/project/details/${projectId}`)
    }

    return (
        <div className="container">
            <h2>Ongoing Projects</h2>
            <table>
                <thead>
                    <th>Client</th>
                    <th>Project Description</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Due</th>
                    <th>View</th>
                </thead>
                <tbody>
                    {ongoingProjects.map((project) => {
                    return <tr key={project.id}>
                            <td>{project.client}</td>
                            <td>{project.description}</td>
                            <td>{project.role}</td>
                            <td>{project.status}</td>
                            <td>{project.due}</td>
                            <td><button onClick={() => toProject(project.id)}>View</button></td>
                        </tr>
                    })}
                </tbody>
            </table>

            <h2>Past Projects</h2>
            <table>
                <thead>
                    <th>Client</th>
                    <th>Project Description</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Due</th>
                    <th>View</th>
                </thead>
                <tbody>
                    {completedProjects.map((project) => {
                    return <tr key={project.id}>
                            <td>{project.client}</td>
                            <td>{project.description}</td>
                            <td>{project.role}</td>
                            <td>{project.status}</td>
                            <td>{project.due}</td>
                            <td><button onClick={() => toProject(project.id)}>View</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ContractorDashboard;