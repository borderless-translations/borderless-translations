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
        const action = { type: 'GET_PROJECT', payload: projectId };
        dispatch(action);
        setTimeout(() => {
            history.push(`/user/project/details/${projectId}`);
        }, 500);
    }
    
    const role = (project) => {
        if (user.id === project.contractor_id) {
            return 'Translator'
        }
        else if (user.id === project.proofreader_id) {
            return 'Proofreader'
        }
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
                    <tr>
                        <th>Client</th>
                        <th>Project Description</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Due</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {ongoingProjects.map((project) => {
                    return <tr key={project.id}>
                            <td>{project.client_name}</td>
                            <td>{project.description}</td>
                            <td>{role(project)}</td>
                            <td>{project.translator_status}</td>
                            <td>{project.due_at}</td>
                            <td><button onClick={() => toProject(project.id)}>View</button></td>
                        </tr>
                    })}
                </tbody>
            </table>

            <h2>Past Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Project Description</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Due</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {completedProjects.map((project) => {
                    return <tr key={project.id}>
                            <td>{project.client_name}</td>
                            <td>{project.description}</td>
                            <td>{role(project)}</td>
                            <td>{project.translator_status}</td>
                            <td>{project.due_at}</td>
                            <td><button onClick={() => toProject(project.id)}>View</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ContractorDashboard;