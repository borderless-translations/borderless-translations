import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';

function AdminClientTableProjects(prop) {

    console.log(prop);
    return (
        
        <TableRow key={prop.rowData.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Link to={`/client/details/${prop.rowData.id}`}>{prop.rowData.client}</Link>
                
            </TableCell>

            <TableCell align="center">Remain Calm!</TableCell>
            <TableCell align="center">All is well!</TableCell>
            <TableCell align="center">PANIC!!!</TableCell>
        </TableRow>
    )
}

export default AdminClientTableProjects;
