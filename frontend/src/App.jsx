import React, { useEffect, useContext } from 'react';
import Header from './Component/Header/Header'
import LowerHeader from './Component/LowerHeader/LowerHeader'
import Carousel from './Component/Carousel/CarouselEffect'
import Catagory from './Component/Catagory/Catagory'
import Product from './Component/Product/Product'
import Routing from './Routing'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'
import { DataContext } from './Component/DataProvider/DataProvider'

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      // console.log(authUser);
      dispatch({
        type: Type.SET_USER,
        user: authUser
      })
    } else {
      dispatch({
        type: Type.SET_USER,
        user: null,
      });
    }
  });
}, []);
  return (
    <div>
      {/* <Header /> */}
      {/* <Carousel />
      <Catagory />
      <Product/> */}
      <Routing/>
    
    </div>
  )
}

export default App
