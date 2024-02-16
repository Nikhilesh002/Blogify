import React,{useState,useEffect} from 'react';
import {Container,PostCard} from '../components/index';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';

function Home() {

  const [posts,setPosts]=useState([]);
  const userData = useSelector((state) => state.auth.userData);
  let myposts=[];

  useEffect(()=>{
    appwriteService.getPosts()
    .then((post)=>{
      if(post.documents && userData){
        myposts=post.documents.filter(x=>x.userId===userData.$id);
        setPosts(myposts);
      }
    })
    .catch(error=>{
      console.log('AppWrite Service error :: getPost :: Home :: ',error);
    })
  },[posts,userData])

  //console.log(userData);
  //console.log(posts);

  if(posts.length===0){
    return(
      <div className="w-full pt-16 text-center h-96 bg-gray-300">
        <Container>
          <div className="w-full ">
            <h1 className="text-3xl text-black font-bold hover:text-gray-700">
              Login to read posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
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

export default Home;