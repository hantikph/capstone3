import React, { useState, useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import './App.css';


// Import pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import OrdersView from "./pages/OrdersView";
import Checkout from "./pages/Checkout";

import PageError from "./pages/PageError";


function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear()
  }

  useEffect(() => {


    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    // initial step to convert into JSON data
    .then(res => res.json())
    // perform the task on the 'data' object containing the fetched information 
    .then(data => {
      // console.log(data);

      if(typeof data._id !== "undefined") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {
        setUser({
          id: null,
          isAdmin: null
        });

      }
    })

  }, [])

  // console.log(user);

  return (
    
// JSX, add <></> - fragments
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/orders/:orderNo" element={<OrdersView />} />
            <Route path="/orders/checkout/" element={<Checkout />} />

            <Route path="*" element={<PageError />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
