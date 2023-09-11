import React from 'react'

const UserProfileCard = (props) => {

    const {post} = props;

  return (
    <>
        <div className='flex my-10 items-center'>
            <div className='w-10 cursor-pointer'>
                   <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="logo" />
            </div>
            <div>
                 <h3 className='ml-3 text-lg font-bold'>{post.name}</h3>
            </div>
        </div>
    </>
  )
}

export default UserProfileCard