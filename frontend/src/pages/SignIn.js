import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

    const Navigate = useNavigate();
    const [details,setDetails] = useState({email:'',password:''});
    
    const SubmitDetails = async (event)=>
    {
        event.preventDefault();
        const response = await fetch('/instagram/auth/login',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email: details.email, password: details.password})
        });

        const result = await response.json();

        if(result.success)
        {
            localStorage.setItem('token1',result.authToken);
            Navigate('/');
        }
    }

    const fillDetails = (event)=>
    {
         setDetails({...details,[event.target.name]:event.target.value});
    }
    return (
        <>
            <div className='w-full h-[calc(100vh-2.5rem)] flex justify-center items-center'>
                <div className=' w-72 h-72 bg-slate-200 rounded-xl p-3 flex flex-col items-center'>
                    <div className='p-3'>
                        <img src="/images/InstagramText.png" className='w-24 m-auto' alt="logo" />
                    </div>
                    <div className='p-3'>
                        <form action="login" className='flex flex-col items-center'>
                            <div className='userInput relative'>
                                <input type="email" className='my-2 py-1 px-2 text-sm bg-slate-200 outline-none border-b-2 border-black' id='email' name='email' autoComplete='email' required onChange={fillDetails}/>
                                <label htmlFor="email" className='absolute left-0 py-2 text-slate-500'>username/email</label>
                            </div>
                            <div className='passInput relative'>
                                <input type="password" className='my-2 py-1 px-2 text-sm bg-slate-200 outline-none border-b-2 border-black' id='password' name='password' autoComplete='new-password'  required onChange={fillDetails}/>
                                <label htmlFor="password" className='absolute left-0 py-2 text-slate-500'>password</label>
                            </div>

                            <button className='px-5 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold mt-5 rounded-xl' onClick={SubmitDetails}>Login</button>
                        </form>
                    </div>
                    <div className='flex items-center px-3'>
                        <p className='text-xs'>don't you have an account?</p>
                        <Link to='/signup' className='text-xs p-1 text-blue-600'>signup</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn