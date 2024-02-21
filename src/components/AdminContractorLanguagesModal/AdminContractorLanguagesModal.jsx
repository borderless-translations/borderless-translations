import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../AdminClientModal/AdminClientModal.css';

function AdminContractorLanguagesModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const allLanguages = useSelector(store => store.allLanguages);

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
        const isChecked = event.target.checked;
        console.log(`${value} is ${checked}`)

            if (isChecked) {
                setSelectedLanguages([...selectedLanguages, value])
            } else {
                setSelectedLanguages(selectedLanguages.filter(
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
                <div className="language-div form-group">
                    <label htmlFor="language_type"><strong>Languages:</strong>
                        {allLanguages.map((language, i) => (
                            <div key={i}>
                                <input 
                                    name="languages"
                                    value={language.id}
                                    type="checkbox"
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