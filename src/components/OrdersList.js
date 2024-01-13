// OrdersList.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function OrdersList({ ordersList }) {

	if(!ordersList || ordersList.length === 0) {
		console.error("Invalid or empty order list:", ordersList);
		return <p> No orders to display </p>;
	}


	return (
		<>
			<ul>
				{ordersList.map((order) => (
					<li key={order._id}>
						<p>Order ID: {order.orderId} | Status: {order.status} <Link className=" btn btn-success" to={`/orders/${order.orderId}`
							}>View Details</Link></p>

						{/*{order.items && order.items.length > 0 && <OrdersList ordersList={order} />}*/}
					</li>
				))}
			</ul>
		</>	
	);
}