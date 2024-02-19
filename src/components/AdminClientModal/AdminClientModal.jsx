import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AdminClientModal.css';

function AdminClientModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

        let [client, setClient] = useState(defaultValues || { client: "", contact: "", country:"", timezone:"", location:"", email: "", phone: "", client_notes: "" });

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
        setClient({client: "", contact: "", country:"", timezone:"", location:"", email: "", phone: "", client_notes: ""});
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="client">Client:</label>
                        <input
                            name="client"
                            type="text"
                            value={client.client}
                            onChange={(event) => handleChangeFor("client", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            name="contact"
                            type="text"
                            value={client.contact}
                            onChange={(event) => handleChangeFor("contact", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input
                            name="country"
                            type="text"
                            value={client.country}
                            onChange={(event) => handleChangeFor("country", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timezone">Time Zone:</label>
                        <input
                            name="timezone"
                            type="text"
                            value={client.timezone}
                            onChange={(event) => handleChangeFor("timezone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-Mail:</label>
                        <input
                            name="email"
                            type="email"
                            value={client.email}
                            onChange={(event) => handleChangeFor("email", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            name="phone"
                            type="text"
                            value={client.phone}
                            onChange={(event) => handleChangeFor("phone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_notes">Client Notes:</label>
                        <input
                            name="client_notes"
                            type="text"
                            value={client.client_notes}
                            onChange={(event) => handleChangeFor("client_notes", event.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminClientModal;