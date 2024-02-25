import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ContractorDashboard.css";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

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
        if (user.id === project.user_id) {
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
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell alighn="center">Client</TableCell>
                        <TableCell alighn="center">Project Description</TableCell>
                        <TableCell alighn="center">Role</TableCell>
                        <TableCell alighn="center">Status</TableCell>
                        <TableCell alighn="center">Due</TableCell>
                        <TableCell alighn="center">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ongoingProjects.map((project) => {
                        return (
                            <TableRow key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell alighn="center">{project.client_name}</TableCell>
                                <TableCell alighn="center">{project.description}</TableCell>
                                <TableCell alighn="center">{role(project)}</TableCell>
                                <TableCell alighn="center">{project.translator_status}</TableCell>
                                <TableCell alighn="center">{project.due_at}</TableCell>
                                <TableCell alighn="center">
                                    <button  className='btn btn_sizeSm' onClick={() => toProject(project.id)}>View</button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <h2>Past Projects</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Client</TableCell>
                        <TableCell align="center">Project Description</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Due</TableCell>
                        <TableCell align="center">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedProjects.map((project) => {
                        return (
                            <TableRow key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{project.client_name}</TableCell>
                                <TableCell align="center">{project.description}</TableCell>
                                <TableCell align="center">{role(project)}</TableCell>
                                <TableCell align="center">{project.translator_status}</TableCell>
                                <TableCell align="center">{project.due_at}</TableCell>
                                <TableCell align="center">
                                    <button className='btn btn_sizeSm' onClick={() => toProject(project.id)}>View</button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default ContractorDashboard;