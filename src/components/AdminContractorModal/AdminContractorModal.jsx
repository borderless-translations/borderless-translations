import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [toggleLanguage, setToggleLanguage] = useState(true)
    const [selectedServices, setSelectedServices] = useState([]);
    const allServices = useSelector(store => store.allServices);
    const allLanguages = useSelector(store => store.allLanguages);

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
        console.log(contractor);
    };

    const handleCheckboxChange = (event) => {
        const serviceId = event.target.value;
        const isChecked = event.target.checked;

        setSelectedServices((prevServices) => {
            if (isChecked) {
                return [... prevServices, serviceId];
            } else {
                return prevServices.filter((id) => id !== serviceId)
            }
        });
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
                    <div className="form-group">
                    <label htmlFor="service_type">Services:</label>
                        {allServices.map((service, i) => (
                            <div key={i}>
                                <input 
                                    name="service"
                                    value={service.id}
                                    type="checkbox"
                                    checked={selectedServices.includes(service.id)}
                                    onChange={handleCheckboxChange}
                                />{service.type}
                            </div>
                        ))}
                        </div>
                    <div className="language-div form-group">
                        <label htmlFor="language_name">Languages:</label>
                        {toggleLanguage ? <>
                        <br/>
                        {allLanguages.map((language, i) => (
                            <div key={i}>
                                <input 
                                    name={language.name}
                                    type="checkbox"
                                    checked={contractor.language_name == language.name ? "checked" : ''}
                                    onChange={() => handleChangeFor(contractor.language_name, language.name)}
                                />{language.name}
                            </div>
                        ))}</> : ''}
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;