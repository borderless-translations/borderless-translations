import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';
import AdminContractorServicesModal from '../AdminContractorServicesModal/AdminContractorServicesModal';
import AdminContractorLanguagesModal from '../AdminContractorLanguagesModal/AdminContractorLanguagesModal';
import {TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Stack, Paper, Box, Button} from '@mui/material';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import EastIcon from '@mui/icons-material/East';


function AdminContractorDetailsPage() {
    // const tempContractorDetails = {id: 2, user_id: 6, contractor_name: "Brock Nelson", available: true, location: "Sweden" , 
    // timezone: 'UTC +3:00', phone: '123-456-7891', linkedIn: 'bRockNelson', signed_nda: true,
    // base_audio_video_rate: '10', base_written_rate: '10', languages: ['Swedish', 'Norwegian', 'English'],
    // project: [{name: 'Amity Island Diving Co', language: 'English to Fish', status: 'Incomplete'}, 
    // {name: 'Spin City', language: 'German to Dutch German', status: 'Completed'}], services: [1] }
    const now = DateTime.now();
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
            confirmButtonColor: "#48a6cd",
            cancelButtonColor: "#332c7b",
            confirmButtonText: "Yes, give them the power",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const userAuth = {id: id, type: 'admin'}
                console.log('userAuth right now is', userAuth);
                dispatch({type: 'SET_USER_AUTH', payload: userAuth})
              Swal.fire({
                title: "Admin Status!",
                text: "This contractor is now an admin.",
                icon: "success",
                confirmButtonColor: "#48a6cd",
              });
              refreshPage();
            }
          })} else {
            Swal.fire({
                title: "Are you sure you want to remove this person's admin status?",
                text: "This action will restrict their access to only their projects.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#48a6cd",
                cancelButtonColor: "#332c7b",
                confirmButtonText: "Yes, they do not need admin status",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    const userAuth = {id: id, type: 'contractor'}
                    console.log('userAuth right now is', userAuth);
                    dispatch({type: 'SET_USER_AUTH', payload: userAuth})
                  Swal.fire({
                    title: "Contractor Status!",
                    text: "This contractor is no longer an admin.",
                    icon: "success",
                    confirmButtonColor: "#48a6cd",
                  });
                  refreshPage();
                }
              })
          };   
    }

    const boxStyle = {
        border: '2px solid #332c7b',
        borderRadius: '5px',
        padding: '20px 20px',
        margin: '10px 10px',
        fontSize: '16px',
        minWidth: '200px',
        minHeight: '193px',
        backgroundColor: 'white'
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        }
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
            <h1>Contractor Details</h1>
            {contractorDetails.user_type === "admin" ? <h3>* Admin Account</h3> : ''}
            <Button  className='btn btn_sizeSm' variant='contained' disableRipple style={buttonStyle}
                onClick={editContractor}>Edit Contractor Info
            </Button>
            <br/><br/>
             <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650, border: '2px solid #332c7b' }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead className="adminContractorDetailsHead" 
                    sx={{"& th": {color: "white",fontWeight: 700, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Timezone</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Signed NDA</TableCell>
                        <TableCell align="center">LinkedIn</TableCell>
                        <TableCell align="center">Written Rate</TableCell>
                        <TableCell align="center">A/V Rate</TableCell>
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
                        <TableCell align="center">{contractorDetails.linked_in}</TableCell>
                        <TableCell align="center">${contractorDetails.base_written_rate}/word</TableCell>
                        <TableCell align="center">${contractorDetails.base_audio_video_rate}/minute</TableCell>
                        <TableCell align="center">
                            <Button className='btn btn_sizeSm' variant='contained' disableRipple style={buttonStyle}  onClick={() => handleAvail(contractorDetails.user_id)}>
                                {contractorDetails.available ? "Available" : "Unavailable"}
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button className='btn btn_sizeSm' variant='contained' disableRipple style={buttonStyle} onClick={() => handleAdmin()}>
                                {contractorDetails.user_type === "admin" ? <><p>Remove Admin Status</p></> : 
                                <p>Grant Admin Status</p>}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <br />
            <div className='contractorDetails'>
            <Stack direction='row' sx={{ justifyContent: 'space-between', margin: '0px' }}>
                <div className="form-group">
                    <Box sx={boxStyle}>
                    <h3 className="adminDetails"><strong>Notes</strong></h3>
                        <p>{contractorDetails.notes}</p>
                    </Box>
                </div>
                <div className="form-group">
                    <Box sx={boxStyle}>
                    <h3 className="adminDetails"><strong>Languages</strong></h3>
                        <ul>
                            {contractorDetails.languages.map((lang, index) => (
                            <li key={index}>
                                {lang.first_language} <EastIcon fontSize="medium"/> {lang.second_language}
                            </li>
                            ))}
                        </ul>
                        </Box>
                </div>
                <div className="form-group">
                    <Box sx={boxStyle}>
                    <h3 className="adminDetails"><strong>Expertise</strong></h3>
                        <ul>
                            {contractorDetails.expertise.map((expertise, index) => (
                            <li key={index}>
                                {expertise.type}
                            </li>
                            ))}
                        </ul>
                        </Box>
                </div>
                <div className="form-group">
                <Box sx={boxStyle}>
                    <h3 className="adminDetails"><strong>Services</strong></h3>
                        <ul>
                            {contractorDetails.services.map((service, index) => (
                            <li key={index}>
                                {service.type}
                            </li>
                            ))}
                        </ul>
                </Box>
                </div>
            </Stack>
            </div>
            <div>
            <h3 id="currentProjects">Current Projects</h3>
            <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead>
                    <TableRow sx={{"& th": {color: "white", fontWeight: 700, backgroundColor: "#332c7b"}}}>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Client Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">From Language</TableCell>
                        <TableCell align="center">To Language</TableCell>
                        <TableCell align="center">Duration</TableCell>
                        <TableCell align="center">Due At</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Translator Status</TableCell>
                        <TableCell align="center">Proofreader Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
            {contractorProjects.map((project, i) => {
                if (project.status !== 'Complete' && project.status !== 'Completed') {
                return (
                    <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{project.client_name}</TableCell>
                        <TableCell align="center">{project.description}</TableCell>
                        <TableCell align="center">{project.from_language}</TableCell>
                        <TableCell align="center">{project.to_language}</TableCell>
                        <TableCell align="center">{project.duration}</TableCell>
                        <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                        <TableCell align="center">{project.status}</TableCell>
                        <TableCell align="center">{project.translator_status}</TableCell>
                        <TableCell align="center">{project.proofreader_status}</TableCell>
                    </TableRow>
                )} else {}
            } )}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            <div>
            <h3 id='completedProjects'>Completed Projects</h3>
            <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorDetailsTable">
                <TableHead>
                    <TableRow sx={{"& th": {color: "white",fontWeight: 700, backgroundColor: "#332c7b"}}}>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Client Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">From Language</TableCell>
                        <TableCell align="center">To Language</TableCell>
                        <TableCell align="center">Duration</TableCell>         
                        <TableCell align="center">Due At</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Translator Status</TableCell>
                        <TableCell align="center">Proofreader Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
            {contractorProjects.map((project, i) => {
                if (project.status == 'Complete' || project.status == 'Completed') {
                return (
                    <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{project.client_name}</TableCell>
                        <TableCell align="center">{project.description}</TableCell>
                        <TableCell align="center">{project.from_language}</TableCell>
                        <TableCell align="center">{project.to_language}</TableCell>
                        <TableCell align="center">{project.duration}</TableCell>
                        <TableCell align="center">{DateTime.fromISO(project.due_at).toFormat('DDD')}</TableCell>
                        <TableCell align="center">{project.status}</TableCell>
                        <TableCell align="center">{project.translator_status}</TableCell>
                        <TableCell align="center">{project.proofreader_status}</TableCell>
                    </TableRow>
                )} else {}
            } )}
                </TableBody>
              </Table>
            </TableContainer>     
            </div>

            <br /> <br />
            <Button className='btn btn_sizeSm' variant='contained' disableRipple style={buttonStyle}
                onClick={() => history.push('/admin/contractors')}>Return to Contractors
            </Button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={contractorDetails} />}
            {toggleEditServices && <AdminContractorServicesModal closeModal={() => { setToggleEditServices(!toggleEditServices)}} defaultValues={contractorDetails} />}
            {toggleEditLanguages && <AdminContractorLanguagesModal closeModal={() => { setToggleEditLanguages(!toggleEditLanguages)}} defaultValues={contractorDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;