import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import './AdminContractorPage.css';


function AdminContractorPage() {

    // Sample data for testing
    // const contractorList = [
    //     {id: 2, user_id: 6, name: "Sven Swanson", available: true, timezone: "Sweden" , languages: ['Swedish', 'Norwegian', 'English'] },
    //     {id: 3, user_id: 7, name: "Amy PuertoRico", available: false , timezone: "Puerto Rico", languages: ['Spanish', 'Nahuatl', 'English'] },
    //     {id: 4, user_id: 8, name: "Hans Gruber", available: true, timezone: "Germany" , languages: ['German', 'Latin', 'English'] }
    // ]

    const dispatch = useDispatch();
    const history = useHistory();
    const allContractors = useSelector(store => store.allContractors);

    const getContractors = () => {
        // Grabs list of all contractors from store
        dispatch({type: 'GET_ALL_CONTRACTORS'});
    }

    const handleAvail = (id) => {
        console.log('Set available to the opposite, user_id', id)
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
    }

    //! This will break the page until other side is fully set up
    const handleDetails = (id) => {
        // Will grab details from store
        console.log(allContractors)
        dispatch({type: 'GET_CONTRACTOR', payload: id})
        history.push(`/contractor/details/${id}`)
    }

useEffect(() => {
    getContractors();
}, []);

    return (
        <div className="container">
        <h1>Contractor View</h1>
        <button onClick={() => handleDetails()}>Click Me</button>
        <p>Table of Contractors here</p>
        <table className="adminContractorTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Languages</th>
                    <th>Skill Set</th>
                    <th>Location</th>
                    <th>Timezone</th>
                    <th>Written Rate</th>
                    <th>A/V Rate</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
            {/* names of keys may change depending on DB */}
        {allContractors.map((contractor, i) => {
            return <tr key={contractor.user_id}>
                        <td>{contractor.contractor_name}</td>
                        <td>{contractor.languages}</td>
                        <td>{contractor.language_profile}</td>
                        {/* <td>{contractor.rate_per_word}</td> */}
                        <td>{contractor.location}</td>
                        <td>{contractor.timezone}</td>
                        <td>${contractor.base_written_rate}/hr</td>
                        <td>${contractor.base_audio_video_rate}/hr</td>
                        <td><button onClick={() => handleAvail(contractor.user_id)}>{contractor.available ? "Available" : "Unavailable"}</button></td>
                        <td><Link to={`/admin/contractors/details/${contractor.user_id}`}><button onClick={() => handleDetails(contractor.user_id)} >Details</button></Link></td>
                   </tr>
        })}
        </tbody>
        </table>
        </div>
    );
}

export default AdminContractorPage;