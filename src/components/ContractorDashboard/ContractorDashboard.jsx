import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ContractorDashboard.css";

function ContractorDashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const ongoingProjects = useSelector(store => store.ongoingProjects);
    const completedProjects = useSelector(store => store.completedProjects);

    const toProject = (projectId) => {
        dispatch({ type: 'SET_PROJECT', payload: projectId  });
        history.push(`/project/details/${projectId}`)
    }

    useEffect(() => {
        dispatch({ type: "GET_ONGOING_PROJECTS" });
        dispatch({ type: "GET_COMPLETED_PROJECTS" });
    }, [user.id]);

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