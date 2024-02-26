import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AdminclientModal.css';
import { Stack, Button, TextField } from '@mui/material';


function AdminClientModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

    let [client, setClient] = useState(defaultValues || { id: "", client: "", contact: "", country: "", timezone: "", location: "", email: "", phone: "", client_notes: "" });

    const handleChangeFor = (key, value) => {
        setClient({ ...client, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'CREATE_NEW_CLIENT', payload: client });
            console.log("Sent client information to server", client);
        } else {
            dispatch({ type: "UPDATE_CLIENT", payload: client });
            console.log("Updated client information on server", client);
        }
        setClient({ id: "", client: "", contact: "", country: "", timezone: "", location: "", email: "", phone: "", client_notes: "" });
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">

                <form onSubmit={handleSubmit}>
                    <Stack direction="column" justifyContent="flex-end">
                        <TextField
                            label="Client Name"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.client}
                            onChange={(event) => handleChangeFor("client", event.target.value)}
                        />
                        <TextField
                            label="Contact"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.contact}
                            onChange={(event) => handleChangeFor("contact", event.target.value)}
                        />

                        <TextField
                            label="country"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.country}
                            onChange={(event) => handleChangeFor("country", event.target.value)}
                        />

                        <TextField
                            label="location"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.location}
                            onChange={(event) => handleChangeFor("location", event.target.value)}
                        />

                        <TextField
                            label="timezone"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.timezone}
                            onChange={(event) => handleChangeFor("timezone", event.target.value)}
                        />

                        <TextField
                            label="email"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.email}
                            onChange={(event) => handleChangeFor("email", event.target.value)}
                        />

                        <TextField
                            label="phone"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.phone}
                            onChange={(event) => handleChangeFor("phone", event.target.value)}
                        />
                        <TextField
                            label="client_notes"
                            sx={{ width: '400px', margin: '20px 0' }}
                            value={client.client_notes}
                            onChange={(event) => handleChangeFor("client_notes", event.target.value)}
                        />


                        <button  className='btn btn_sizeSm' type="submit">Save</button>
                    </Stack>
                    </div>
         

                </form>
            </div>
        </div>
    );
};

export default AdminClientModal;