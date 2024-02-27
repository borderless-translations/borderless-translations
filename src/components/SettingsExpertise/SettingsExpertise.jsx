import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, TextField, Button, TableContainer, Paper, Table, TableCell, 
    TableRow, TableHead, TableBody, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


function SettingsExpertise() {
    const dispatch = useDispatch();
    const expertises = useSelector(store => store.allExpertise);
    const [editExpertiseId, setEditExpertiseId] = useState(null);
    const [editExpertiseType, setEditExpertiseType] = useState('');
    const [expertiseType, setExpertiseType] = useState('');
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_EXPERTISE' });
    }, []);

    const handleEdit = (expertise) => {
        setEditExpertiseId(expertise.id);
        setEditExpertiseType(expertise.type);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_EXPERTISE',
            payload: { id }
        });
    };

    const handleSave = (expertiseId) => {
        dispatch({
            type: 'UPDATE_EXPERTISE',
            payload: { type: editExpertiseType, id: expertiseId }
        });
        setEditExpertiseId(null);
        setEditExpertiseType('');
    };

    const handleCancel = () => {
        setEditExpertiseId(null);
        setEditExpertiseType('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CREATE_NEW_EXPERTISE',
            payload: { type: expertiseType }
        });
        setExpertiseType("");
    };

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        marginBottom: '10px'   
    }

    return (
        <div>
            <Stack direction="column" justifyContent="flex-end" sx={{minWidth: '350px'}}>
                <h3>Expertise</h3>

                <form onSubmit={handleSubmit}>
                    
                        <TextField
                            label='Expertise'
                            variant='standard'
                            value={expertiseType}
                            onChange={(e) => setExpertiseType(e.target.value)}
                            fullWidth
                            margin='normal'
                        />
                        <Button className='btn btn_sizeSm' type="submit" 
                            disableRipple variant='contained' sx={buttonStyle}>
                            Add Expertise
                        </Button>
                    
                </form>
                {expanded ?
                    <TableContainer component={Paper}>
                    <Table sx={{border: '2px solid #332c7b'}}>
                        <Tooltip title="Click to minimize" placement="top-end">
                            <TableHead sx={{backgroundColor: '#332c7b', border: '1px solid #332c7b'}}>
                                <TableRow sx={{"& th": {color: "white",fontWeight: 500, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}
                                    onClick={() => setExpanded(false)}>
                                    <TableCell sx={{color: 'white'}} align="center">Expertise</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                        </Tooltip>
                        <TableBody>
                            {expertises.map(expertise => (
                                <TableRow key={expertise.id}>
                                    {editExpertiseId === expertise.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    label="Expertise"
                                                    variant='standard'
                                                    value={editExpertiseType}
                                                    onChange={(e) => setEditExpertiseType(e.target.value)}
                                                    fullWidth
                                                    margin='normal'
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction='row'>
                                                    <Button startIcon={<SaveIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleSave(expertise.id)}></Button>
                                                    <Button startIcon={<CancelIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleCancel()}></Button>
                                                </Stack>
                                            </TableCell>

                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                {expertise.type}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack direction='row'>
                                                    <Button startIcon={<EditIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleEdit(expertise)}></Button>
                                                    <Button startIcon={<DeleteIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleDelete(expertise.id)}></Button>
                                                </Stack>
                                            </TableCell>

                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    </TableContainer>
                :
                    <TableContainer component={Paper} onClick={() => setExpanded(true)}>
                    <Tooltip title="Click to expand" placement="top-end">
                        <Table sx={{border: '2px solid #332c7b'}}>
                            <TableHead sx={{backgroundColor: '#332c7b', border: '1px solid #332c7b'}}>
                                <TableRow sx={{"& th": {color: "white",fontWeight: 500, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>
                                    <TableCell sx={{color: 'white', width: '95px'}} align="center">Expertise</TableCell>
                                    <TableCell sx={{color: 'white', width: '100px'}} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Tooltip>
                    </TableContainer>
                }
            </Stack>
        </div>


    );
}

export default SettingsExpertise;
