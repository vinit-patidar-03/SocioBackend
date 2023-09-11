import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();

  useEffect(()=>
  {

  },[location])

  const logOut = ()=>
  {
     alert("Would you like to sign out?")
     localStorage.removeItem('token');
  }
  return (
    <>
        <nav className='bg-white flex items-center justify-center fixed top-0 w-full shadow-md z-50'>
            <ul className='flex justify-between items-center w-full p-1'>
                <li>
                <img src="/images/SociogramLogo.png" className='h-16' alt="logo" />
                </li>
                <li>
                <Link to='/' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup'?'hidden':''}`}><i className="fa-solid fa-house fa-lg"></i></Link>
                <Link to='/profile' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup'?'hidden':''}`}><i className="fa-solid fa-user fa-lg"></i></Link>
                <Link to='/post' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup'?'hidden':''}`}><i className="fa-solid fa-square-plus fa-lg"></i></Link>
                <Link to='/login' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup'?'hidden':''}`} onClick={logOut}><i className="fa-solid fa-right-from-bracket fa-lg"></i></Link>
                <Link to='/login' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/' || location.pathname === '/post' || location.pathname === '/profile'?'hidden':''}`}>Login</Link>
                <Link to='/signup' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/' || location.pathname === '/post' || location.pathname === '/profile'?'hidden':''}`}>SignUp</Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar