import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
        console.log(contractor);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "UPDATE_CONTRACTOR", payload: contractor });
        console.log("Updated contractor information on server", contractor);
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="contractor_name">Contractor:</label>
                        <input
                            name="contractor_name"
                            type="text"
                            value={contractor.contractor_name}
                            onChange={(event) => handleChangeFor("contractor_name", event.target.value)}
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;