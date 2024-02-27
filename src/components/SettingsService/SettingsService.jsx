import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, TextField, Button, TableContainer, Paper, Table, TableCell, 
    Tooltip, TableRow, TableHead, TableBody } from '@mui/material';
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
    const [expanded, setExpanded] = useState(false);

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
            <Stack direction="column" justifyContent="flex-end" sx={{minWidth: '550px'}}>
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
                        <Button className='btn btn_sizeSm' type="submit" 
                            disableRipple variant='contained' sx={buttonStyle}>
                            Add Service
                        </Button>
                    
                </form>

                {expanded ?
                    <TableContainer component={Paper}>
                    <Table sx={{border: '2px solid #332c7b'}}>
                        <Tooltip title="Click to minimize" placement="top-end">
                            <TableHead sx={{backgroundColor: '#332c7b', border: '1px solid #332c7b'}}>
                                <TableRow sx={{"& th": {color: "white",fontWeight: 500, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}
                                    onClick={() => setExpanded(false)}>
                                    <TableCell sx={{color: 'white'}} align='center'>Service</TableCell>
                                    <TableCell sx={{color: 'white'}} align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                        </Tooltip>
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
                                                <Stack direction='row'>
                                                    <Button startIcon={<SaveIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleSave(service.id)}></Button>
                                                    <Button startIcon={<CancelIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleCancel()}></Button>
                                                </Stack>
                                            </TableCell>

                                        </>
                                    ) : (
                                        <>
                                            <TableCell>
                                                {service.type}
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction='row'>
                                                    <Button startIcon={<EditIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleEdit(service)}></Button>
                                                    <Button startIcon={<DeleteIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleDelete(service.id)}></Button>
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
                                    <TableCell sx={{color: 'white', width: '180px'}} align='center'>Service</TableCell>
                                    <TableCell sx={{color: 'white', width: '68px'}} align='center'>Actions</TableCell>
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

export default SettingsService;
