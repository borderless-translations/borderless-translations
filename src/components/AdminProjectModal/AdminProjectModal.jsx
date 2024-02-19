import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import './AdminClientModal.css';


function AdminProjectModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

        let [project, setProject] = useState(defaultValues || { name: "", area_expertise: "", media: "", service: "", contract_status: "", from_language: "", to_language: "" });

    const handleChangeFor = (key, value) => {
        setProject({ ...project, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'ADD_PROJECT', payload: project });
            console.log("Sent client information to server");
        } else {
            dispatch({ type: "UPDATE_PROJECT", payload: project });
            console.log("Updated client information on server", project);
        }
        setProject({ name: "", area_expertise: "", media: "", service: "", contract_status: "", from_language: "", to_language: "" });
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
                            value={project.name}
                            onChange={(event) => handleChangeFor("name", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="area_expertise">Area of Expertise:</label>
                        <input
                            name="area_expertise"
                            type="text"
                            value={project.area_expertise}
                            onChange={(event) => handleChangeFor("area_expertise", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="media">Media:</label>
                        <input
                            name="media"
                            type="text"
                            value={project.media}
                            onChange={(event) => handleChangeFor("media", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Service:</label>
                        <input
                            name="service"
                            type="text"
                            value={project.service}
                            onChange={(event) => handleChangeFor("service", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contract_status">Contract Status:</label>
                        <input
                            name="contract_status"
                            type="text"
                            value={project.contract_status}
                            onChange={(event) => handleChangeFor("contract_status", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="from_language">From Language:</label>
                        <input
                            name="from_language"
                            type="text"
                            value={project.from_language}
                            onChange={(event) => handleChangeFor("from_language", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to_language">To Language:</label>
                        <input
                            name="to_language"
                            type="text"
                            value={project.to_language}
                            onChange={(event) => handleChangeFor("to_language", event.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};


export default AdminProjectModal;