import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack, Button, TableContainer, Paper, Table, TableBody, TableHead, 
    TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import './AdminContractorPage.css';
import { DateTime } from 'luxon';

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
        dispatch({type: 'TOGGLE_AVAILABILITY_ADMIN', payload: id})
        getContractors();
    }

    const handleDetails = (id) => {
        // Will grab details from store
        dispatch({type: 'GET_CONTRACTOR', payload: id})
        history.push(`/admin/contractors/details/${id}`)
    }
    const tableRowStyle = {
        '&:nth-of-type(odd)': { backgroundColor: "white" },
        '&:nth-of-type(even)': { backgroundColor: "#e3fbfb" },
    }

    const buttonStyle = {
        backgroundColor: '#48a6cd',
        color: 'white',
        "&:hover": {
            backgroundColor: '#332c7b'
        },
        fontSize: '16px'   
    }

    useEffect(() => {
        getContractors();
    }, []);

    return (
        <div className="container">
        <Stack direction='column' sx={{margin: '0px 0px'}}>
        <h2>Contractor List</h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, border: '2px solid #332c7b', borderRadius: '10px' }} aria-label="simple table" className="adminContractorTable">
            <TableHead>
                <TableRow className="adminContractorDetailsHead" sx={{"& th": {color: "white",fontWeight: 700, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>
                    <TableCell align="center" >Name</TableCell>
                    <TableCell align="center" >Languages</TableCell>

                    <TableCell align="center" >Location</TableCell>
                    <TableCell align="center" >Timezone</TableCell>
                    <TableCell align="center" >Written Rate</TableCell>
                    <TableCell align="center" >A/V Rate</TableCell>
                    <TableCell align="center" >Availability</TableCell>
                    <TableCell align="center" >View</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {/* names of keys may change depending on DB */}
                {allContractors.map((contractor, i) => {
                    return <TableRow key={contractor.user_id}

                        sx={tableRowStyle}
                        style={{backgroundColor: contractor.available ? '' : 'lightgrey'}}

                        >
                            
                        <TableCell align="center">{contractor.contractor_name}</TableCell>
                        <TableCell align="center">{<>
                        {contractor.languages.map((lang, index) => (
                        <p key={index}>
                            {lang.first_language} to {lang.second_language}</p>
                        ))}
                    </>}</TableCell>
                        <TableCell align="center">{contractor.location}</TableCell>
                        <TableCell align="center">{contractor.timezone}</TableCell>
                        <TableCell align="center">${contractor.base_written_rate}/word</TableCell>
                        <TableCell align="center">${contractor.base_audio_video_rate}/minute</TableCell>
                        <TableCell align="center"><Button className='btn btn_sizeSm' disableRipple  variant='contained' sx={buttonStyle} 
                            onClick={() => handleAvail(contractor.user_id)}>{contractor.available ? "Available" : "Unavailable"}
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton onClick={() => history.push(`/admin/contractors/details/${contractor.user_id}`)}
                                disableElevation
                                disableRipple
                                size="small"
                                sx={buttonStyle}>
                                <Tooltip title="View contractor information">
                                    <VisibilityIcon />  
                                </Tooltip>
                            </IconButton>
                        </TableCell>
                   </TableRow>
        })}
        </TableBody>
        </Table>
        </TableContainer>
        </Stack>
        </div>
    );
}

export default AdminContractorPage;