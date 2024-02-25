import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

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
            payload:{ id }});
    };
 
    const handleSave = (languageId) => {
        dispatch({
            type: 'UPDATE_LANGUAGE',
            payload: {name: editLanguageName, tier: editLanguageTier, id: languageId }
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editLanguageName}
                    onChange={(e) => setEditLanguageName(e.target.value)}
                />
                <select
                    value={editLanguageTier}
                    onChange={(e) => setEditLanguageTier(parseInt(e.target.value, 10))}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button className='btn btn_sizeSm' type="submit">Add Language</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Tier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {languages.map(language => (
                        <tr key={language.id}>
                            {editLanguageId === language.id ? (
                                <>
                                <td>
                                    <input
                                        type="text"
                                        value={editLanguageName}
                                        onChange={(e) => setEditLanguageName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={editLanguageTier}
                                        onChange={(e) => setEditLanguageTier(parseInt(e.target.value, 10))}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </td>
                                <td>
                                    <button className='btn btn_sizeSm' onClick={() => handleSave(language.id)}>Save</button>
                                    <button className='btn btn_sizeSm' onClick={handleCancel}>Cancel</button>
                                </td>
                                </>
                            ) : (
                                <>
                                    <td>{language.name}</td>
                                    <td>{language.tier}</td>
                                    <td>
                                        <button  className='btn btn_sizeSm' onClick={() => handleEdit(language)}>Edit</button>
                                        <button  className='btn btn_sizeSm' onClick={() => handleDelete(language.id)}>Delete</button>
                                    </td>
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
