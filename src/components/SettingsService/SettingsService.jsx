import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsService() {
    const dispatch = useDispatch();
    const services = useSelector(store => store.allServices);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_SERVICES' });
    }, []);

    const [editServiceId, setEditServiceId] = useState(null);
    const [editServiceName, setEditServiceName] = useState('');

    const handleEdit = (service) => {
        setEditServiceId(service.id);
        setEditServiceName(service.type);
    };

   const handleDelete = (id) => {
        dispatch({ 
            type: 'DELETE_SERVICE', 
            payload:{ id }});
    };
 
    const handleSave = (serviceId) => {
        dispatch({
            type: 'UPDATE_SERVICE',
            payload: { id: serviceId, type: editServiceName }
        });
        setEditServiceId(null);
        setEditServiceName('');
    };

    const handleCancel = () => {
        setEditServiceId(null);
        setEditServiceName('');
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            {editServiceId === service.id ? (
                                <td>
                                    <input
                                        type="text"
                                        value={editServiceName}
                                        onChange={(e) => setEditServiceName(e.target.value)}
                                    />
                                    <button onClick={() => handleSave(service.id)}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </td>
                            ) : (
                                <>
                                    <td>{service.type}</td>
                                    <td><button onClick={() => handleEdit(service)}>Edit</button></td>
                                    <td><button onClick={() => handleDelete(service.id)}>Delete</button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SettingsService;
