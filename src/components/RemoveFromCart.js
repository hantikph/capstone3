// RemoveFromCart.js

import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RemoveFromCart({ orderData, productId, quantity, updateItemCount, fetchOrderData }) {
  const [itemCount, setItemCount] = useState(quantity || 0);
  const orderId = orderData._id;

  const removeFromCart = (orderId, productId, quantity) => {

    console.log("Req data: ", orderId, productId, quantity);

    fetch(`${ process.env.REACT_APP_API_URL }/orders/remove-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      }),
    })
    .then(res => {
            if (!res.ok) {
              throw new Error(`Failed to remove product from cart: ${res.statusText}`);
            }
            return res.json();
          })
    .then(data => {
      console.log(data);

      if(data.message === 'Success') {

        Swal.fire({
          title: "Item removed from cart",
          icon: "success",
          text: "The quantity is changed."

        })

        fetchOrderData();


      } else {

        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Please try again."

        })
      }
    })
    .catch((error) => {
          console.error("Error removing product from cart:", error);
          // Handle error (e.g., show an error message to the user)
        });
  }

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  const handleRemoveFromCart = () => {
    // Assuming that the updateItemCount function will update the item count in the parent component
    updateItemCount(productId, itemCount);

    if(itemCount){
      let quantity = itemCount;
    	console.log("Req data: ", orderId, productId, quantity);
      removeFromCart(orderId, productId, quantity);
    }
  };

  return (
    <>
    	<Row className="d-flex">
    		<Col className="mr-auto">
    		<Button size="sm" variant="outline-danger" onClick={handleDecrement}>-</Button>
    		</Col>
    		<Col>
    		<p>{itemCount}</p>
    		</Col>
    		<Col className="ml-auto">
    		<Button size="sm" variant="outline-success" onClick={handleIncrement}>+</Button>
    		</Col>
        <Col>
        <Button variant="danger" onClick={handleRemoveFromCart}>Remove</Button>		        
        </Col>           
      </Row>
        
    </>
  );
}
