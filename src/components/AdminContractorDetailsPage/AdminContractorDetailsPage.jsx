import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';
import Swal from 'sweetalert2';
import axios from 'axios';

function AdminContractorDetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    //! This will fetch current contractor details from store
    const contractorDetails = useSelector(store => store.contractor);
    const [toggleEditContractor, setToggleEditContractor] = useState(false)

    const refreshPage = () => {
        console.log('This is the ID', id)
        // Currently an error in this dispatch
        dispatch({type: 'GET_CONTRACTOR', payload: id })
    }

    const handleAvail = () => {
        console.log('Set available to the opposite', id)
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
    }

    const handleAdmin = () => {
        //SweetAlert here confirming
        Swal.fire({
            title: "Are you sure you want this person to be an admin?",
            text: "They will have access to everything on this site",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, give them the power"
          }).then((result) => {
            if (result.isConfirmed) {
                console.log('ID right now is', id);
                axios.put(`/api/contractor/contractor-admin/${id}`)
                .then((result) => {
                    refreshPage();
                    console.log('Contractor set to Admin');
                })
              Swal.fire({
                title: "Admin Status!",
                text: "This contractor is now an admin.",
                icon: "success"
              });
            }
          });
        
        // dispatch({type: 'TOGGLE_ADMIN', payload: id})
    }

    const editContractor = () => {
        setToggleEditContractor(!toggleEditContractor);
    }


useEffect(() => {
    refreshPage();
}, [])

// TODO: When requesting from DB, need project_language.contractor_id matched with contractor.id

// TODO: Add editability to contractor details page
// Page should include: Contact name, country, timezone
// contact info (email, phone), languages, specialty
// Current projects and completed projects

// TODO: Conditional for whether a project is in the current or completed sections

// TODO: Add Admin toggle and confirm dialogue to details page.

    return (
        <>
            <h1>Admin Contractor Details View</h1>
            {JSON.stringify(contractorDetails)}
            <button onClick={handleAdmin}>Make Admin</button>
            <p><strong>Contractor Name:</strong> {contractorDetails.contractor_name}</p>
            <p><strong>Location:</strong> {contractorDetails.location}</p>
            <p><strong>Timezone:</strong> {contractorDetails.timezone}</p>
            <p><strong>Languages:</strong> </p>
            <p><strong>Available:</strong><button onClick={()  => handleAvail(contractorDetails.user_id)}>{contractorDetails.available ? "Available" : "Unavailable"}</button></p>
            <button onClick={editContractor}>Edit</button>
            {/* <h3>Current Projects</h3>
            <p>This is where the contractor's current projects should be displayed.</p>
            <p><strong>Project Name:</strong> {contractorDetails.project[0].name}, <strong>Languages:</strong> {contractorDetails.project[0].language}, <strong>Status:</strong> {contractorDetails.project[0].status}</p> */}
            {/* {contractorDetails.project.map((project, i) => {
                return (project.status === 'Completed' ?
                <>
                <h3>Completed Projects</h3>
                <p>{project.name} - {project.language} - {project.status}</p>
                </> :
                <>
                <h3>Current Projects</h3>
                <p>{project.name} - {project.language} - {project.status}</p>
                </>
            )})} */}
            {/* <h3>Completed Projects</h3>
            <p>This is where the contractor's old/completed projects should be displayed.</p>
            <p><strong>Project Name:</strong> {contractorDetails.project[1].name}, <strong>Languages:</strong> {contractorDetails.project[1].language}, <strong>Status:</strong> {currentDetails.project[1].status}</p> */}

            
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={currentDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;