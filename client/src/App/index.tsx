import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SignUp, LogIn } from './pages';
import Category from './pages/Category/';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import { Navbar } from './shared/components/Navbar';
import { UserData } from './shared/types/UserData';
import './styles/App.scss';

import { DefaultUserState, UserContext } from './shared/utils/userContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [ userData, setUserData ] = useState<UserData>(DefaultUserState);

  useEffect(() => {
    const setToken = () => {
      const token = localStorage.getItem('token');
      if (token) setUserData(JSON.parse(token));
    };
    setToken();
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ state: userData, setState: setUserData }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/category/:categoryName' element={<Category />} />
            <Route path='/category/:categoryName/:postId' element={<Post />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
};
