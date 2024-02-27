import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, Select, MenuItem, TextField, Button, TableContainer, Paper, 
    Table, TableCell, TableRow, TableHead, TableBody, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function SettingsLanguage() {
    const dispatch = useDispatch();
    const languages = useSelector(store => store.allLanguages);
    const [editLanguageId, setEditLanguageId] = useState(null);
    const [editLanguageName, setEditLanguageName] = useState('');
    const [editLanguageTier, setEditLanguageTier] = useState('1');
    const [expanded, setExpanded] = useState(false);


    useEffect(() => {
        dispatch({ type: 'GET_ALL_LANGUAGES' });
    }, []);

    const handleEdit = (language) => {
        setEditLanguageId(language.id);
        setEditLanguageName(language.name);
        setEditLanguageTier(language.tier);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_LANGUAGE',
            payload: { id }
        });
    };

    const handleSave = (languageId) => {
        dispatch({
            type: 'UPDATE_LANGUAGE',
            payload: { name: editLanguageName, tier: editLanguageTier, id: languageId }
        });
        setEditLanguageId(null);
        setEditLanguageName('');
        setTrigger(true);
    };

    const handleCancel = () => {
        setEditLanguageId(null);
        setEditLanguageName('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CREATE_NEW_LANGUAGE',
            payload: { name: editLanguageName, tier: editLanguageTier }
        });
        setEditLanguageName("");
        setEditLanguageTier("1");
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
            <Stack direction="column" justifyContent="flex-end" sx={{minWidth: '400px'}}>
            <h3>Languages</h3>
                <form onSubmit={handleSubmit}>
                    <Stack direction="row" justifyContent="flex-end">
                    <TextField
                        label='Language'
                        variant='standard'
                        value={editLanguageName}
                        onChange={(e) => setEditLanguageName(e.target.value)}
                        fullWidth
                        margin='normal'
                    />
                    <Select
                        value={editLanguageTier}
                        onChange={(e) => setEditLanguageTier(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                    </Select>
                    </Stack>
                    <Button className='btn btn_sizeSm' type="submit" 
                        disableRipple variant='contained' sx={buttonStyle}>
                        Add Language
                    </Button>
                </form>
                {expanded ?
                    <TableContainer component={Paper}>
                        <Table sx={{border: '2px solid #332c7b'}}>
                            <TableHead sx={{backgroundColor: '#332c7b', border: '1px solid #332c7b'}}>
                                <Tooltip title="Click to minimize" placement="top-end">
                                    <TableRow sx={{"& th": {color: "white",fontWeight: 500, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}
                                        onClick={() => setExpanded(false)}>
                                        <TableCell sx={{color: 'white'}} align='center'>Language</TableCell>
                                        <TableCell sx={{color: 'white'}} align='center'>Tier</TableCell>
                                        <TableCell sx={{color: 'white'}} align='center'>Actions</TableCell>
                                    </TableRow>
                                </Tooltip>
                            </TableHead>
                            <TableBody>
                                {languages.map(language => (
                                    <TableRow key={language.id}>
                                        {editLanguageId === language.id ? (
                                            <>
                                                <TableCell>
                                                    <TextField
                                                        label="Language"
                                                        variant='standard'
                                                        value={editLanguageName}
                                                        onChange={(e) => setEditLanguageName(e.target.value)}
                                                        fullWidthmargin='normal'
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={editLanguageTier}
                                                        onChange={(e) => setEditLanguageTier(parseInt(e.target.value, 10))}
                                                    >
                                                        <MenuItem value="1">1</MenuItem>
                                                        <MenuItem value="2">2</MenuItem>
                                                        <MenuItem value="3">3</MenuItem>
                                                        <MenuItem value="4">4</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction='row'>
                                                        <Button startIcon={<SaveIcon sx={{color: '#48a6cd' }}/>} onClick={() => handleSave(language.id)}></Button>
                                                        <Button startIcon={<CancelIcon sx={{color: '#48a6cd' }}/>} onClick={handleCancel}></Button>
                                                    </Stack>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{language.name}</TableCell>
                                                <TableCell>{language.tier}</TableCell>
                                                <TableCell>
                                                    <Stack direction='row'>
                                                        <Button startIcon={<EditIcon sx={{color: '#48a6cd' }} />} onClick={() => handleEdit(language)}></Button>
                                                        <Button startIcon={<DeleteIcon sx={{color: '#48a6cd' }} />} onClick={() => handleDelete(language.id)}></Button>
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
                                    <TableCell sx={{color: 'white', width: '120px'}} align='center'>Language</TableCell>
                                    <TableCell sx={{color: 'white', width: '20px'}} align='center'>Tier</TableCell>
                                    <TableCell sx={{color: 'white', width: '130px'}} align='center'>Actions</TableCell>
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

export default SettingsLanguage;
