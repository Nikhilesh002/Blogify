import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { logout } from '../store/authSlice';

function LogoutBtn() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  function logoutHandler(){
    authService.logout()
    .then(()=>{
      dispatch(logout());
      navigate('/login');
    })
  }

  return (
    <button className='inline-bock font-mono font-bold text-white text-xl px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
      onClick={logoutHandler} >Logout</button>
  )
}

export default LogoutBtn;