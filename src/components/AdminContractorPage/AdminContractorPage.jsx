import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import AdminContractorModal from '../AdminContractorModal/AdminContractorModal';

function AdminContractorPage() {

    // Sample data for testing
    const contractorList = [
        {id: 2, name: "Sven Swanson", available: true, timezone: "Sweden" , languages: ['Swedish', 'Norwegian', 'English'] },
        {id: 3, name: "Amy PuertoRico", available: false , timezone: "Puerto Rico", languages: ['Spanish', 'Nahuatl', 'English'] },
        {id: 4, name: "Hans Gruber", available: true, timezone: "Germany" , languages: ['German', 'Latin', 'English'] }
    ]

    const dispatch = useDispatch();
    const history = useHistory();
    const [toggleAddContractor, setToggleAddContractor ] = useState(false);
    const allContractors = useSelector(store => store.allContractors);

    const getContractors = () => {
        // Grabs list of all contractors from store
        dispatch({type: 'GET_ALL_CONTRACTORS'});
    }

    const addContractor = () => {
        // toggle modal pop-up here
        console.log('you clicked Add Contractor', toggleAddContractor)
        setToggleAddContractor(!toggleAddContractor);
    }

    const handleAvail = (id) => {
        console.log('Set available to the opposite')
        dispatch({type: 'SET_AVAILABLE', payload: id})
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
        <div className="container">
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
                    <th>Timezone</th>
                    <th>Availability</th>
                </tr>
            </thead>
            {/* names of keys may change depending on DB */}
        {contractorList.map((contractor, i) => {
            return <tr onClick={() => handleDetails(contractor.id)} key={contractor.id}>
                        <td>{contractor.name}</td>
                        <td>{contractor.languages.join(', ')}</td>
                        {/* <td>{contractor.skills}</td> */}
                        {/* <td>{contractor.rate_per_word}</td> */}
                        <td>{contractor.timezone}</td>
                        <td><button onClick={handleAvail}>{contractor.available ? "Available" : "Not Available"}</button></td>
                        <td><Link to={`/admin/contractors/details/${contractor.id}`}>Details</Link></td>
                   </tr>
        })}
        </table>
        {toggleAddContractor && <AdminContractorModal closeModal={() => { setToggleAddContractor(!toggleAddContractor)}} defaultValues={null} />}
        </div>
    );
}

export default AdminContractorPage;