import React from 'react'
import PostCard from '../components/CreatePostCard'

const PostPage = () => {
    return (
        <>
            <div className='mx-auto mt-[75px]'>
                <div className=' w-[100vw] h-[89vh] flex justify-center items-center'>
                    <PostCard />
                </div>
            </div>
        </>
    )
}

export default PostPage