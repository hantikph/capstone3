// EditProduct.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

// Pass the props 'product' to get the specific id of the product
export default function EditProduct({ product, fetchData }) {

	const [productId, setProductId] = useState("");

	// Forms state
	// Add state for the forms of the course
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	// state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false);

	// Function for opening the modal
	const openEdit = (productId) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			// Populate all the input values with the feteched product info
			setProductId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price);

		})
		// Open the modal
		setShowEdit(true);
	}

	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// Function to update the course
	const editProduct = async (e, productId) => {
	  e.preventDefault();

	  try {
	    const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
	      method: 'PUT',
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${localStorage.getItem('token')}`
	      },
	      body: JSON.stringify({
	        name: name,
	        description: description,
	        price: price
	      })
	    });

	    if (res.ok) {
	      const data = await res.json();

	      // Handle successful response
	      if (data.success) {
	        Swal.fire({
	          title: 'Success!',
	          icon: 'success',
	          text: 'Product Listing Updated'
	        });
	        closeEdit();
	        fetchData();
	      } else {
	        // Handle error response
	        Swal.fire({
	          title: 'Error in update.',
	          icon: 'error',
	          text: 'Please try again'
	        });
	        closeEdit();
	        fetchData();
	      }
	    } else {
	      // Handle non-200 status code
	      throw new Error(`Error: ${res.status} - ${res.statusText}`);
	    }
	  } catch (error) {
	    // Handle fetch or other errors
	    console.error(error);
	  }
	};


	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>
			{/* Edit Modal */}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Update Product</Modal.Title>
					</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label> Name </Form.Label>
						<Form.Control
						type="text"
						value={name}
						onChange={e => setName(e.target.value)} required />
					</Form.Group>
					<Form.Group>
						<Form.Label> Description </Form.Label>
						<Form.Control
						type="text"
						value={description}
						onChange={e => setDescription(e.target.value)} required />
					</Form.Group>
					<Form.Group>
						<Form.Label> Price </Form.Label>
						<Form.Control
						type="number"
						value={price}
						onChange={e => setPrice(e.target.value)} required />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeEdit}>Close</Button>
					<Button variant="success" type="submit">Submit</Button>
				</Modal.Footer>
				</Form>
			</Modal>
			

		</>

	)
}