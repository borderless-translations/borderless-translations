import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, TextField, Button, TableContainer, Paper, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from '@mui/material';
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

    return (
        <div>
            <Stack direction="column" justifyContent="flex-end">
            <h3>Expertise</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Expertiese'
                    variant='standard'
                    value={expertiseType}
                    onChange={(e) => setExpertiseType(e.target.value)}
                    fullWidth
                    margin='normal'
                />
            <Button variant='contained' type="submit">Add Expertise</Button>
            </form>
            
            
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Expertise</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expertises.map(expertise => (
                        <TableRow key={expertise.id}>
                            {editExpertiseId === expertise.id ? (
                                <>
                                    <TableCell>
                                        <input
                                            type="text"
                                            value={editExpertiseType}
                                            onChange={(e) => setEditExpertiseType(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button startIcon={<EditIcon />} onClick={() => handleSave(expertise.id)}></Button>
                                        <Button startIcon={<CancelIcon />} onClick={() => handleCancel()}></Button>
                                    </TableCell>

                                </>
                            ) : (
                                <>
                                    <TableCell>
                                        {expertise.type}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button startIcon={<EditIcon />} onClick={() => handleEdit(expertise)}></Button>
                                        <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(expertise.id)}></Button>
                                    </TableCell>

                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            </TableContainer>
            </Stack>                   
        </div>


    );
}

export default SettingsExpertise;
