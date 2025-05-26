import React from 'react'
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Signup from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Order from './Pages/Orders/Order'
import Cart from './Pages/Cart/Cart'
import Result from './Pages/Result/Result'
import ProductDetails from './Pages/ProductDetail/ProductDetails'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Signup />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/catagory/:catagoryName' element={<Result />} />
        <Route path='/products/:productId' element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>

    </Router>

  )
}

export default Routing
