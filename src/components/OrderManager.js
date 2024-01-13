//OrderManager.js

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';


export default function OrderManager() {

  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrdersData(data);
          setError(null); // Clear any previous errors
        } else {
          const errorData = await response.json();
          setError(`Failed to fetch orders: ${errorData.message}`);
        }
      } catch (error) {
        setError(`An error occurred while fetching orders: ${error.message}`);
      }
    };

    fetchOrdersData();

    
  }, []); // Empty dependency array, so it runs only once during component mount

  useEffect(() => {
    const ordersArr = ordersData.map((order) => (
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.userId}</td>
        <td>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                Product: {item.productId}, Quantity: {item.quantity}, Item Price: {item.itemPrice}, Subtotal: {item.subTotal}
              </li>
            ))}
          </ul>
        </td>
        <td>{order.totalAmount}</td>
      </tr>
    ));

    setOrders(ordersArr);
  }, [ordersData]);

  return (
    <>
      <h2 className="text-center my-4"> Order Manager </h2>

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if exists */}

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Order ID</th>
            <th>User ID</th>
            <th>Items</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>{orders}</tbody>
      </Table>
    </>
  );
}
