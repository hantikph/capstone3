// AdminDashboard.js

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import OrderManager from '../components/OrderManager';
import UsersManager from '../components/UsersManager';

export default function AdminDashboard() {
  const [displayOrderManager, setDisplayOrderManager] = useState(true);

  const toggleDisplay = () => {
    setDisplayOrderManager(!displayOrderManager);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Dashboard</h1>

      <Button
        variant={displayOrderManager ? "success" : "secondary"}
        onClick={toggleDisplay}
        disabled={displayOrderManager}
      >
        Order Management
      </Button>

      <Button
        variant={displayOrderManager ? "secondary" : "success"}
        onClick={toggleDisplay}
        disabled={!displayOrderManager}
      >
        User Management
      </Button>

      {/* toggle display of tables */}
      {displayOrderManager ? <OrderManager /> : <UsersManager />}
    </div>
  );
}
