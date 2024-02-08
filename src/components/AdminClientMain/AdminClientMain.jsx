import React, { useEffect, useState } from 'react';
import './AdminClientMain.css';

function AdminClientMain() {

const [modalOpen, setModalOpen] = useState(false);
const [clientToEdit, setClientToEdit] = useState(null);

const handleEditClient = (client) => {
    setClientToEdit(client);
    setModalOpen(true);
};

  return (
    <div className="container">
      <h2>Admin Client Main</h2>
    </div>
  );
};

export default AdminClientMain;