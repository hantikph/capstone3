// ProductSearch.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: searchQuery }),
      });
      const data = await response.json();
      if (data.length === 0){
        setSearchResults('no results');
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error finding your product:', error);
      setSearchResults('no results');
    }
  };

  return (
    <div>
      <h3>Product Search</h3>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Product List:</h3>
      {
        Array.isArray(searchResults) && searchResults.length > 0 
        ? (
        <ul>
          {searchResults.map((product) => (
            <ProductCard productProp={product} key={product._id} />
          ))}
        </ul> )
        : (
        <h4 className="text-danger text-center">No products to display</h4>
      )}
    </div>
  );
};

export default ProductSearch;
