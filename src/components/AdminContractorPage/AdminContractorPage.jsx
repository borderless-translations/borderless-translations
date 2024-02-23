import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Paper, Grid, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import './AdminContractorPage.css';

function AdminContractorPage() {

    const contractorList = [
        {id: 2, user_id: 6, contractor_name: "Brock Nelson", available: true, location: "Sweden" , timezone: 'UTC +3:00', base_audio_video_rate: '10', base_written_rate: '10', languages: ['Swedish', 'Norwegian', 'English'],
        project: [{name: 'Amity Island Diving Co', language: 'English to Fish', status: 'Incomplete'}, {name: 'Spin City', language: 'German to Dutch German', status: 'Completed'}] },
        {id: 3, contractor_name: "Robin Raabe", available: false , location: "Puerto Rico", timezone: 'UTC -4:00', base_audio_video_rate: '20', base_written_rate: '15', languages: ['Spanish', 'Nahuatl', 'English'] },
        {id: 4, contractor_name: "Hans Gruber", available: true, location: "Germany" , timezone: 'UTC +2:00', base_audio_video_rate: '30', base_written_rate: '20', languages: ['German', 'Latin', 'English'] }
        ]
        
        const findLanguageName = (languageId) => {
        const language = allLanguages.find(lang => lang.id === languageId);
        return language ? language.name : null;
        };
        // const contractorLanguages = contractor.languages.data.map(({ from_language_id, to_language_id }) => ({
        // from_language: findLanguageName(from_language_id),   
        // to_language: findLanguageName(to_language_id),
        // }))
    const dispatch = useDispatch();
    const history = useHistory();
    const allContractors = useSelector(store => store.allContractors);
    const allLanguages = useSelector(store => store.allLanguages);

    const getContractors = () => {
        // Grabs list of all contractors from store
        dispatch({type: 'GET_ALL_CONTRACTORS'});
        dispatch({type: 'GET_ALL_LANGUAGES'});
    }

    const handleAvail = (id) => {
        console.log('Set available to the opposite, user_id', id)
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
        getContractors();
    }

    const handleDetails = (id) => {
        // Will grab details from store
        dispatch({type: 'GET_CONTRACTOR', payload: id})
        history.push(`/admin/contractors/details/${id}`)
    }

useEffect(() => {
    getContractors();
}, []);

    return (
        <div className="container">
        <h1>Contractor List</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorTable">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Languages</TableCell>

                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Timezone</TableCell>
                    <TableCell align="center">Written Rate</TableCell>
                    <TableCell align="center">A/V Rate</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">Details</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {/* names of keys may change depending on DB */}
                {allContractors.map((contractor, i) => {
                    return <TableRow key={contractor.user_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            
                        <TableCell align="center">{contractor.contractor_name}</TableCell>
                        <TableCell align="center">{<ul>
                        {contractor.languages.map((lang, index) => (
                        <p key={index}>
                            {lang.first_language} to {lang.second_language}</p>
                        ))}
                    </ul>}</TableCell>
                        <TableCell align="center">{contractor.location}</TableCell>
                        <TableCell align="center">{contractor.timezone}</TableCell>
                        
                        <TableCell align="center">${contractor.base_written_rate}/word</TableCell>
                        <TableCell align="center">${contractor.base_audio_video_rate}/minute</TableCell>
                        <TableCell align="center"><button onClick={() => handleAvail(contractor.user_id)}>{contractor.available ? "Available" : "Unavailable"}</button></TableCell>
                        <TableCell align="center"><Link to={`/admin/contractors/details/${contractor.user_id}`}><button onClick={() => handleDetails(contractor.user_id)} >Details</button></Link></TableCell>
                   </TableRow>
        })}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
}

export default AdminContractorPage;