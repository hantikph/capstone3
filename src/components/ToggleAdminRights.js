// ToggleAdminRights.js
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ToggleAdminRights({ email, isAdmin, fetchUsersData }) {

	const handleStatusUpdate = (success, actionType) => {
	  const successMessage = `Admin rights are updated to:  ${actionType === "set-admin" ? "Admin" : "Removed"}`;
	  const errorMessage = "Error in update. Try again later.";

	  Swal.fire({
	    title: success ? "Success" : "Error",
	    icon: success ? "success" : "error",
	    text: success ? successMessage : errorMessage
	  });

	  fetchUsersData();

	};

	const toggleAdminStatus = (email, actionType) => {
	  const url = `${process.env.REACT_APP_API_URL}/users/${actionType}`;

	  fetch(url, {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/json",
	      "Authorization": `Bearer ${localStorage.getItem('token')}`
	    },
	    body: JSON.stringify({ "email" : email }),
	  })
	    .then(res => {
	    	if (!res.ok) {
	    		throw new Error(`HTTP error! Status: ${res.status}`);
		      }
		      return res.json();
		    })
	    .then(data => handleStatusUpdate(!!data, actionType))
	    .catch(error => {
	      console.error("Error:", error);
	      handleStatusUpdate(false);
	    });
	};


	// Reusable StatusToggleButton component
	const StatusToggleButton = ({ isAdmin, onClick, variant, text }) => (
	  <Button variant={variant} size="sm" onClick={onClick}>
	    {text}
	  </Button>

	);


	return (
		<>
			<StatusToggleButton
			  isAdmin={isAdmin}
			  onClick={() => toggleAdminStatus(email, isAdmin ? "revoke" : "set-admin")}
			  variant={isAdmin ? "danger" : "success"}
			  text={isAdmin ? "Remove" : "Set Admin"}
			/>
		</>

	)
}