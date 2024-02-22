import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsService() {
    const dispatch = useDispatch();
    const services = useSelector(store => store.allServices);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_SERVICES' });
    }, []);

    
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
                        <td>
                            {service.type}
                        </td>
                        <td>
                            <button onClick={() => handleEdit(service)}>Edit</button>
                            <button onClick={() => handleDelete(service.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>


        </div>
    
   
    );
}

export default SettingsService;
