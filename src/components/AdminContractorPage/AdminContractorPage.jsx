import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect } from 'react'


function AdminContractorPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const contractorsList = useSelector(store => store.contractors);

    const getContractors = () => {
        dispatch({type: 'FETCH_CONTRACTORS'});
    }

    const handleDetails = (id) => {
        // Will grab details from store
        dispatch({type: 'FETCH_CONTRACTOR_DETAILS', payload: id})
        history.push(`/contractor/details/${id}`)
    }

useEffect(() => {
    getContractors();
}, []);

    return (
        <>
        <h1>Contractor View</h1>
        {/* Button to add contractor, pops up add contractor dialog */}
        <p>Table of Contractors here</p>
        {/* Click on contractor to get taken to /details/:id for that contractor
        onClick={() => handleDetails(id)}
        Buttons for editing contractor details will be within the contractor details page 
        <Link to={`/contractor/details/${id}}><AdminContractorDetailsPage></Link>
        
        */}
        </>
    );
}

export default AdminContractorPage;