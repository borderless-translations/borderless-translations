import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';



function AdminClientTableProjects(prop) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_PROJECT_SUMMARY_BY_CLIENT', payload: { id: prop.rowData.id } });
    }, [prop.rowData.id]);

    const tableData = useSelector(store => store.projectSummaryByClient);

    return (
        
        <TableRow key={prop.rowData.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Link to={`/client/details/${prop.rowData.id}`}>{prop.rowData.client}</Link>
                
            </TableCell>
            <TableCell align="center">{tableData.not_started}</TableCell>
            <TableCell align="center">{tableData.in_process}</TableCell>
            <TableCell align="center">{tableData.complete}</TableCell>
        </TableRow>
    )
}

export default AdminClientTableProjects;
