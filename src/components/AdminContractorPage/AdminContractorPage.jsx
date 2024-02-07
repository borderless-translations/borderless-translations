import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


function AdminContractorPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleDetails = () => {
        // Will grab details from store
        dispatch({type: ''})
        //history.push(`/contractor/details/${id}`)
    }

    return (
        <>
        <h1>Contractor View</h1>
        {/* Button to add contractor, takes you to add contractor page? */}
        <p>Table of Contractors here</p>
        {/* Click on contractor to get taken to /details/:id for that contractor
        
        Buttons for editing contractor details will be within the contractor details page 
        
        
        */}
        </>
    );
}

export default AdminContractorPage;