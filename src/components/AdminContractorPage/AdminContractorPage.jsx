import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';


function AdminContractorPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [toggleAddContractor, setToggleAddContractor ] = useState(false);
    const allContractors = useSelector(store => store.allContractors);

    const getContractors = () => {
        // Grabs list of all contractors from store
        dispatch({type: 'GET_ALL_CONTRACTORS'});
    }

    const addContractor = () => {
        // toggle dialog pop-up here
        setToggleAddContractor(!toggleAddContractor);
    }

    const handleDetails = (id) => {
        // Will grab details from store
        dispatch({type: 'GET_CONTRACTOR', payload: id})
        history.push(`/contractor/details/${id}`)
    }

useEffect(() => {
    getContractors();
}, []);

    return (
        <>
        <h1>Contractor View</h1>
        {/* Button to add contractor, pops up add contractor dialog */}
        <button onClick={addContractor}>Add Contractor</button>
        {/* Conditional formatting. If toggle is true, display dialog */}
        <p>Table of Contractors here</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Languages</th>
                    <th>Skill Set</th>
                    <th>Rate per word</th>
                    <th>Rate per minute</th>
                    <th>Availability</th>
                </tr>
            </thead>
            {/* names of keys may change depending on DB */}
        {allContractors.map((contractor, i) => {
            return <tr onClick={() => handleDetails(contractor.id)} key={contractor.id}>
                     <Link to={`/contractor/details/${id}`}><AdminContractorDetailsPage/></Link>
                        <td>{contractor.name}</td>
                        <td>{contractor.languages}</td>
                        <td>{contractor.skills}</td>
                        <td>{contractor.rate_per_word}</td>
                        <td>{contractor.rate_per_minute}</td>
                        <td>{contractor.availability}</td>
                   </tr>
        })}
        </table>
        {/* Click on contractor to get taken to /details/:id for that contractor
        onClick={() => handleDetails(id)}
        Buttons for editing contractor details will be within the contractor details page 
        <Link to={`/contractor/details/${id}}><AdminContractorDetailsPage></Link>
        
        */}
        </>
    );
}

export default AdminContractorPage;