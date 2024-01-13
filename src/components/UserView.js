// UserView.js
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard";


function UserView({ productsData }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const productsArr = productsData.map((product) => (
      <ProductCard productProp={product} key={product._id} />
    ));

    setProducts(productsArr);
  }, [productsData]);
  
  return (
    <>
      {products}
    </>
  )
}

export default UserView;