import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminClientDetails from '../AdminClientDetails/AdminClientDetails';
import AdminClientModal from '../AdminClientModal/AdminClientModal';
import './AdminClientMain.css';

function AdminClientMain() {

const dispatch = useDispatch();
// const clients = useSelector(store => store.allClients);

// Dummy data delete when database is functional
const clients = [
  {id: 1, name: "Client 1", bidding_projects: 3, open_projects: 2, complete_projects: 1},
  {id: 2, name: "Client 2", bidding_projects: 2, open_projects: 1, complete_projects: 1},
  {id: 3, name: "Client 3", bidding_projects: 1, open_projects: 0, complete_projects: 1},
]

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
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Bidding Projects</td>
            <td>Open Projects</td>
            <td>Complete Projects</td>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => {
            return (
              <tr key={client.id}>
                <td>
                  <Link to={`/client/details/${client.id}`}>{client.name}</Link>  
                </td>
                <td>{client.bidding_projects}</td>
                <td>{client.open_projects}</td>
                <td>{client.complete_projects}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalOpen && <AdminClientModal closeModal={() => { setModalOpen(false)}} defaultValues={null} />}

    </div>
  );
};

export default AdminClientMain;