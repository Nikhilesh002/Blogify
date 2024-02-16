import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { PostCard } from '../components/index';

function AllPosts() {

  const [posts,setPosts]=useState([]);

  appwriteService.getPost([])
  .then((posts)=>{
    if(posts){
      setPosts(posts.documents)
    }
  })

  //console.log(posts);

  return posts.length===0 ?
    <div className="h-96 bg-gray-300"><h2 className='text-3xl text-center font-bold '>No Posts</h2></div> :
    (
      <div className="min-h-96 bg-gray-300">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {
            posts?.map((x)=>(
              <div key={x.$id} className="p-2">
                <PostCard {...x} />
              </div>
            ))
          }
        </div>
      </div>
    )
}

export default AllPosts;