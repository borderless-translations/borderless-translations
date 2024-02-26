import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import './AdminClientModal.css';


function AdminProjectModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();

        let [project, setProject] = useState(defaultValues || { admin_id: "", client_id: "", description: "", duration: "", due_at: "", project_id: "", from_language_id: "", to_language_id: "", service_id: ""});

    const handleChangeFor = (key, value) => {
        setProject({ ...project, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (defaultValues === null) {
            dispatch({ type: 'CREATE_NEW_PROJECT', payload: project });
            console.log("Sent client information to server");
        } else {
            dispatch({ type: "UPDATE_PROJECT", payload: project });
            console.log("Updated client information on server", project);
        }
        setProject({ admin_id: "", client_id: "", description: "", duration: "", due_at: "", project_id: "", from_language_id: "", to_language_id: "", service_id: ""});
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="admin_id">admin_id:</label>
                        <input
                            name="admin_id"
                            type="text"
                            value={project.admin_id}
                            onChange={(event) => handleChangeFor("admin_id", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_id">client_id:</label>
                        <input
                            name="client_id"
                            type="text"
                            value={project.client_id}
                            onChange={(event) => handleChangeFor("client_id", event.target.value)}
                        />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            name="description"
                            type="text"
                            value={project.description}
                            onChange={(event) => handleChangeFor("description", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration:</label>
                        <input
                            name="duration"
                            type="text"
                            value={project.duration}
                            onChange={(event) => handleChangeFor("duration", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_at">Due By:</label>
                        <input
                            name="due_at"
                            type="text"
                            value={project.due_at}
                            onChange={(event) => handleChangeFor("due_at", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project_id">project_id:</label>
                        <input
                            name="project_id"
                            type="text"
                            value={project.project_id}
                            onChange={(event) => handleChangeFor("project_id", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="from_language_id">From Language:</label>
                        <input
                            name="from_language_id"
                            type="text"
                            value={project.from_language_id}
                            onChange={(event) => handleChangeFor("from_language_id", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to_language_id">To Language:</label>
                        <input
                            name="to_language_id"
                            type="text"
                            value={project.to_language_id}
                            onChange={(event) => handleChangeFor("to_language_id", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_id">Service:</label>
                        <input
                            name="service_id"
                            type="text"
                            value={project.service_id}
                            onChange={(event) => handleChangeFor("service_id", event.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};


export default AdminProjectModal;