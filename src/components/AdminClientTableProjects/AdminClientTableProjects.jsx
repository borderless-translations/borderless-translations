import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';


function AdminClientTableProjects(prop) {

    const dispatch = useDispatch();

    useEffect(() => {
        const stringID = prop.rowData.id.toString();
        dispatch({ type: "GET_CLIENT_PROJECTS", payload: { id: stringID } });
    }, []);

    const clientProjects = useSelector(store => store.clientProjects);

    return (
        
        <TableRow key={prop.rowData.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Link to={`/client/details/${prop.rowData.id}`}>{prop.rowData.client}</Link>
                
            </TableCell>

            <TableCell align="center">{clientProjects.status}</TableCell>
            <TableCell align="center">All is well!</TableCell>
            <TableCell align="center">PANIC!!!</TableCell>
        </TableRow>
    )
}

export default AdminClientTableProjects;
