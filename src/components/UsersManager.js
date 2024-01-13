// UsersManager.js

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ToggleAdminRights from './ToggleAdminRights';


export default function UsersManager() {

  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // New state for error handling

  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsersData(data);
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(`Failed to fetch user list: ${errorData.message}`);
      }
    } catch (error) {
      setError(`An error occurred while fetching user list: ${error.message}`);
    }
  };


  useEffect(() => {
  
    fetchUsersData();

  }, []); // Empty dependency array, so it runs only once during component mount

  useEffect(() => {
    const usersArr = usersData.map((user) => (
      <tr key={user._id} className="text-center">
        <td>{user.userId}</td>
        <td>{user.email}</td>
        <td className={
    		user.isAdmin ?
    		'text-danger'
    		:
    		'text-primary'
    	}> {user.isAdmin ?
    	'Admin User' : 'Retail User'}
  		</td>
  		<td>
  		  <ToggleAdminRights email={user.email} isAdmin={user.isAdmin} fetchUsersData={fetchUsersData} />            
  		</td>
      </tr>
    ));

    setUsers(usersArr);
  }, [usersData]);

  return (
    <>
      <h2 className="text-center my-4"> Access Manager </h2>

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if exists */}

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>User ID</th>
            <th>Registered Email</th>
            <th>Admin Status</th>
            <th>Change Admin Rights</th>
          </tr>
        </thead>

        <tbody>{users}</tbody>
      </Table>
    </>
  );
}
