import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card, CardContent, Typography, Paper, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';




function AdminProjectPage(){

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_ALL_PROJECTS' })       
      }, []);
}





export default AdminProjectPage