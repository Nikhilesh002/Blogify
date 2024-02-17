import React from 'react';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import AddPost from './pages/AddPost.jsx';
import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import { AuthLayout } from './components/index.js';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/Blogify">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
            <Route path="/all-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
            <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
            <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="*" element={<div className='text-4xl text-center my-64'>404 Error</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);
