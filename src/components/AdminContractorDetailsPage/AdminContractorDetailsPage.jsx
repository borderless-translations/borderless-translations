import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState, useMemo} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';
import AdminContractorServicesModal from '../AdminContractorServicesModal/AdminContractorServicesModal';
import AdminContractorLanguagesModal from '../AdminContractorLanguagesModal/AdminContractorLanguagesModal';
import {TableContainer, Table, TableCell, TableBody, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import axios from "axios";
import { select } from 'redux-saga/effects';

function AdminContractorDetailsPage() {
    // const tempContractorDetails = {id: 2, user_id: 6, contractor_name: "Brock Nelson", available: true, location: "Sweden" , 
    // timezone: 'UTC +3:00', phone: '123-456-7891', linkedIn: 'bRockNelson', signed_nda: true,
    // base_audio_video_rate: '10', base_written_rate: '10', languages: ['Swedish', 'Norwegian', 'English'],
    // project: [{name: 'Amity Island Diving Co', language: 'English to Fish', status: 'Incomplete'}, 
    // {name: 'Spin City', language: 'German to Dutch German', status: 'Completed'}], services: [1] }

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    // This will fetch current contractor details from store
    const contractorDetails = useSelector(store => store.contractor[0]);
    const contractorProjects = useSelector(store => store.contractorProjects);

    const [toggleEditContractor, setToggleEditContractor] = useState(false)
    const [toggleEditServices, setToggleEditServices] = useState(false);
    const [toggleEditLanguages, setToggleEditLanguages] = useState(false);

    const refreshPage = () => {
        dispatch({type: 'GET_CONTRACTOR', payload: id });
        console.log('fetch contractor projects', id);
        dispatch({type: 'GET_CONTRACTOR_PROJECTS', payload: id});
    } 

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
        const isChecked = event.target.checked;
        console.log(`${value} is ${checked}`)

        setSelectedServices((prevSelectedServices) => {
            if (isChecked) {
                return [...prevSelectedServices, value];
            } else {
                return prevSelectedServices.filter((selectedServiceId) => selectedServiceId !== value);
            }
        });  
    };

    const getLanguageNameById = (languageId) => {
        const language = allLanguages.find(lang => lang.id === languageId);
        console.log(language)
        return language ? language.name : null;

      };

    const handleAvail = () => {
        console.log('Set available to the opposite', id)
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
        refreshPage();
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

// useEffect(() => {
//     console.log('After State Update', selectedServices);
// }, [selectedServices])
useEffect(() => {
    refreshPage();
}, []);

    // Check if contractorDetails is null or undefined
    if (!contractorDetails) {
      return <p>Loading...</p>;
    }
    // Once reducers are loaded:
    return (
        <>
            <h1>Admin Contractor Details View</h1>
            <p>{JSON.stringify(contractorDetails)}</p>
            <p>Services {JSON.stringify(contractorDetails.services)}</p>
            <p>Languages: {JSON.stringify(contractorDetails.languages)}</p>
            {contractorDetails.user_type === "admin" ? <h3>* Admin Account</h3> : ''}

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
                        <TableCell align="center">${contractorDetails.base_written_rate}/word</TableCell>
                        <TableCell align="center">${contractorDetails.base_audio_video_rate}/minute</TableCell>
                        <TableCell align="center">{contractorDetails.status}</TableCell>
                        <TableCell align="center"><button onClick={() => handleAvail(contractorDetails.user_id)}>{contractorDetails.available ? "Available" : "Unavailable"}</button></TableCell>
                        <TableCell align="center">
                            <button onClick={() => handleAdmin()}>
                                {contractorDetails.user_type === "admin" ? <><h3>* Admin Account</h3> <p>Remove Admin Status</p></> : 
                                <p>Grant Admin Status</p>}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <button onClick={editContractor}>Edit Contractor Info</button>
            <br/>
            <p><strong>Notes:</strong> {contractorDetails.notes}</p>
            {/* ! LANGUAGES WILL BE FROM LANGUAGES AND TO LANGUAGES */}
            <div><h3><strong>Languages:</strong></h3>
                    <ul>
                        {contractorDetails.languages.map((lang, index) => (
                        <li key={index}>
                            From: {lang.first_language} To: {lang.second_language}
                        </li>
                        ))}
                    </ul>
            </div>
            
            <div className="form-group">
                <h3><strong>Services:</strong></h3>
                    <ul>
                        {contractorDetails.services.map((service, index) => (
                        <li key={index}>
                            From: {service.type} To: {service.type}
                        </li>
                        ))}
                    </ul>
            </div>
            
            <h3>Current Projects</h3>
            <p>This is where the contractor's current projects should be displayed.</p>
            <h3>Completed Projects</h3>
            <p>This is where the contractor's old/completed projects should be displayed.</p>
            <p>{contractorProjects.map((project) => (
                <ul>
                    <li>{project.description}</li>
                    <li>{project.duration}</li>
                    <li>{project.status}</li>
                </ul>
            ))}</p>
        

            
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={contractorDetails} />}
            {toggleEditServices && <AdminContractorServicesModal closeModal={() => { setToggleEditServices(!toggleEditServices)}} defaultValues={contractorDetails} />}
            {toggleEditLanguages && <AdminContractorLanguagesModal closeModal={() => { setToggleEditLanguages(!toggleEditLanguages)}} defaultValues={contractorDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;