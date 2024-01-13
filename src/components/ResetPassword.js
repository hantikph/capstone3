// ResetPassword.js

import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ResetPassword({ show, handleClose, userEmail }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(newPassword !== '' && confirmPassword !== '');
  }, [newPassword, confirmPassword]);

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      // Check if newPassword and confirmPassword match
      if (!passwordsMatch) {
        throw new Error('Input passwords do not match');
      }

      // Make API request to reset the password
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/reset-pwd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          newPassword,
          confirmPassword,
        }),
      });

      if (response.ok) {
        // Display success message
        Swal.fire({
          title: 'Password Reset Successful',
          icon: 'success',
          text: 'Your password has been successfully reset.',
        });

        // Redirect to login page after password reset
        navigate('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: 'Password Reset Failed',
        icon: 'error',
        text: error.message || 'An error occurred during password reset.',
      });
    } finally {
      // Clear form fields and data 
      setNewPassword('');
      setConfirmPassword('');

      // Close the modal
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={resetPassword}>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
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

          <Button variant="primary" type="submit" id="submitBtn" disabled={!isActive}>
            Reset Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
