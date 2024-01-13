// AddProduct.js
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button } from 'react-bootstrap';

function AddProduct() {

  const { user } = useContext(UserContext);

  // input states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [isActive, setIsActive] = useState(false);

  function createProduct(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {

          Swal.fire({
            title: "Product Added",
            icon: "success",
            text: "OK"
          });

          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
        } else {

        	Swal.fire({
        		title: "Product listing failed",
        		icon: "error",
        		text: data.message
        	})
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });

      setName('');
      setDescription('');
      setPrice(0);
  }

  useEffect(() => {
    if (name !== '' && description !== '' && price !== 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, description, price]);
  
  return (
    (user.isAdmin === false)
    ?
    <Navigate to='/products' />
    :
    <Form onSubmit={e => createProduct(e)}>
      <h1>Add product</h1>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text"
        placeholder="Add the product name here"
        required
        value={name}
        onChange={e => {setName(e.target.value)}}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
        type="text"
        placeholder="Add your description here"
        required
        value={description}
        onChange={e => {setDescription(e.target.value)}}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control 
        type="number"
        placeholder=""
        required
        value={price}
        onChange={e => {setPrice(e.target.value)}}
        ></Form.Control>
      </Form.Group>
      {
       isActive
       ?
	    <Button variant="success" type="submit" id="submitBtn">Add Product</Button>
       :
    	<Button variant="danger" type="submit" id="submitBtn" disabled>Add Product</Button>
       }
    </Form>
  )
}

export default AddProduct;