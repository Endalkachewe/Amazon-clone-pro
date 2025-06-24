import React from 'react'
import Catagory from '../../Component/Catagory/Catagory'
import Product from '../../Component/Product/Product'
import CarouselEffect from '../../Component/Carousel/CarouselEffect'
import LayOut from '../../Component/LayOut/LayOut'

function Landing() {
  return (
      <div>
    <LayOut>
      <CarouselEffect/>
      <Catagory />
      <Product />
    </LayOut>
    </div>
  )
}

export default Landing
