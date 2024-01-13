// RefreshOrderList.js
import { Button } from 'react-bootstrap';

export default function RefreshOrderList() {

  const handleRefreshOrders = () => {
    // Make an API request to update orders for the active user
    fetch(`${process.env.REACT_APP_API_URL}/users/refresh-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to refresh orders: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Orders updated successfully:', data);
        // You can perform additional actions if needed
      })
      .catch(error => {
        console.error('Error refreshing orders:', error);
        // Handle error (e.g., show an error message to the user)
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleRefreshOrders}>Update Orders</Button>
    </>
  );
}
