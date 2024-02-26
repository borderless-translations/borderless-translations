import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                />
            <button  className='btn btn_sizeSm' type="submit">Add Service</button>
            </form>
            
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
                                        <button  className='btn btn_sizeSm' onClick={() => handleSave(service.id)}>Save</button>
                                        <button  className='btn btn_sizeSm' onClick={() => handleCancel()}>Cancel</button>
                                    </td>

                                </>
                            ) : (
                                <>
                                    <td>
                                        {service.type}
                                    </td>
                                    <td>
                                        <button  className='btn btn_sizeSm' onClick={() => handleEdit(service)}>Edit</button>
                                        <button  className='btn btn_sizeSm' onClick={() => handleDelete(service.id)}>Delete</button>
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
