import React, { useContext } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from './cart.module.css'
import { Type } from '../../Utility/action.type'
import { IoIosArrowUp } from "react-icons/io";
import Payment from '../Payment/Payment'
import { IoIosArrowDown } from "react-icons/io";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0
  
  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  
  const decreament = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }
  


  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {
            basket?.length === 0 ? (
              <p>Oops! No items in your cart.</p>
            ) : (
              basket?.map((item,i) => ( 
                <section className={classes.cart_product}>
                <ProductCard
                  key={i} 
                  product={item}
                  renderDescription={true}
                  renderAdd={false}
                  flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={() => increament(item)}><IoIosArrowUp size={30} /></button>
                    <span>{ item.amount}</span>
                    <button className={classes.btn} onClick={()=>decreament(item.id)}><IoIosArrowDown size={30} /></button>
                  </div>

                  </section>
              ))
            )
          }
        </div>
        {/* subtotal */}
        {basket?.length !== 0 && (
        <div className={classes.subtotal}>
          <div>
            <p>Subtotal ({basket?.length} items)</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payments">Continue to checkout</Link>
        </div>
      )}
</section>
    </LayOut>
  )
}

export default Cart
