import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorLanguagesModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [selectedLanguages, setSelectedLanguages] = useState([contractor.service_id]);
    const allLanguages = useSelector(store => store.allLanguages);

    const handleCheckboxChange = (event) => {
        const languageId = event.target.value;
        const isChecked = event.target.checked;
        console.log(selectedLanguages)

        setSelectedLanguages((selectedLanguages) => {
            if (isChecked) {
                console.log(serviceId, "is checked")
                return [... selectedLanguages, languageId];
            } else {
                console.log(serviceId, 'not checked')
                return selectedLanguages.filter((languageId) => languageId !== languageId)
            }
        });
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
                <div className="language-div form-group">
                    <label htmlFor="language_type"><strong>Languages:</strong>
                        {allLanguages.map((language, i) => (
                            <div key={i}>
                                <input 
                                    name="language"
                                    value={language.id}
                                    type="checkbox"
                                    checked={selectedLanguages.includes(language.id)}
                                    onChange={handleCheckboxChange}
                                />{language.name}
                            </div>
                        ))}</label>
                        </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorLanguagesModal;