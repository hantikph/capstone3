// AddToCart.js

import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

export default function AddToCart({ productId, quantity, updateItemCount, addToCart }) {
  const [itemCount, setItemCount] = useState(quantity || 0);

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  const handleAddToCart = () => {
    // Assuming that the updateItemCount function will update the item count in the parent component
    updateItemCount(productId, itemCount);

    if(itemCount){
      let quantity = itemCount;
    	addToCart(productId, quantity);
    }
  };

  return (
    <>
    	<Row className="d-flex">
    		<Col className="ml-auto">
    		<Button size="sm" variant="danger" onClick={handleDecrement}>-</Button>
    		</Col>
    		<Col>
    		<p>Quantity: {itemCount}</p>
    		</Col>
    		<Col className="mr-auto">
    		<Button size="sm" variant="success" onClick={handleIncrement}>+</Button>
    		</Col>		        
        </Row>
        <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
    </>
  );
}
