import React from 'react'
import {FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <header className='bg-slate-200 shadow-sm'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link  to='/'>
        <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap gap-1'>
            <span className='text-blue-950'>RD </span>
            <span className='text-green-500'> EState</span>
        </h1>
        </Link>
        
        <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
            <input 
            type="text" 
            placeholder='search....' 
            className='bg-transparent focus:outline-none w-24 sm:w-64' 
            />
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:text-green-500 transition duration-200 font-bold'>Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:text-green-500 transition duration-200 font-bold'>About</li>
            </Link>
            
            <Link to='/profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                ):(
                    <li className=' text-slate-700 hover:text-green-500 transition duration-200 font-bold'>Sign In</li>
                )}
                
            </Link>
        </ul>
        </div>
    </header>
  )
}

export default Header