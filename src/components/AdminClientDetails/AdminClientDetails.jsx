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

    useEffect(() => {
        dispatch({ type:"GET_CLIENT_PROJECTS", payload: params.id });
    }, [params.id]);


    // Make this functional and remove dummy data when database is functional
    const client = useSelector(store => store.client);
    const clientProjects = useSelector(store => store.clientProjects);

    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {
        const filteredProjects = [... new Set(clientProjects.map(project => project.project_status))];
        const sorted = filteredProjects.map(status => ({
            status,
            projectsByStatus: projects.filter(project => project.project_status === status)
        }));
        setSortedProjects(sorted);
    }, [client])

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
            <p>{client.client}</p>
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