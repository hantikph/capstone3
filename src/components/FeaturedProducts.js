// FeaturedProducts.js
import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProducts from'./PreviewProducts';


export default function FeaturedProducts() {

	const [previews, setPreviews] = useState([]);

	useEffect(() => {

		fetch(`${ process.env.REACT_APP_API_URL}/products/active`)
		.then(res => res.json())
		.then(data => {

			const featured = [];

			const numbers = [];

			const generateRandomNumbers = () => {

				let randomNum = Math.floor(Math.random() * data.length);

				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum);

				} else {
					generateRandomNumbers();
				}
			}

			// Step 3: Select random courses to be added in the featured array

			for(let i=0; i < 3; i++) {
				generateRandomNumbers();

				featured.push(
					<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={3} />)
			}

			// Step 4: Update the 'previews' state using the 'featured' array

			setPreviews(featured);
		})
	}, [])

	return (
		<>
			<h2 className="text-center">Hot Items</h2>
			<CardGroup className="justify-content-center">
				{previews}
			</CardGroup>
		</>

	)
}