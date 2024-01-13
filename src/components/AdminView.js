// AdminView.js
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditProduct from './EditProduct';
import ArchiveProduct from  './ArchiveProduct';
import AddProduct from  './AddProduct';

export default function AdminView({ productsData, fetchData }) {
  
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  //Getting the productsData from the products page
    useEffect(() => {
    	const productsArr = productsData.map(product => {

    		return(

    			<tr key={product._id}>
    			  <td>{product._id}</td>
    			  <td>{product.name}</td>
    			  <td>{product.description}</td>
    			  <td>{product.price}</td>
    			  <td className={
    			  	product.isActive ?
    			  	'text-success'
    			  	:
    			  	'text-danger'
    			  }>
    			    	{product.isActive ? 'Available' : 'Unavailable'}
  			    	</td>
    			     <td>
    			        <EditProduct product={product._id} fetchData={fetchData} />
    			    </td>
    			      <td>
    			        <ArchiveProduct productId={product._id} isActive={product.isActive} fetchData={fetchData} />            
    			        </td>
    			</tr>
			)
    	})

    	setProducts(productsArr);

    }, [productsData, fetchData])

    return (
    	<>
    	<h1 className="text-center my-4"> Product Manager </h1>
    	<div className="d-flex justify-content-center p-1">
    		{showAddProduct
    		? <Button variant="warning" onClick={() => setShowAddProduct(false)}>Add Product</Button>
    		:	<Button variant="danger" onClick={() => setShowAddProduct(true)}>Add Product</Button>}
    	</div>
    	{showAddProduct && (
        <AddProduct
          onClose={() => setShowAddProduct(false)}
        />
      )}
    	<Table striped bordered hover responsive>
	        <thead>
	        	<tr className="text-center">
		          <th>ID</th>
		          <th>Name</th>
		          <th>Description</th>
		          <th>Price</th>
		          <th>Availability</th>
		          <th colSpan="2">Actions</th>
          	</tr>
	        </thead>

	        <tbody>
	          {products}
	        </tbody>
        </Table>
        </>
    )
  };

