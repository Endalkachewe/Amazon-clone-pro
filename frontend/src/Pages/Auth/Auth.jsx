import React, { useState, useContext } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import classes from './signup.module.css'
import { auth } from '../../Utility/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import { DotLoader } from 'react-spinners'

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log(email, password);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  
  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()
  // console.log(navStateData);

  const authHandler = async(e) => {
    e.preventDefault()
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({...loading, signIn:true})
      // firebase auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user:userInfo.user
          })
          setLoading({ ...loading, signIn: false })
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading({...loading, signUp:false})
        });
    } else {
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user:userInfo.user
          })
          setLoading({ ...loading, signUp: false })
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading({...loading, signUp:false})
        });
    }
}



  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to='/'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnsUbgoMogU5PjZwKQuYFBj5Tb9m5JrBj-M2XL4gZw4KnIYvE7WwTOEtl0727CZukUUk&usqp=CAU" alt="Amazon logo" />
      </Link>


      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
        <small
          style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {navStateData.state.msg}
        </small>
      )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type='submit' onClick={authHandler} name='signin' className={classes.login_signInButton}>
          {loading.signIn ? (
          <DotLoader color="#000" size={15}></DotLoader>
          ) : (
          " Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button type='submit' onClick={authHandler} name='signup' className={classes.login_registerButton}>
        {loading.signUp ? (
          <DotLoader color="#000" size={15}></DotLoader>
          ) : (
          " Create your Amazon Account"
          )}
        </button>
        
        {
          error && <small style={{paddingTop:"px", color:"red"} }>
            {error}
          </small>
        }
      </div>
  
    </section>
    
  )
}

export default Auth
