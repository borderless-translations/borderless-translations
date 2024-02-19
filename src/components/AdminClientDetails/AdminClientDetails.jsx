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

    //Dummy data delete when database is functional
    // const client = {name: "Client 1", contact: "John Doe", email: "JDoe@fake.com", phone: "555-555-5555", timezone: "CST Chicago UTC -6"};
    // const projects = [
    //     {id: 1, name: "Prime Academy", area_expertise: "Programming", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Spanish", project_status: "Open"},
    //     {id: 2, name: "Sky Sports", area_expertise: "Sports - Rugby", media: "Documentary", service: "Subtitles", contract_status: "Not Signed", from_language: "English", to_language: "Japanese", project_status: "Open"},
    //     {id: 3, name: "Mayo Clinic", area_expertise: "Science - Medical", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Korean", project_status: "Complete"},
    //     {id: 4, name: "Prime Academy", area_expertise: "Programming", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Spanish", project_status: "Bidding"},
    //     {id: 5, name: "Sky Sports", area_expertise: "Sports - Rugby", media: "Documentary", service: "Subtitles", contract_status: "Not Signed", from_language: "English", to_language: "Japanese", project_status: "Open"},
    //     {id: 6, name: "Mayo Clinic", area_expertise: "Science - Medical", media: "Video", service: "Closed Captions", contract_status: "Signed", from_language: "English", to_language: "Korean", project_status: "Complete"},
    // ]

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