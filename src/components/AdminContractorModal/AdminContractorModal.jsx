import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
// import '../AdminClientModal/AdminClientModal.css';

function AdminContractorModal({ closeModal, defaultValues }) {

    const dispatch = useDispatch();
    let [contractor, setContractor] = useState(defaultValues);

    const handleChangeFor = (key, value) => {
        setContractor({ ...contractor, [key]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "UPDATE_CONTRACTOR", payload: contractor });
        console.log("Updated contractor information on server", contractor);
        Swal.fire({
            title: "Info saved!",
            icon: "success"
          });
          dispatch({type: "GET_CONTRACTOR", payload: contractor.user_id})
        closeModal();
    };

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="contractor_name">Contractor Name:</label>
                        <input
                            name="contractor_name"
                            type="text"
                            value={contractor.contractor_name}
                            onChange={(event) => handleChangeFor("contractor_name", event.target.value)}
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
                        <label htmlFor="email">NDA Signed?</label>
                        <input
                            name="signed_nda"
                            type="checkbox"
                            checked={contractor.signed_nda}
                            onChange={(event) => handleChangeFor("signed_nda", event.target.checked)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            name="location"
                            type="text"
                            value={contractor.location}
                            onChange={(event) => handleChangeFor("location", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timezone">Timezone:</label>
                        <input
                            name="timezone"
                            type="text"
                            value={contractor.timezone}
                            onChange={(event) => handleChangeFor("timezone", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn:</label>
                        <input
                            name="linked_in"
                            type="text"
                            value={contractor.linked_in}
                            onChange={(event) => handleChangeFor("linked_in", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="writtenRate">Notes:</label>
                        <textarea
                            name="notes"
                            type="text"
                            value={contractor.notes}
                            onChange={(event) => handleChangeFor("notes", event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="writtenRate">Written Rate:</label>
                        <input
                            name="base_written_rate"
                            type="number"
                            value={contractor.base_written_rate}
                            onChange={(event) => handleChangeFor("base_written_rate", parseFloat(event.target.value))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avRate">Base AV Rate:</label>
                        <input
                            name="base_audio_video_rate"
                            type="number"
                            value={contractor.base_audio_video_rate}
                            onChange={(event) => handleChangeFor("base_audio_video_rate", parseFloat(event.target.value))}
                        />
                    </div>
                    <button  className='btn btn_sizeSm' type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AdminContractorModal;