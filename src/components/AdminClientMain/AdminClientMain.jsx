import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminClientModal from '../AdminClientModal/AdminClientModal';
import './AdminClientMain.css';

function AdminClientMain() {

const dispatch = useDispatch();

const clients = useSelector(store => store.allClients);

useEffect(() => {
  dispatch({ type: "GET_ALL_CLIENTS" });
}, []);

const [modalOpen, setModalOpen] = useState(false);

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
                <TableCell align="center">Bidding Projects</TableCell>
                <TableCell align="center">Open Projects</TableCell>
                <TableCell align="center"d>Complete Projects</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
          {clients.map(client => {
            return (
              <TableRow key={client.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/client/details/${client.id}`}>{client.client}</Link>  
                </TableCell>
                <TableCell align="center">{client.bidding_projects}</TableCell>
                <TableCell align="center">{client.open_projects}</TableCell>
                <TableCell align="center">{client.complete_projects}</TableCell>
              </TableRow>
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