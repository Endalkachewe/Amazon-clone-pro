import React, { useEffect, useState } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import classes from './Results.module.css'
import ProductCard from '../../Component/Product/ProductCard'

function Result() {
    const { catagoryName } = useParams()
    const [results, setResult] = useState([])  
    useEffect(() => {
        axios.get(`${productUrl}/products/category/${catagoryName}`)
            .then((res) => {
                console.log(res.data);
                setResult(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [catagoryName]) // Add catagoryName to the dependency array
    return (
        <LayOut>
            <section>
                <h1 style={{ padding: "30px" }}> Results </h1>
                <p style={{ padding: "30px" }}> Catagory/{catagoryName}</p> <hr />
                <div className={classes.products_container}>
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            renderDescription={false}
                            renderAdd={true}
                        />
                    ))}
                </div>
            </section>
        </LayOut>
    )
}
export default Result