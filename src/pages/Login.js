// Login.js
import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import ResetPassword from '../components/ResetPassword';


// Allows us to consume the User context and it's properties to use for validation
export default function Login() {

  const { user, setUser } = useContext(UserContext);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ isActive, setIsActive ] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // useEffect: executes on page load as the first step; for doing specific tasks each time a component loads, and changes in States. Often an arrow function {} for conditional function, and [] array options 'watch list' for changed States
  useEffect(() => {

      setIsActive(email !== '' && password !== '');
  
  }, [email, password]);

  function authenticate(e) {

    // Prevent page redirection via form submission
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.access){
        // built-in global object == localStorage; set 'token' of the authenticated user in the local storage
        localStorage.setItem("token", data.access)

        // call function for retrieving user details
        retrieveUserDetails(data.access);

      } else {
        // alert(`${email} does not exist`);
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: "Check your login details and try again"
        })
      }

      // Clearing our input fields after submission
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      // Handle other errors
      console.error('Error during authentication: ', error);
      // Display error message
            Swal.fire({
              title: "Login failed",
              icon: "error",
              text: "Error using the details provided. Please try again.",
            });
    })

    
  }

  const retrieveUserDetails = (token) => {
    // this GET request from MongoDB (s43-s48) needs authorization in the form of a bearer token, contained in the headers object 
    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    // initial step to convert into JSON data
    .then(res => res.json())
    // perform the task on the 'data' object containing the fetched information 
    .then(data => {

      setUser({
        id: data._id,
        isAdmin: data.isAdmin,
        firstName: data.firstName
      })

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        text: `Welcome to Happy Cat, ${data.firstName}`
      })

    })
  }

  const handleForgotPassword = () => {
      if (!email) {
        Swal.fire({
          title: "Email Required",
          icon: "error",
          text: "Please input your email address on the space provided.",
        });
      console.log("userEmail prop: ", email);
        return;
      }
      console.log("userEmail prop: ", email);
      setShowResetPassword(email);
    };

  const handleCloseResetPassword = () => {
    // Clearing our input fields after submission
    setEmail('');
    setPassword('');
    // Close the ResetPassword component
    setShowResetPassword(false);
  };

  


// Two way data binding in 'Form Control' == value={<object content>} onChange={(e) => <setObject(e.target.value)}
  return (
    (user.id !== null) ?
    < Navigate to="/products" />
    :
    // onSubmit={trigger function}
    <>
      <Form onSubmit={(e) =>authenticate(e)}>
        <h1 className="my-5 text-center">Login</h1>
          <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
              />
          </Form.Group>

          <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
              />
          </Form.Group>

{/* Review: this ternary operation is a simplified if(?) else(:) function
*/}
          {isActive ? (
            <Button variant="primary" type="submit" id="submitBtn">
              Log In
            </Button>
          ) : (
            <Button variant="secondary" type="submit" id="submitBtn" disabled>
              Log In
            </Button>
          )}

          {/* Show the ResetPassword component when needed */}
          <Button variant="danger" onClick={handleForgotPassword}>
            Forgot Password
          </Button>
          {showResetPassword && (
        <ResetPassword show={showResetPassword} handleClose={handleCloseResetPassword} userEmail={email} />
      )}
        </Form>
    </>

    )
}