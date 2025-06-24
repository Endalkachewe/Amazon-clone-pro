import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment';
import Order from './Pages/Orders/Order';
import Cart from './Pages/Cart/Cart';
import Result from './Pages/Result/Result';
import ProductDetails from './Pages/ProductDetail/ProductDetails';
import Auth from './Pages/Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51RUAAr2LUvicsuAWmPD3JbOagEzbH52mMdcfl4HMmDsGfjxVbAu5hwLUNGXrdN2ErXBH3fs4mkYH6xWytpsdoV2C00w6yANfle');

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/payments' element={
          <ProtectedRoute msg={"You must log in to pay"}redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute msg={"You must log in to see your orders"} redirect={"/orders"}>
            <Order />
          </ProtectedRoute>
        } />
        <Route path='/catagory/:catagoryName' element={<Result />} /> 
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
