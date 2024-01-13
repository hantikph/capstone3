// PasswordChange.js
import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function PasswordChange() {

	const { user } = useContext(UserContext);
	const token = localStorage.getItem('token');
	
	// Forms state
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// state for editPassword Modals
	const [showEdit, setShowEdit] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	
	// Function for opening the modal
	const openEdit = () => {
		
		// Open the modal
		setShowEdit(true);
	}

	const closeEdit = () => {
	    // Perform other cleanup actions here
	    setCurrentPassword("");
	    setNewPassword("");
	    setConfirmPassword("");
	    setPasswordsMatch(true);

	    setShowEdit(false);
	};

	// Function for handling password change submission
	const handlePasswordChange = (e) => {
	    e.preventDefault();
	    // Validate password fields here if needed

	    // Perform the password change API request
	    fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/password`, {
	      method: 'PUT',
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${token}`,
	      },
	      body: JSON.stringify({
	        currentPassword,
	        newPassword,
	        confirmPassword,	        
	      }),
	    })
	      .then((res) => res.json())
	      .then((data) => {
	        // Handle the response, update user context, or show notifications
	        if(data.message === 'Password updated') {

	          Swal.fire({
	            title: "Password Changed!",
	            icon: "success",
	            text: "Your password is updated."
	          })

          	} else {

          		Swal.fire({
		            title: "Error in update!",
		            icon: "error",
		            text: "Cannot change password.",
		        })
          	}

	        // You can also close the modal if the password change is successful
	        closeEdit();
	      })
	      .catch((error) => {
	        console.error('Error changing password:', error);
	        // Handle errors, show error messages, etc.
	      });
	};

	  return (
	    <>
	      <Button variant="danger" size="sm" onClick={openEdit}>
	        Change Password
	      </Button>
	      {/* Edit Modal */}
	      <Modal show={showEdit} onHide={closeEdit}>
	        <Form onSubmit={handlePasswordChange}>
	          <Modal.Header closeButton>
	            <Modal.Title>Change Password</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            <Form.Group>
	              <Form.Label>Current Password</Form.Label>
	              <Form.Control
	                type="password"
	                value={currentPassword}
	                onChange={(e) => setCurrentPassword(e.target.value)}
	                required
	              />
	            </Form.Group>
	            <Form.Group>
	              <Form.Label>New Password</Form.Label>
	              <Form.Control
	                type="password"
	                value={newPassword}
	                onChange={(e) => setNewPassword(e.target.value)}
	                required
	              />
	            </Form.Group>
	            <Form.Group>
	              <Form.Label>Confirm New Password</Form.Label>
	              <Form.Control
	                type="password"
	                value={confirmPassword}
	                onChange={(e) => {
	                	setConfirmPassword(e.target.value);
	                	setPasswordsMatch(e.target.value === newPassword);
	                }}
	                required
	              />
	              {/* Display an error message if passwords don't match */}
	                {!passwordsMatch && (
	                  <Form.Text className="text-danger">
	                    New Passwords do not match.
	                  </Form.Text>
	                )}
	            </Form.Group>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button variant="secondary" onClick={closeEdit}>
	              Close
	            </Button>
	            <Button variant="success" type="submit">
	              Update Password
	            </Button>
	          </Modal.Footer>
	        </Form>
	      </Modal>
	    </>
	  );
};