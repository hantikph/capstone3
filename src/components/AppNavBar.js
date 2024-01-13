// AppNavBar.js
// React-Bootstrap Component
import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar() {

	const { user } = useContext(UserContext);

	return (

		// JSX React-Bootstrap code
			<Navbar bg="secondary" color="text-primary" expand="lg" sticky="top">
			    <Container fluid>

			        <Navbar.Brand as={NavLink} to="/" exact>Happy Cat Goods</Navbar.Brand>
			        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
			        <Navbar.Collapse id="basic-navbar-nav">
			            <Nav className="ml-auto">
			            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
			            <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
			            <Nav.Link as={NavLink} to="/search" exact>Search</Nav.Link>
			            
			            {(user.id !== null) 
			                       ?
			                       <>
			                         {(user.isAdmin)
			       	                    ?
			                           <Nav.Link as={NavLink} to="/adminDashboard" exact>Dashboard</Nav.Link>
			                           :
			                           <Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>
			                         }
			                         <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
			                       </>
			                       :
			                       <>
			                         <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
			                         <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link> 
			                       </>
			            }

			            </Nav>
			        </Navbar.Collapse>
			    </Container>
			</Navbar>

		)
}