import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Paper, Grid, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import AdminClientModal from '../AdminClientModal/AdminClientModal';
import AdminClientTableProjects from '../AdminClientTableProjects/AdminClientTableProjects';
import './AdminClientMain.css';

function AdminClientMain() {

const dispatch = useDispatch();
const [modalOpen, setModalOpen] = useState(false);
const clients = useSelector(store => store.allClients);

useEffect(() => {
  dispatch({ type: "GET_ALL_CLIENTS" });
}, [modalOpen]);

const handleAddClient = () => {
  setModalOpen(true)
}

  return (
    <div className="container">
      <h2>Admin Client Main</h2>
      <button onClick={() => handleAddClient()}>Add Client</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Not Started</TableCell>
                <TableCell align="center">In Progress</TableCell>
                <TableCell align="center">Complete Projects</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
          {console.log(clients)}
          {clients.map(client => {
            return (
                <AdminClientTableProjects rowData={client}  />
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false)}} defaultValues={null} />}

    </div>
  );
};

export default AdminClientMain;