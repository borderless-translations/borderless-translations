import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsService() {
    const dispatch = useDispatch();
    const services = useSelector(store => store.allServices);
    const [editServiceId, setEditServiceId] = useState(null);
    const [editServiceType, setEditServiceType] = useState('');

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
            payload:{ id }});
    };

    const handleSave = (serviceId) => {
        dispatch({
            type: 'UPDATE_SERVICE',
            payload: { type: editServiceType, id: serviceId}
        });
        setEditServiceId(null);
        setEditServiceType('');
    };

    const handleCancel = () => {
        setEditServiceId(null);
        setEditServiceType('');
    };
    
    return(
        <div>
        <p>Hello you absolute legend!</p>

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
                        <>
                        <td>
                            <input
                                type="text"
                                value={editServiceType}
                                onChange={(e) => setEditServiceType(e.target.value)}
                            />
                        </td>
                        <td>
                            <button onClick={() => handleSave(service.id)}>Save</button>
                            <button onClick={() => handleCancel()}>Cancel</button>
                        </td>
                        
                        </>
                        ) : (
                        <>
                        <td>
                            {service.type}
                        </td>
                        <td>
                            <button onClick={() => handleEdit(service)}>Edit</button>
                            <button onClick={() => handleDelete(service.id)}>Delete</button>
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

export default SettingsService;
