// Profile.js
import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import OrdersList from '../components/OrdersList';
import RefreshOrderList from '../components/RefreshOrderList';
import PasswordChange from '../components/PasswordChange';

export default function Profile() {

	const { user } = useContext(UserContext);
	const [ userData, setUserData ] = useState({});
  

	useEffect(() => {
	    const token = localStorage.getItem('token');
	    
	    const fetchUserData = async () => {
	    	try {
		        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
		          method: 'GET',
		          headers: {
		            Authorization: `Bearer ${token}` 
		          },
		        });

		        if(response.ok) {
		          const data = await response.json();
		          setUserData(data);
		        } else {
		          const errorData = await response.json();
		          console.error(errorData);
		        }
		    } catch (error) {
	        console.log('An error occurred. Please try again.');
	        console.error(error);
	    	}
    	};

    if(token) {
      fetchUserData();
    }
  }, [ user ])


	return (
		(user.id === null) ?
		< Navigate to="/products" />
		:
    <>
		<Row className="d-flex">
			<Col className="p-5 bg-primary text-white">
			<h1 className="my-5" >Profile</h1>
			<h2 className="mt-3">{userData.firstName} {userData.lastName}</h2>
			</Col>
		</Row>
			<hr />
		<Row>
			<Col>
				<h4>Contact Information</h4>
				<ul>
					<li>Email: {userData.email}</li>
					<li>Mobile No: {userData.mobileNo}</li>
				</ul>
			</Col>
			<Col className="col-3 align-right">
				<PasswordChange />
			</Col>
		</Row>
		
    <Row className="pt-4 mt-4">
      <Col className="d-flex col-md-6">
      	<h3> My Orders </h3>
    	</Col>
    	<Col className="d-flex col-md-3 mr-auto">
    		<h5>Missing Orders?</h5>
    	</Col>
    	<Col className="d-flex col-md-3 ml-auto">
    		<RefreshOrderList />
    	</Col>
    </Row>
    <Row>
    	<OrdersList ordersList={userData.orders} />
    </Row>
    </>

	)
}
