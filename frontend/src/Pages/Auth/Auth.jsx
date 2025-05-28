import React from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import { Link } from 'react-router-dom'
import classes from './signup.module.css'

function Auth() {
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to=''>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnsUbgoMogU5PjZwKQuYFBj5Tb9m5JrBj-M2XL4gZw4KnIYvE7WwTOEtl0727CZukUUk&usqp=CAU" alt="Amazon logo" />
      </Link>


      {/* form */}
      <div className={classes.login_container}>
      <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={classes.login_signInButton}>Sign in</button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button className={classes.login_registerButton}>Create your Amazon Account</button>
      </div>
  
    </section>
    
  )
}

export default Auth
