import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';

import AdminClientModal from '../AdminClientModal/AdminClientModal';
import './AdminClientMain.css';

function AdminClientMain() {

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const clients = useSelector(store => store.projectSummaryByClient);

  useEffect(() => {
    dispatch({ type: "GET_ALL_CLIENTS" });
    dispatch({ type: 'GET_PROJECT_SUMMARY_BY_CLIENT' });
  }, []);

  // useEffect(() => {
  //   dispatch({ type: 'GET_PROJECT_SUMMARY_BY_CLIENT' });
  // }, []);

  const tableRowStyle = {
    '&:nth-of-type(odd)': { backgroundColor: "white" },
    '&:nth-of-type(even)': { backgroundColor: "#e3fbfb" }
}

  const handleAddClient = () => {
    setModalOpen(true)
  }

  const buttonStyle = {
    backgroundColor: '#48a6cd',
    color: 'white',
    "&:hover": {
        backgroundColor: '#332c7b'
    },
    fontSize: '14px',
    marginBottom: '10px'
  }

  return (
    <div className="container">

      <h2>Admin Client Main</h2>
      <Button className='btn btn_sizeSm' disableRipple variant='contained' sx={buttonStyle} 
        onClick={() => handleAddClient()}>Add Client
      </Button>
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ border: '2px solid #332c7b' }} >
          <TableHead>
            <TableRow sx={{"& th": {color: "white",fontWeight: 700, backgroundColor: "#332c7b", border: '1px solid #332c7b'}}}>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Not Started</TableCell>
              <TableCell align="center">In Progress</TableCell>
              <TableCell align="center">Complete Projects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => {
              return (
                <TableRow key={client.id} sx={tableRowStyle}>
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
      </TableContainer>


      {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false) }} defaultValues={null} />}

    </div>
  );
};

export default AdminClientMain;