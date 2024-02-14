import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

        let [contractor, setContractor] = useState(defaultValues || { name: "", contact: "", email: "", phone: "", timezone: "" });

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (defaultValues === null) {
        //     dispatch({ type: 'ADD_CLIENT', payload: client });
        //     console.log("Sent client information to server");
        // } else {
        //     dispatch({ type: "UPDATE_CLIENT", payload: client });
        //     console.log("Updated client information on server", client);
        // }
        setContractor({ name: "", contact: "", email: "", phone: "", timezone: "" });
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <lable htmlFor="client">Contractor:</lable>
                        <input
                            name="client"
                            type="text"
                            value={contractor.name}
                            onChange={(event) => handleChangeFor("name", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="contact">Contact:</lable>
                        <input
                            name="contact"
                            type="text"
                            value={contractor.contact}
                            onChange={(event) => handleChangeFor("contact", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="email">E-Mail:</lable>
                        <input
                            name="email"
                            type="text"
                            value={contractor.email}
                            onChange={(event) => handleChangeFor("email", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="phone">Phone:</lable>
                        <input
                            name="phone"
                            type="text"
                            value={contractor.phone}
                            onChange={(event) => handleChangeFor("phone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <lable htmlFor="timezone">Timezone:</lable>
                        <input
                            name="name"
                            type="timezone"
                            value={contractor.timezone}
                            onChange={(event) => handleChangeFor("timezone", event.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;