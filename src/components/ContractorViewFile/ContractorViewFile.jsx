import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Stack, IconButton, Tooltip }  from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import "./ContractorViewFile.css";

function ContractorViewFile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const project = useSelector(store => store.project);

    const containerStyle = {
        border: '1px solid #332c7b', 
        borderRadius: '10px', 
        backgroundColor: 'white',
        padding: '20px',
        maxWidth: '80%'
    }

    const goBack = (projectId) => {
        history.push(`/user/project/details/${projectId}`);
    }
    
    useEffect(() => {
        dispatch({ type: "GET_PROJECT", payload: params.id });
    }, [params.id]);

    return (
        <div className="container">
            <Stack direction='column' sx={{margin: '0px 30px'}}>
                <h2>
                    <IconButton onClick={() => goBack(project.id)}
                        disableElevation
                        disableRipple
                        size="small">
                        <Tooltip title="Back">
                            <WestIcon sx={{fontSize: '24px', color: '#48a6cd'}} />   
                        </Tooltip>
                    </IconButton>
                    Back to project details</h2>
                <Box sx={containerStyle} className="contractor-details">
                    <h3>Text to be translated:</h3>
                    <br />
                    {project.text_to_translate}
                </Box>
            </Stack>
        </div>
    );
};

export default ContractorViewFile;