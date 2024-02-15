import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';

function AdminContractorDetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    //! This will fetch current contractor details from store
    //const contractorDetails = useSelector(store => store.contractor);
    const [toggleEditContractor, setToggleEditContractor] = useState(false)

    const contractorList = [
        {id: 2, user_id: 6, name: "Sven Swanson", available: true, timezone: "Sweden" , languages: ['Swedish', 'Norwegian', 'English'], 
        project: [{name: 'Amity Island Diving Co', language: 'English to Fish', status: 'Incomplete'}, {name: 'Spin City', language: 'German to Dutch German', status: 'Completed'}] },
        {id: 3, user_id: 7, name: "Amy PuertoRico", available: false , timezone: "Puerto Rico", languages: ['Spanish', 'Nahuatl', 'English'] },
        {id: 4, user_id: 8, name: "Hans Gruber", available: true, timezone: "Germany" , languages: ['German', 'Latin', 'English'] }
    ]

    // Currently only displaying these details.
    let currentDetails = contractorList[0]
    let languages = currentDetails.languages.join(', ')
    const refreshPage = () => {
        console.log('This is the ID', id)
        // Currently an error in this dispatch
        dispatch({type: 'GET_CONTRACTOR', payload: id })
    }

    const handleAvail = () => {
        console.log('Set available to the opposite')
        // dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
    }

    const handleAdmin = () => {
        //SweetAlert here confirming
        console.log('ID right now is', id)
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
            <button onClick={handleAdmin}>Make Admin</button>
            <p><strong>Contractor Name:</strong> {currentDetails.name}</p>
            <p><strong>Timezone:</strong> {currentDetails.timezone}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <p><strong>Available:</strong><button onClick={()  => handleAvail(currentDetails.user_id)}>{currentDetails.available ? "Available" : "Unavailable"}</button></p>
            <button onClick={editContractor}>Edit</button>
            {/* <h3>Current Projects</h3>
            <p>This is where the contractor's current projects should be displayed.</p>
            <p><strong>Project Name:</strong> {currentDetails.project[0].name}, <strong>Languages:</strong> {currentDetails.project[0].language}, <strong>Status:</strong> {currentDetails.project[0].status}</p> */}
            {currentDetails.project.map((project, i) => {
                return (project.status === 'Completed' ?
                <>
                <h3>Completed Projects</h3>
                <p>{project.name} - {project.language} - {project.status}</p>
                </> :
                <>
                <h3>Current Projects</h3>
                <p>{project.name} - {project.language} - {project.status}</p>
                </>
            )})}
            {/* <h3>Completed Projects</h3>
            <p>This is where the contractor's old/completed projects should be displayed.</p>
            <p><strong>Project Name:</strong> {currentDetails.project[1].name}, <strong>Languages:</strong> {currentDetails.project[1].language}, <strong>Status:</strong> {currentDetails.project[1].status}</p> */}

            
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={currentDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;