import React, { useContext, useEffect, useState } from 'react'
import UserProfileCard from '../components/UserProfileCard';
import IndividualPostCard from '../components/IndividualPostCard';
import Context from '../context/Context';

const Profile = () => {

    const [individualPosts, setIndividualPosts] = useState('');
    const {user} = useContext(Context);

    useEffect(() => {
        fetchIndividualPosts();
    }, [])

    const fetchIndividualPosts = async (event) => {
        const response = await fetch('/instagram/posts/individualPosts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token1')
            }
        })

        const result = await response.json();
        setIndividualPosts(result);
    }

    return (
        <>
            <div className='p-3 mt-[75px]'>
                { user &&
                    <UserProfileCard post={user} />
                }
                <hr />
                <div className='flex flex-wrap justify-center'>
                {individualPosts.length !== 0 &&
                    individualPosts.map((elem, index) => {
                        return <IndividualPostCard post={elem} key={index} />
                    })
                }
                </div>
            </div>
        </>
    )
}

export default Profile