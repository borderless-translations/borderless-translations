import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ContractorDashboard.css";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

    const headerStyle = {
        backgroundColor: '#332c7b',
        border: '0px'
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        }
    }

    const headerFontStyle = {
        color: 'white',
        border: '0px',
        fontSize: '20px'
    }

    const tableCellStyle = {
        border: 'none',
    }

    const tableRowStyle = {
        '&:nth-of-type(odd)': { backgroundColor: "white" },
        '&:nth-of-type(even)': { backgroundColor: "#e3fbfb" }
    }

    return (
        <div className="container">
            <h2>Ongoing Projects</h2>
            <TableContainer component={Paper} sx={{ minWidth: '650px', maxWidth: '80%', border: '2px solid #332c7b' }}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow sx={headerStyle}>
                        <TableCell sx={headerFontStyle} align="center">Client</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Project Description</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Role</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Status</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Due</TableCell>
                        <TableCell sx={headerFontStyle} align="center">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ongoingProjects.map((project) => {
                        return (
                            <TableRow key={project.id}
                                sx={tableRowStyle}
                            >
                                <TableCell sx={tableCellStyle} align="left">{project.client_name}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.description}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{role(project)}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.translator_status}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.due_at}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">
                                    <IconButton onClick={() => toProject(project.id)}
                                        disableElevation
                                        disableRipple
                                        size="small"
                                        sx={buttonStyle}>
                                        <Tooltip title="View project details">
                                            <VisibilityIcon />  
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            </TableContainer>

            <h2>Past Projects</h2>
            <TableContainer component={Paper} sx={{ minWidth: '650px', maxWidth: '80%', border: '2px solid #332c7b'  }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={headerStyle}>
                        <TableCell sx={headerFontStyle} align="center">Client</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Project Description</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Role</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Status</TableCell>
                        <TableCell sx={headerFontStyle} align="center">Due</TableCell>
                        <TableCell sx={headerFontStyle} align="center">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedProjects.map((project) => {
                        return (
                            <TableRow key={project.id}
                                sx={tableRowStyle}
                            >
                                <TableCell sx={tableCellStyle} align="left">{project.client_name}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.description}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{role(project)}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.translator_status}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.due_at}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">
                                    <IconButton onClick={() => toProject(project.id)}
                                        disableElevation
                                        disableRipple
                                        size="small"
                                        sx={buttonStyle}>
                                        <Tooltip title="View project details">
                                            <VisibilityIcon />  
                                        </Tooltip>
                                    </IconButton>
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