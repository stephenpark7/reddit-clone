import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home, SignUp, LogIn, Category, Post, NotFound } from './pages';
import { Navbar } from './shared/components/Navbar';
import { getCookiesForUserData } from './shared/utils/cookies';
import { DefaultUserState, UserContext } from './shared/utils/userContext';
import { UserData } from './shared/types/UserData';
import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [ userData, setUserData ] = useState<UserData>(DefaultUserState);
  const queryClient = new QueryClient();

  useEffect(() => {
    const getCookiesAndSetUserData = () => {
      setUserData(JSON.parse(getCookiesForUserData()));
    };
    getCookiesAndSetUserData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <UserContext.Provider value={{ 
        state: userData, 
        setState: setUserData,
      }}>
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
    </QueryClientProvider>
  );
};
