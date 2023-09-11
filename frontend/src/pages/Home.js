import React, { useContext, useEffect } from 'react'
import CreatedPostCard from '../components/CreatedPostCard';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context'

const Home = () => {
    const Navigate = useNavigate('');
    const { data, fetchPosts, fetchUserDetails} = useContext(Context);

    useEffect(() => {
        fetchPosts();
        userCheck();
        fetchUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const userCheck = () => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }

    // console.log(data);

    return (
        <>{data &&
            <div className=' pt-24'>{
                data.map((elem, index) => {
                    return <CreatedPostCard post={elem} key={index} />
                })
            }
            </div>
        }
        </>
    )
}

export default Home