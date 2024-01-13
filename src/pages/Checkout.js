// Checkout.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function Checkout({ orderId }) {
  const { user } = useContext(UserContext);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 
    const processCheckout = async () => {
      try {
      	const token = localStorage.getItem('token');

      	console.log('Starting try block...');

        if (token !== 0 && user !== 0 && orderId !== 0) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }), // uses the orderId prop

          });

          // console.log('response: ', response);

          if (response.ok) {
            const data = await response.text();
            // console.log('Checkout success. Data: ', data);
            setCheckoutStatus(data);
          } else {
            const errorData = await response.json();
            console.error('Checkout error. Error data: ', errorData);
          }
        }
      } catch (error) {
        // console.log('An error occurred. Please try again.');
        console.error(error);
      }
    };

    processCheckout();

    // console.log('user: ', user);    
    // console.log('order ID: ', orderId);

  }, [user, orderId]);

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <h3>Checkout Order</h3>
      {checkoutStatus ? (
        <div>
          <p>{checkoutStatus}</p>
          <Button onClick={handleBackToProfile}>Back to Profile</Button>
        </div>
      ) : (
        <p>Processing checkout...</p>
      )}
    </>
  );
}