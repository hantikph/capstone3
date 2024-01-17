// OrdersView.js
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import UserContext from '../UserContext';
import Checkout from '../pages/Checkout';
import RemoveFromCart from '../components/RemoveFromCart';

export default function OrdersView() {

	const { user } = useContext(UserContext);
	const { orderNo } = useParams();
	const [ orderData, setOrderData ] = useState({});
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const [checkoutClicked, setCheckoutClicked] = useState(false);
	const navigate = useNavigate();
	

	const token = localStorage.getItem('token');

	const fetchOrderData = async () => {
	  try {
	    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderNo}`, {
	      method: 'GET',
	      headers: {
	        Authorization: `Bearer ${token}` 
	      },
	    });

	    // console.log('response: ', response);

	    if(response.ok) {
	      const data = await response.json();
	      setOrderData(data);
	      itemOrderData(data);
	    } else {
	      const errorData = await response.json();
	      console.error(errorData);
	    }
	  } catch (error) {
	    // console.log('An error occurred. Please try again.');
	    console.error(error);
	  }
	};

	const itemOrderData = async (orderData) => {
		
		setLoading(true);

		try {
			const updatedItems = await Promise.all(
				orderData.items.map(async (item) => {
					
					try {
						const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${item.productId}`, {
						    method: 'GET',
						  });

						  // console.log('response: ', response);

						  if(response.ok) {
						    const productData = await response.json();
						    return { ...item, productName: productData.name };
						  } else {
						    console.error(`Failed to fetch: details for ${item.productId}`);
						    return item;
						  }
						} catch (error) {
						  // console.log('An error occurred fetching product details. Please try again.');
						  console.error(error);
						  return item;
						}
				}))
		// console.log('Updated order data: ', { ...orderData, items: updatedItems});
		setOrderData({ ...orderData, items: updatedItems});

		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		fetchOrderData();

  }, [orderNo]);


	if(loading) {
		return <p>Loading order data...</p>;
	}
	// if(!orderData || Object.keys(orderData).length === 0) {
	// 	return <p>Loading...</p>;
	// }

	const { _id, items, totalAmount, createdOn, checkoutDate } = orderData;

	// console.log("Order data items: ", orderData.items);

	const handleOrderCheckout = () => {
	  setCheckoutClicked(true);
	}

	const handleBackToProfile = () => {
	  navigate('/profile');
	};

	return (
		(user.id === null) ?
		< Navigate to="/products" />
		:
	    <>
	      <h3>Order Details</h3>
	      <Table striped bordered hover responsive>
		    	<tbody>
		    		<tr>
		    			<td colSpan="3">Order ID: {_id}</td>
	      				<td colSpan="3">Total Amount: ₱ {totalAmount}</td>
      				</tr>
	      			<tr>
	      				<td colSpan="3">Created On: {new Date(createdOn).toLocaleString()}</td>
	      				<td colSpan="3">Checkout Date: {checkoutDate ? new Date(checkoutDate).toLocaleString() : "Not checked out"}</td>
      				</tr>
      			</tbody>
			</Table>
	      <h3>Items:</h3>
	      <Table striped bordered hover responsive>
		    	<thead>
		        	<tr className="text-center">
			          <th className="col-3">Product Name</th>
			          <th className="col-2">Order Quantity</th>
			          <th className="col-2">Item Price</th>
			          <th className="col-2">Item Subtotal</th>
			          <th className="col-3">Remove Items</th>
	          		</tr>
		        </thead>
		        <tbody>
		          {items && items.length > 0 && items.map((item, index) => (
		            <tr className="text-center" key={index}>
		              <td className="col-3">{item.productName}</td>
		              <td className="col-2">{item.quantity}</td>
		              <td className="col-2">₱ {item.itemPrice}</td>
		              <td className="col-2">₱ {item.subTotal}</td>
		              <td className="col-3">
		              	{checkoutDate ?
		              		<Button variant="secondary" disabled="true">Checked Out</Button>
		              		:
		              		<RemoveFromCart
		              		orderData={orderData}
		              		productId={item.productId}
		              		quantity={item.quantity || quantity}
		              		updateItemCount={(productId, newQuantity) => setQuantity(newQuantity)}
		              		fetchOrderData={fetchOrderData}
	              			/>
	              		}
		              </td>
		            </tr>
		          ))}
		        </tbody>
	      </Table>
	      <Button onClick={handleBackToProfile}>Back to Profile</Button>
	      {checkoutDate ?
	      	<></>
	      	:
	      	<>
	      		<Button className="btn-danger" onClick={() => handleOrderCheckout(orderData._id)}>Checkout Order</Button>
	      		{checkoutClicked && <Checkout orderId={orderData._id} />}
      		</>
	      }
	      
	    </>
	);
};
