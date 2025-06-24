import React, { useContext, useState } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import classes from './payment.module.css'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'
import {useElements, CardElement, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import { DotLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import {  useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext)
  
  // Total number of items
  const totalItem = basket?.reduce((amount,item) => {
    return item.amount+amount
  }, 0)
// Total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState()
  const [processing, setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements()
  const navigate=useNavigate()
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
  
    try {
      // 1. backend || functions ---> contact to the client secret
      setProcessing(true)
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total*100}`,
      });
  
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. client side (react side confirmation)
    const {paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      );
      console.log(paymentIntent);
      // 3. after the confirmation --> order firestore database save, clear basket
      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET })
      
      
      setProcessing(false)
      navigate("/orders", { state: { msg: "you have placed new order" } })
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }
  
    // 2. client side (react side confirmation)
  
    
  };


  return (
    <LayOut>
  {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) Items
      </div>
  {/* payment method */}
  <section className={classes.payment}>
    {/* address */}
    <div className={classes.flex}>
        <h3>Delivery Address</h3>
      <div >
            <div>{user?.email}</div>
        <div>123 React Lane</div>
        <div>Chicago, IL</div>
    </div>
    </div>
    <hr />

    {/* product */}
  <div className={classes.flex}>
    <h3>Review items and delivery</h3>
    <div>
      {
        basket?.map((item) => <ProductCard product={item} flex={true}/>)
      }
  </div>
</div>
    <hr />

    {/* card form */}
  <div className={classes.flex}>
    <h3>Payment methods</h3>
          <div className={classes.payment_card_cotainer}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* erro */}
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                {/* Card element */}
                <CardElement onChange={handleChange} />
                {/* Total price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex"}}>
                      <p>Total Order |</p> <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing ? (
                        <div className={classes.loading}>
                          <DotLoader color="gray" size={12}/>
                          <p>Please Wait ....</p>
                        </div>
                      ) : "Pay Now"
                    }
                  
                  </button>
                </div>
              </form>

            </div>
         </div>
  </div>
  </section>
</LayOut>
  )
}

export default Payment
