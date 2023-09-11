import React, { useEffect, useState } from 'react'
import Context from './Context'

const AppContext = (props) => {

    const [user, setUser] = useState();
    const [data,setData] = useState();

    useEffect(()=>
    {
       fetchUserDetails();
    },[])

    const fetchUserDetails = async ()=>
    {
        const response = await fetch('/instagram/auth/getUser',{
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "authToken" : localStorage.getItem('token1')
            }
        })

        const userDetails = await response.json();
        setUser(userDetails);
    }

    console.log(user);

    const fetchPosts = async ()=>
    {
        const response = await fetch('/instagram/posts/posts',
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const result = await response.json();
        setData(result.reverse());
    }

    return (
        <Context.Provider value = {{user,setUser,data,setData, fetchPosts, fetchUserDetails}}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext