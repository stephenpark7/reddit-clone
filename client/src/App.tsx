import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Category from './pages/Category';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import './stylesheets/App/App.css';

import { UserContext } from './UserContext';

export default function App() {
  const [userData, setUserData] = useState({
    "user_id": "",
    "username": "",
    "access_token": "",
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserData(JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/login'><LogIn /></Route>
          <Route exact path='/category/:categoryId'><Category /></Route>
          <Route exact path='/category/:categoryId/:postId'><Post /></Route>
          <Route path='*'><NotFound /></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}