import { useState } from "react";
import {Link,useNavigate}  from 'react-router-dom';
import {login as authLogin} from '../store/authSlice';
import {Logo,Button,Input} from './index';
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from 'react-hook-form';

function Login() {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {register,handleSubmit}=useForm();
  const [error,setError]=useState('');

  async function login(data){
    setError("");
    try {
      const session=await authService.login(data);
      if(session){
        const userData=await authService.getCurrentUser();
        if(userData){
          dispatch(authLogin(userData));
          navigate('/all-posts');
        }
      }
    } catch (error) {
        setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full bg-gray-300 py-8">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 bg-white shadow-lg">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign-in to your account</h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input label='Email : ' placeholder='Enter your email' type='email'
              {...register('email',{
                  required:true,
                  validate:{
                    matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Enter valid Email address'
              }})} />
            <Input label='Password : ' type='password' placeholder='Enter Password'
              {...register('password',{required:true})} />
            <Button className='w-full py-1 text-lg' type='submit' >Sign in</Button>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60"> Don&apos;t have any account?&nbsp;
          <Link to='/signup' className="font-medium text-primary transition-all duration-200 hover:underline">Sign-Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;