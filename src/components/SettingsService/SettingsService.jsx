import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, TextField, Button, TableContainer, Paper, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function SettingsService() {
    const dispatch = useDispatch();
    const services = useSelector(store => store.allServices);
    const [editServiceId, setEditServiceId] = useState(null);
    const [editServiceType, setEditServiceType] = useState('');
    const [serviceType, setServiceType] = useState('');

    useEffect(() => {
        dispatch({ type: 'GET_ALL_SERVICES' });
    }, []);

    const handleEdit = (service) => {
        setEditServiceId(service.id);
        setEditServiceType(service.type);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_SERVICE',
            payload: { id }
        });
    };

    const handleSave = (serviceId) => {
        dispatch({
            type: 'UPDATE_SERVICE',
            payload: { type: editServiceType, id: serviceId }
        });
        setEditServiceId(null);
        setEditServiceType('');
    };

    const handleCancel = () => {
        setEditServiceId(null);
        setEditServiceType('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CREATE_NEW_SERVICE',
            payload: { type: serviceType }
        });
        setServiceType("");
    };

    return (
        <div>
            <Stack direction="column" justifyContent="flex-end">
                <h3>Services</h3>

                <form onSubmit={handleSubmit}>
                    
                        <TextField
                            label="Service"
                            variant="standard"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            fullWidth
                            margin='normal'
                        />
                        <button className='btn btn_sizeSm' type="submit">Add Service</button>
                    
                </form>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Service</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.map(service => (
                                <TableRow key={service.id}>
                                    {editServiceId === service.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    label="Service"
                                                    variant="standard"
                                                    value={editServiceType}
                                                    onChange={(e) => setEditServiceType(e.target.value)}
                                                    fullWidth
                                                    margin='normal'
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button startIcon={<SaveIcon />} onClick={() => handleSave(service.id)}></Button>
                                                <Button startIcon={<CancelIcon />} onClick={() => handleCancel()}></Button>
                                            </TableCell>

                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                {service.type}
                                            </TableCell>
                                            <TableCell>
                                                <Button startIcon={<EditIcon />} onClick={() => handleEdit(service)}></Button>
                                                <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(service.id)}></Button>
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

export default SettingsService;
