import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function AdminContractorDetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const contractorDetails = useSelector(store => store.contractor);

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

    // TODO: Availability toggle with PUT request


useEffect(() => {
    refreshPage();
}, [])

// TODO: Add editability to contractor details page

    return (
        <>
            <h1>Admin Contractor Details View</h1>
            <p><strong>Contractor Name:</strong> {currentDetails.name}</p>
            <p><strong>Timezone:</strong> {currentDetails.timezone}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <button onClick={() => history.push('/admin/contractors')}>Return to Contractors</button>
        </>
    )
}

export default AdminContractorDetailsPage;