import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsLanguage() {
    const dispatch = useDispatch();
    const languages = useSelector(store => store.allLanguages);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_LANGUAGES' });
    }, [dispatch]);

    const [editLanguageId, setEditLanguageId] = useState(null);
    const [editLanguageName, setEditLanguageName] = useState('');

    const handleEdit = (language) => {
        setEditLanguageId(language.id);
        setEditLanguageName(language.name);
    };

   const handleDelete = (id) => {
        dispatch({ 
            type: 'DELETE_LANGUAGE', 
            payload:{ id }});
    };
 
    const handleSave = (languageId) => {
        dispatch({
            type: 'UPDATE_LANGUAGE',
            payload: { id: languageId, name: editLanguageName }
        });
        setEditLanguageId(null);
        setEditLanguageName('');
    };

    const handleCancel = () => {
        setEditLanguageId(null);
        setEditLanguageName('');
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {languages.map(language => (
                        <tr key={language.id}>
                            {editLanguageId === language.id ? (
                                <td>
                                    <input
                                        type="text"
                                        value={editLanguageName}
                                        onChange={(e) => setEditLanguageName(e.target.value)}
                                    />
                                    <button onClick={() => handleSave(language.id)}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </td>
                            ) : (
                                <>
                                    <td>{language.name}</td>
                                    <td><button onClick={() => handleEdit(language)}>Edit</button></td>
                                    <td><button onClick={() => handleDelete(language.id)}>Delete</button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SettingsLanguage;
