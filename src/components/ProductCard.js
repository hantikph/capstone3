// ProductCard.js

import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({ productProp }) {
	// Deconstruct the properties into their own variables
	const { _id: productIdFromProps, name, description, price } = productProp;
	const { _id: productIdFromParams } = useParams();

	// console.log("Product ID in Component:", productIdFromProps || productIdFromParams);

	return (

				<Card className="p-3">
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className="mb-2">Description</Card.Subtitle>
						<Card.Text className="mb-3">{description}</Card.Text>
						<Card.Subtitle className="mb-2">Price</Card.Subtitle>
						<Card.Text>₱ {price}</Card.Text>
					<Link className="btn btn-primary" to={`/products/${productIdFromProps || productIdFromParams}`}>Details</Link>
					</Card.Body>
				</Card>

		)
}

// PropTypes are used for validating infomation passed to a component
ProductCard.propTypes = {
	// .shape() method is used to check if a prop object conforms to a specific 'shape'
	productProp: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}