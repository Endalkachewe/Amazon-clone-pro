import React, { useContext, useEffect, useState } from "react";
import LayOut from '../../Component/LayOut/LayOut'
import { db } from "../../Utility/firebase";
import { DataContext } from '../../Component/DataProvider/DataProvider';
import classes from './order.module.css'
import ProductCard from "../../Component/Product/ProductCard";



function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
const [orders, setOrders] = useState([]);

useEffect(() => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
  } else {
    setOrders([]);
  }
}, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length===0 && <div style={{padding:"20px"}}>You do not have orrders</div>}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );

}

export default Order
