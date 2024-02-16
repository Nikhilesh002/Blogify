import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function postCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`} >
      <div className=" max-h-96 w-full bg-gray-100 rounded-lg p-4 shadow-md">
        <div className="w-full m-auto mb-4">
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-52 m-auto ' />
        </div>
        <h2 className='text-xl font-bold text-center'>{title}</h2>
      </div>
    </Link>
  )
}

export default postCard;