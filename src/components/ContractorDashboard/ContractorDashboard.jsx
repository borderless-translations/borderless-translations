import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ContractorDashboard.css";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DateTime } from 'luxon';

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
        console.log(user.id, project.contractor_id, project.proofreader_id);
        if (user.id === project.contractor_id) {
            return 'Translator'
        }
        else if (user.id === project.proofreader_id) {
            return 'Proofreader'
        }
        else {
            return 'Admin'
        }
    }

    useEffect(() => {
        dispatch({ type: "GET_ONGOING_PROJECTS" });
        dispatch({ type: "GET_COMPLETED_PROJECTS" });
        dispatch({ type: "GET_CONTRACTOR_SELF" });
        dispatch({ type: "GET_ALL_LANGUAGES" });
        dispatch({ type: "GET_ALL_SERVICES" });
        dispatch({ type: "GET_ALL_EXPERTISE" });
      }, []);

    const headerStyle = {
        backgroundColor: '#332c7b',
        border: '1px'
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
        fontSize: '16px',
        border: '2px solid #332c7b'
    }

    const tableCellStyle = {
        borderRight: '1px solid black',
        borderLeft: '1px solid black'
    }

    const tableRowStyle = {
        '&:nth-of-type(odd)': { backgroundColor: "white" },
        '&:nth-of-type(even)': { backgroundColor: "#e3fbfb" }
    }

    return (
        <div className="container">
            <h2>Current Projects</h2>
            <TableContainer component={Paper} sx={{ minWidth: '650px', maxWidth: '100%', border: '2px solid #332c7b' }}>
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
                                style={{backgroundColor: project.flagged ? 'pink' : ''}}
                            >
                                <TableCell sx={{border: 'none'}} align="center">{project.client_name}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.description}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{role(project)}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{project.translator_status}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                                <TableCell sx={{border: 'none'}} align="center">
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

            <h2>Completed Projects</h2>
            <TableContainer component={Paper} sx={{ minWidth: '650px', maxWidth: '100%', border: '2px solid #332c7b'  }}>
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
                                style={{backgroundColor: project.flagged ? 'pink' : ''}}
                            >
                                <TableCell sx={{border: 'none'}} align="center">{project.client_name}</TableCell>
                                <TableCell sx={tableCellStyle} align="left">{project.description}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{role(project)}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{project.translator_status}</TableCell>
                                <TableCell sx={tableCellStyle} align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                                <TableCell sx={{border: 'none'}} align="center">
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
