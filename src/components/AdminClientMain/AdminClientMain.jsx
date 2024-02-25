import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Paper, Grid, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { Select, MenuItem, Stack, Tooltip, IconButton, TextField, InputAdornment, Box } from '@mui/material';

import AdminClientModal from '../AdminClientModal/AdminClientModal';
import './AdminClientMain.css';

function AdminClientMain() {

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const clients = useSelector(store => store.projectSummaryByClient);

  useEffect(() => {
    dispatch({ type: "GET_ALL_CLIENTS" });
  }, [modalOpen]);

  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_SUMMARY_BY_CLIENT' });
  }, []);


  const handleAddClient = () => {
    setModalOpen(true)
  }

  return (
    <div className="container">
      <h2 style={{ margin: '20px 50px' }}>Admin Client Main</h2>
     
        <Button variant='contained' onClick={() => handleAddClient()}>Add Client</Button>
        
          <Table component={Paper} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Not Started</TableCell>
                <TableCell align="center">In Progress</TableCell>
                <TableCell align="center">Complete Projects</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client => {
                return (
                  <TableRow key={client.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/client/details/${client.id}`}>{client.client}</Link>
                    </TableCell>
                    <TableCell align="center">{client.not_started}</TableCell>
                    <TableCell align="center">{client.in_process}</TableCell>
                    <TableCell align="center">{client.complete}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
       

        {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false) }} defaultValues={null} />}
      
    </div>
  );
};

export default AdminClientMain;