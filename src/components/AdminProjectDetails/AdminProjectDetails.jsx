import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import AdminProjectModal from '../AdminProjectModal/AdminProjectModal';
import { DateTime } from 'luxon';
import {TableContainer, Table, TableCell, TableBody, TableHead, TableRow, 
    Button, Tooltip, IconButton} from '@mui/material';
import Paper from '@mui/material/Paper';
import LinkIcon from '@mui/icons-material/Link';


function AdminProjectDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const project = useSelector(store => store.project);

    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
        dispatch({ type: "GET_ALL_CONTRACTORS" });
    }, [params.id]);


    const[modalOpen, setModalOpen] = useState(false);
    const[projectToEdit, setProjectToEdit] = useState(null);

    const handleEditProject = (project) => {
        setProjectToEdit(project);
        setModalOpen(true);
    }

    const viewFile = (projectId) => {
        setTimeout(() => {
            history.push(`/user/project/file/${projectId}`);
        }, 500);
    }

    const toLink = (link) => {
        window.open(`${link}`);
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        marginBottom: '10px'   
    }

    return(
        <div className="container"> 
            <h2 style={{ margin: '20px 0px'}}>Admin Project Details</h2>
            <Button className='btn btn_sizeSm' sx={buttonStyle} variant='contained' disableRipple
                onClick={() => handleEditProject(project)} >Edit Project</Button>
            <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650, border: '2px solid #332c7b' }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead>
                    <TableRow sx={{"& th": {color: "white", fontWeight: 700, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>
                        <TableCell align="center">Client Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Due Date</TableCell>
                        <TableCell align="center">Translator Status</TableCell>
                        <TableCell align="center">Proofreader Status</TableCell>
                        <TableCell align="center">From Language</TableCell>
                        <TableCell align="center">To Language</TableCell>
                        <TableCell align="center">Service Notes</TableCell>
                        <TableCell align="center">File Link</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableCell align="center">{project.client_name}</TableCell>
                        <TableCell align="left">{project.description}</TableCell>
                        <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                        <TableCell align="center">{project.translator_name}<br/>{project.translator_status}</TableCell>
                        <TableCell align="center">{project.proofreader_name}<br/>{project.proofreader_status}</TableCell>
                        <TableCell align="center">{project.from_language_name}</TableCell>
                        <TableCell align="center">{project.to_language_name}</TableCell>
                        <TableCell align="center">{project.service}</TableCell>
                        <TableCell align="center">
                            {project.text_to_translate !== null && project.file_link !== null &&
                                <div>
                                    <p>View text file: 
                                        <IconButton onClick={() => viewFile(project.id)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Link">
                                                <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                            </Tooltip>
                                        </IconButton></p>
                                    <p>External link:
                                        <IconButton onClick={() => toLink(project.file_link)}
                                            disableElevation
                                            disableRipple
                                            size="small">
                                            <Tooltip title="Link">
                                                <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                            </Tooltip>
                                        </IconButton>
                                    </p>
                                </div>
                            }
                            {project.text_to_translate !== null && project.file_link === null &&
                                <p>View text file: 
                                <IconButton onClick={() => viewFile(project.id)}
                                    disableElevation
                                    disableRipple
                                    size="small">
                                    <Tooltip title="Link">
                                        <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                    </Tooltip>
                                </IconButton></p>
                            }
                            {project.text_to_translate === null && project.file_link !== null &&
                                <p>External link:
                                    <IconButton onClick={() => toLink(project.file_link)}
                                        disableElevation
                                        disableRipple
                                        size="small">
                                        <Tooltip title="Link">
                                            <LinkIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                                        </Tooltip>
                                    </IconButton>
                                </p>
                            }
                        </TableCell>
                </TableBody>
              </Table>
            </TableContainer>

        {modalOpen && <AdminProjectModal closeModal={() => { setModalOpen(false), setProjectToEdit(null) }} defaultValues={project} />}
        <br />

        <Button className='btn btn_sizeSm' sx={buttonStyle} variant='contained' disableRipple
            onClick={() => history.push("/admin/project")}>Return to Project List</Button>

        </div>
    )
}

export default AdminProjectDetails;