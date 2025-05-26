import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../Component/Product/ProductCard'
import LayOut from '../../Component/LayOut/LayOut'
import Loader from '../../Component/Loader/Loader'

function ProductDetails() {
    const { productId } = useParams()
    // const {product,setProduct}=useState({})
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading]=useState([])
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
                setIsLoading(false)
        })
    },[])
    return (
        <LayOut>
            {isLoading ? <Loader /> : <ProductCard product={product}
                flex={true}
                renderDescription={true}
                renderAdd={true}
            />}
         </LayOut>
  )
}

export default ProductDetails
