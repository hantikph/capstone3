// Products.js
import { useEffect, useState, useContext, useCallback } from 'react';
// import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {

	const { user } = useContext(UserContext);

	const [ products, setProducts ] = useState([]);

	const fetchData = useCallback(() => {

		console.log('Fetching products...');

		const fetchRoute = user.isAdmin
		  ? `${process.env.REACT_APP_API_URL}/products/all`
		  : `${process.env.REACT_APP_API_URL}/products/active`;

		const fetchOptions = user.isAdmin
		  ? {
		      headers: {
		        Authorization: `Bearer ${localStorage.getItem('token')}`,
		      },
		    }
		  : {};

		fetch(fetchRoute, fetchOptions)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// Sets the 'data' into the 'products' array.
			setProducts(data);

		})
		.catch(error => {
			console.error('Error with fetch:', error);
		});
		// for useCallback info
	}, [user.isAdmin]);

		console.log(products)

	// Retrieves products from the database upon intial render of the <Products/>

	useEffect(() => {

		fetchData()

	}, [fetchData]);

	// Component Body
	return (
		<>	
			{
				(user.isAdmin === true) ?
				// Pass the fetchData as props
					<AdminView productsData={products} fetchData={fetchData} />
					:
					<UserView productsData={products} />
			}
		</>
	)
};