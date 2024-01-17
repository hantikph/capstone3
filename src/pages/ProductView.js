// ProductView.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import AddToCart from '../components/AddToCart';

export default function ProductView() {

	const { productId } = useParams();
	const { user } = useContext(UserContext);
	// Allow us to redirect to different pages in our functions
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(1); // Assume default quantity of 1
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [loading, setLoading] = useState(true);

	const addToCart = (productId, quantity) => {

		fetch(`${ process.env.REACT_APP_API_URL }/orders/add-item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity,
			}),
		})
		.then(res => {
		        if (!res.ok) {
		          throw new Error(`Failed to add product to cart: ${res.statusText}`);
		        }
		        return res.json();
		      })
		.then(data => {
			// console.log(data);

			if(data.message === 'Product Added!') {

				Swal.fire({
					title: "Item added to cart",
					icon: "success",
					text: "The product is added."

				})

				navigate("/products");

			} else {

								Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."

				})
			}
		})
		.catch((error) => {
        	console.error("Error adding product to cart:", error);
        	// Handle error (e.g., show an error message to the user)
      	});
	}

	useEffect(() => {
		setLoading(true);
		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
		.then(res => {
		    if (!res.ok) {
		        throw new Error(`Failed to fetch product details: ${res.statusText}`);
		        }
		        return res.json();
		})
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
		.finally(() => {
        	setLoading(false);
      	});
	}, [productId]);

	return (
		<Container className="mt-5">
		<Row className="mt-3 mb-3">
			<Col lg={{ span: 6, offset: 3}}>
				<Card className="p-3">
					<Card.Body className="text-center">
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className="mb-2">Description</Card.Subtitle>
						<Card.Text className="mb-3">{description}</Card.Text>
						<Card.Subtitle className="mb-2">Price</Card.Subtitle>
						<Card.Text>₱ {price}</Card.Text>
						<Card.Subtitle className="mb-2">Details</Card.Subtitle>
						<Card.Text>'Supply more information'</Card.Text>
						{loading 
						? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )
            : (user.id !== null) ?
						<AddToCart
                productId={productId}
                quantity={quantity}
                updateItemCount={(productId, newQuantity) => setQuantity(newQuantity)}
                addToCart={addToCart}
            />
						:
						<Link className=" btn btn-danger btn-block" to="/login">Log in to order</Link>
						}
						
					</Card.Body>
				</Card>
			</Col>
		</Row>
		</Container>

	)
}