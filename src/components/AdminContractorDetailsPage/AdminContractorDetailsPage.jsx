import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';
import AdminContractorServicesModal from '../AdminContractorServicesModal/AdminContractorServicesModal';
import AdminContractorLanguagesModal from '../AdminContractorLanguagesModal/AdminContractorLanguagesModal';
import Swal from 'sweetalert2';
import axios from "axios";

function AdminContractorDetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    //! This will fetch current contractor details from store
    const contractorDetails = useSelector(store => store.contractor);
    const completedProjects = useSelector(store => store.completedProjects);
    const ongoingProjects = useSelector(store => store.ongoingProjects);
    const [selectedServices, setSelectedServices] = useState([])
    const allServices = useSelector(store => store.allServices);
    const [toggleEditContractor, setToggleEditContractor] = useState(false)
    const [toggleEditServices, setToggleEditServices] = useState(false);
    const [toggleEditLanguages, setToggleEditLanguages] = useState(false);

    const refreshPage = () => {
        dispatch({type: 'GET_CONTRACTOR', payload: id });
        dispatch({type: 'GET_COMPLETED_PROJECTS', payload: id});
        dispatch({type: 'GET_ONGOING_PROJECTS', payload: id});
        dispatch({type: 'GET_ALL_SERVICES'});
        dispatch({type: 'GET_ALL_LANGUAGES'});
    }
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

    const handleAvail = () => {
        console.log('Set available to the opposite', id)
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
    }

    const handleAdmin = () => {
        // Handles both granting and removing admin status
        if (contractorDetails.user_type === 'contractor') {
        Swal.fire({
            title: "Are you sure you want to grant admin status to this person?",
            text: "They will have access to everything on this site",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, give them the power"
          }).then((result) => {
            if (result.isConfirmed) {
                const userAuth = {id: id, type: 'admin'}
                console.log('userAuth right now is', userAuth);
                dispatch({type: 'SET_USER_AUTH', payload: userAuth})
                refreshPage();
              Swal.fire({
                title: "Admin Status!",
                text: "This contractor is now an admin.",
                icon: "success"
              });
            }
          })} else {
            Swal.fire({
                title: "Are you sure you want to remove this person's admin status?",
                text: "This action will restrict their access to only their projects.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, they do not need admin status"
              }).then((result) => {
                if (result.isConfirmed) {
                    const userAuth = {id: id, type: 'contractor'}
                    console.log('userAuth right now is', userAuth);
                    dispatch({type: 'SET_USER_AUTH', payload: userAuth})
                    refreshPage();
                  Swal.fire({
                    title: "Contractor Status!",
                    text: "This contractor is no longer an admin.",
                    icon: "success"
                  });
                }
              })
          };
        
        
    }

    const editContractor = () => {
        setToggleEditContractor(!toggleEditContractor);
    }
    const editContractorServices = () => {
        setToggleEditServices(!toggleEditServices);
    }
    const editContractorLanguages = () => {
        setToggleEditLanguages(!toggleEditLanguages);
    }

    const toggleNDA = () => {
        console.log('toggle NDA')
    }

useEffect(() => {
    console.log('After State Update', selectedServices);
}, [selectedServices])

useEffect(() => {
    refreshPage();
}, []);


// TODO: Add editability to contractor details page
// Page should include: Contact name, country, timezone
// contact info (email, phone), languages, specialty
// Current projects and completed projects
    return (
        <>
            <h1>Admin Contractor Details View</h1>
            {contractorDetails.user_type === "admin" ? <h3>* Admin Account</h3> : ''}
            {contractorDetails.user_type === "admin" ? <button onClick={handleAdmin}>Remove Admin status</button> :
             <button onClick={handleAdmin}>Grant Admin status</button>}
             <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Timezone</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Signed NDA:</TableCell>
                        <TableCell align="center">LinkedIn</TableCell>
                        <TableCell align="center">Written Rate</TableCell>
                        <TableCell align="center">A/V Rate</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Availability</TableCell>
                        <TableCell align="center">Admin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{contractorDetails.contractor_name}</TableCell>
                        <TableCell align="center">{contractorDetails.location}</TableCell>
                        <TableCell align="center">{contractorDetails.timezone}</TableCell>
                        <TableCell align="center">{contractorDetails.phone}</TableCell>
                        <TableCell align="center">{contractorDetails.signed_nda ? "Yes" : "No"}</TableCell>
                        <TableCell align="center">{contractorDetails.linkedIn}</TableCell>
                        <TableCell align="center">${contractorDetails.base_written_rate}/hr</TableCell>
                        <TableCell align="center">${contractorDetails.base_audio_video_rate}/hr</TableCell>
                        <TableCell align="center">{contractorDetails.status}</TableCell>
                        <TableCell align="center"><button onClick={() => handleAvail(contractorDetails.user_id)}>{contractorDetails.available ? "Available" : "Unavailable"}</button></TableCell>
                        <TableCell align="center"><button onClick={() => handleAdmin()}>{contractorDetails.user_type === "admin" ? <h3>* Admin Account</h3> : ''}
                                    {contractorDetails.user_type === "admin" ? <button onClick={handleAdmin}>Remove Admin status</button> :
                                     <button onClick={handleAdmin}>Grant Admin status</button>}</button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <button onClick={editContractor}>Edit Contractor Info</button>
            <br/>
            {/* ! LANGUAGES WILL BE FROM LANGUAGES AND TO LANGUAGES */}
            <p><strong>Languages:</strong> {contractorDetails.language_name}</p>
            <button onClick={editContractorLanguages}>Add/Remove a Language Pair</button>
            <p><div className="form-group">
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
            </p>
            <button onClick={editContractorServices}>Edit Contractor Services</button>
            <p><strong>Available:</strong><button onClick={()  => handleAvail(contractorDetails.user_id)}>{contractorDetails.available ? "Available" : "Unavailable"}</button></p>
            
            <h3>Current Projects</h3>
            <p>This is where the contractor's current projects should be displayed.</p>
            {/* <p><strong>Project Name:</strong> {contractorDetails.project[0].name}, <strong>Languages:</strong> {contractorDetails.project[0].language}, <strong>Status:</strong> {contractorDetails.project[0].status}</p> */}
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
            <h3>Completed Projects</h3>
            <p>This is where the contractor's old/completed projects should be displayed.</p>
            {/* <p><strong>Project Name:</strong> {contractorDetails.project[1].name}, <strong>Languages:</strong> {contractorDetails.project[1].language}, <strong>Status:</strong> {currentDetails.project[1].status}</p> */}

            
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={contractorDetails} />}
            {toggleEditServices && <AdminContractorServicesModal closeModal={() => { setToggleEditServices(!toggleEditServices)}} defaultValues={contractorDetails} />}
            {toggleEditLanguages && <AdminContractorLanguagesModal closeModal={() => { setToggleEditLanguages(!toggleEditLanguages)}} defaultValues={contractorDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;