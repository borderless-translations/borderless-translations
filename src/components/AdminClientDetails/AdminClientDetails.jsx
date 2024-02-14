import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AdminClientModal from '../AdminClientModal/AdminClientModal';
import "./AdminClientDetails.css";




function AdminClientDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "GET_CLIENT", payload: params.id });
    }, [params.id]);

    // Make this functional and remove dummy data when database is functional
    // const client = useSelector(store => store.client);

    //Dummy data delete when database is functional
    const client = {name: "Client 1", contact: "John Doe", email: "JDoe@fake.com", phone: "555-555-5555", timezone: "CST Chicago UTC -6"};

    // Controls for operating the modal
    const [modalOpen, setModalOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null); 

    const handleEditClient = (client) => {
        setClientToEdit(client);
        setModalOpen(true);
    };

    return (
        <div className="container">
            <h2>Admin Client Details</h2>
            <p>{params.id}</p>
            <p>{client.name}</p>
            <p>{client.contact}</p>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <p>{client.timezone}</p>

            <button onClick={() => handleEditClient(client)}>Edit Client</button>

            <button onClick={() => history.push("/client")}>Return to Client List</button>

            {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false), setClientToEdit(null)}} defaultValues={client} />}
            
        </div>
    );
};

export default AdminClientDetails;