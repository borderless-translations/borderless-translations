import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Paper, Grid, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import './AdminContractorPage.css';


function AdminContractorPage() {

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
        <h1>Contractor List</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="adminContractorTable">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Languages</TableCell>
                    <TableCell align="center">Skill Set</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Timezone</TableCell>
                    <TableCell align="center">Written Rate</TableCell>
                    <TableCell align="center">A/V Rate</TableCell>
                    <TableCell align="center">Availability</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {/* names of keys may change depending on DB */}
                    {allContractors.map((contractor, i) => {
                    return <TableRow key={contractor.user_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row.account}</TableCell>
                        <TableCell align="center">{contractor.contractor_name}</TableCell>
                        <TableCell align="center">{contractor.languages}</TableCell>
                        <TableCell align="center">{contractor.language_profile}</TableCell>
                        <TableCell align="center">{contractor.location}</TableCell>
                        <TableCell align="center">{contractor.timezone}</TableCell>
                        
                        <TableCell align="center">${contractor.base_written_rate}/hr</TableCell>
                        <TableCell align="center">${contractor.base_audio_video_rate}/hr</TableCell>
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