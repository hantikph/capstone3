// ArchiveProduct.js
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ productId, isActive, fetchData }) {

	const handleStatusUpdate = (success, actionType) => {
	  const successMessage = `Product status is updated: ${actionType === "archive" ? "Archived" : "Activated"}`;
	  const errorMessage = "Error in update. Try again later.";

	  Swal.fire({
	    title: success ? "Success" : "Error",
	    icon: success ? "success" : "error",
	    text: success ? successMessage : errorMessage
	  });

	  fetchData();
	};

	const toggleProductStatus = (productId, actionType) => {
	  const url = `${process.env.REACT_APP_API_URL}/products/${productId}/${actionType}`;

	  fetch(url, {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/json",
	      "Authorization": `Bearer ${localStorage.getItem('token')}`
	    }
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

	// const archiveToggle = (productId) => {
	//   toggleProductStatus(productId, "archive");
	// };

	// const activateToggle = (productId) => {
	//   toggleProductStatus(productId, "activate");
	// };


	// Example reusable StatusToggleButton component
	const StatusToggleButton = ({ isActive, onClick, variant, text }) => (
	  <Button variant={variant} size="sm" onClick={onClick}>
	    {text}
	  </Button>

	);


	return (
		<>
			<StatusToggleButton
			  isActive={isActive}
			  onClick={() => toggleProductStatus(productId, isActive ? "archive" : "activate")}
			  variant={isActive ? "danger" : "success"}
			  text={isActive ? "Archive" : "Activate"}
			/>
		</>

	)
}