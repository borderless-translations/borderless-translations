import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorServicesModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [selectedServices, setSelectedServices] = useState([contractor.service_id]);
    const allServices = useSelector(store => store.allServices);

    const handleCheckboxChange = (event) => {
        const serviceId = event.target.value;
        const isChecked = event.target.checked;
        console.log(selectedServices)
        console.log('serviceId is', serviceId)

        setSelectedServices((prevSelectedServices) => {
            if (isChecked) {
                console.log(serviceId, "is checked")
                return [... prevSelectedServices, serviceId];
            } else {
                console.log(serviceId, 'not checked')
                return prevSelectedServices.filter((selectedServiceId) => selectedServiceId !== serviceId)
            }   
        });
        console.log('After State Update', selectedServices);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // dispatch({ type: "UPDATE_CONTRACTOR", payload: contractor });
        // console.log("Updated contractor information on server", contractor);
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="service_type"><strong>Services:</strong>
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
                        ))}</label>
                        </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorServicesModal;