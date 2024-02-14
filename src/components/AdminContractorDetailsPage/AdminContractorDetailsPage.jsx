import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';

function AdminContractorDetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const contractorDetails = useSelector(store => store.contractor);
    const [toggleEditContractor, setToggleEditContractor] = useState(false)

    const contractorList = [
        {id: 2, name: "Sven Swanson", available: true, timezone: "Sweden" , languages: ['Swedish', 'Norwegian', 'English'] },
        {id: 3, name: "Amy PuertoRico", available: false , timezone: "Puerto Rico", languages: ['Spanish', 'Nahuatl', 'English'] },
        {id: 4, name: "Hans Gruber", available: true, timezone: "Germany" , languages: ['German', 'Latin', 'English'] }
    ]

    let currentDetails = contractorList[(id - 2)]
    let languages = currentDetails.languages.join(', ')
    const refreshPage = () => {
        dispatch({type: 'GET_CONTRACTOR', payload: id})
    }

    const handleAvail = (id) => {
        console.log('Set available to the opposite')
        dispatch({type: 'SET_AVAILABLE', payload: id})
    }

    const editContractor = () => {
        setToggleEditContractor(!toggleEditContractor);
    }


useEffect(() => {
    refreshPage();
}, [])

// TODO: Add editability to contractor details page
// Page should include: Contact name, country, timezone
// contact info (email, phone), languages, specialty
// Current projects and completed projects

    return (
        <>
            <h1>Admin Contractor Details View</h1>
            <p><strong>Contractor Name:</strong> {currentDetails.name}</p>
            <p><strong>Timezone:</strong> {currentDetails.timezone}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <p><strong>Available:</strong><button onClick={handleAvail}>{currentDetails.available ? "Available" : "Unavailable"}</button></p>
            <button onClick={editContractor}>Edit</button>
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>

            {toggleEditContractor && <AdminContractorModal closeModal={() => { setToggleEditContractor(!toggleEditContractor)}} defaultValues={currentDetails} />}
        </>
    )
}

export default AdminContractorDetailsPage;