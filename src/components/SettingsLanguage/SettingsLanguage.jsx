import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';
import { Stack, Select, MenuItem, TextField, Button, TableContainer, Paper, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from '@mui/material';
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


    return (
        <div>

            <Stack direction="column" justifyContent="flex-end">
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
                    <Button variant='contained' type="submit">Add Language</Button>
                </form>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <th>Language</th>
                                <th>Tier</th>
                                <th>Actions</th>
                            </TableRow>
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
                                                <Button startIcon={<SaveIcon />} onClick={() => handleSave(language.id)}></Button>
                                                <Button startIcon={<CancelIcon />} onClick={handleCancel}></Button>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{language.name}</TableCell>
                                            <TableCell>{language.tier}</TableCell>
                                            <TableCell>
                                                <Button startIcon={<EditIcon />} onClick={() => handleEdit(language)}></Button>
                                                <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(language.id)}></Button>
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

export default SettingsLanguage;
