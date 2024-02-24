import React, { useState } from 'react'
import  { Link ,useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

function Signin() {
  const [formData, setFormData] = useState({})
  const {loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange  = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });

  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', 
      {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      }
      );
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.message));
    }
    
    
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>

<h1 className='text-xl text-center font-semibold mt-4 '>Welcome Back!</h1>
      <h1 className='text-3xl text-center font-semibold mt-4 text-green-600'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
       
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email'  onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

        <button disabled={loading} className='bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80'>
          {loading ? 'Loading...': 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 font-bold mt-5'>
        <p>Dont Have an account? </p>
        <Link to={'/sign-up'}>
          <span className='text-green-600'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin