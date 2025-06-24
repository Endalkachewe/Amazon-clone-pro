import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard';
import classes from './product.module.css'
import Landing from '../../Pages/Landing/Landing';
function Product() {
    const [product, setProduct] = useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                console.log(res);
                setProduct(res.data); // Store the product data in state
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching data:", error); // Handle errors
                setIsLoading(false)
            });
    }, [])
    return (
        <>
            {isLoading?(<Landing/>):(<section className={classes.Product_container}>
            {
            product.map((singleProduct) => (
                <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id } />
                ))}
            </section>)}
            
        </>
    
  )
}

export default Product
