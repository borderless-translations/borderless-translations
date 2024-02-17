import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

        let [contractor, setContractor] = useState(defaultValues);

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
        console.log(contractor);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'ADD_CONTRACTOR', payload: contractor });
            console.log("Sent contractor information to server");
        } else {
            dispatch({ type: "UPDATE_CONTRACTOR", payload: contractor });
            console.log("Updated contractor information on server", contractor);
        }
        setContractor({ 
            name: "", 
            contact: "", 
            email: "", 
            phone: "", 
            timezone: "", 
            available: true
    });
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="client">Contractor:</label>
                        <input
                            name="client"
                            type="text"
                            value={contractor.contractor_name}
                            onChange={(event) => handleChangeFor("name", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            name="contact"
                            type="text"
                            value={contractor.contact}
                            onChange={(event) => handleChangeFor("contact", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-Mail:</label>
                        <input
                            name="email"
                            type="text"
                            value={contractor.email}
                            onChange={(event) => handleChangeFor("email", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            name="phone"
                            type="text"
                            value={contractor.phone}
                            onChange={(event) => handleChangeFor("phone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timezone">Timezone:</label>
                        <input
                            name="name"
                            type="timezone"
                            value={contractor.timezone}
                            onChange={(event) => handleChangeFor("timezone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="available">Available:</label>
                        <input
                            name="name"
                            type="available"
                            value={contractor.available ? "Available" : "Unavailable"}
                            onChange={(event) => handleChangeFor("available", event.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;