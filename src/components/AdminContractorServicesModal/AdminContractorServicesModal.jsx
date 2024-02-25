import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import '../AdminClientModal/AdminClientModal.css';

function AdminContractorServicesModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [selectedServices, setSelectedServices] = useState([]);
    const allServices = useSelector(store => store.allServices);

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
        const isChecked = event.target.checked;
        console.log(`${value} is ${checked}`)

            if (isChecked) {
                setSelectedServices([...selectedServices, value])
            } else {
                setSelectedServices(selectedServices.filter(
                        (event) => event !== value
                    )
                )
            }   
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
                                    name="services"
                                    value={service.id}
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                />{service.type}
                            </div>
                        ))}</label>
                        </div>
                    <button button className='btn btn_sizeSm' type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorServicesModal;