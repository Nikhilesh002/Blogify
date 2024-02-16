import React from 'react';
import {Container,Logo,LogoutBtn} from '../index';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const navigate=useNavigate();
  const authStatus=useSelector((state)=>state.auth.status);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  return (
    <header className='py-3 shadow bg-black'>
      <Container>
        <nav className='flex'>
          <div className="mr-4">
            <Link to='/'><Logo width='70px' /></Link>
          </div>
          <ul className='flex ml-auto' >
            {
              navItems.map((x)=>
                x.active?(
                  <li key={x.name}>
                    <button className='inline-bock font-mono font-bold text-xl text-white px-6 py-2 duration-200 hover:bg-blue-50 hover:text-black rounded-full'
                      onClick={()=>navigate(x.slug)}>{x.name}</button>
                  </li>
                ):null
              )
            }
            {
              authStatus && (<li><LogoutBtn/></li>)
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;