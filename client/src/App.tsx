import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import './stylesheets/App.css';

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
    // TODO: retrieve post data
  }, []);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route exact path='/signup'><SignUp /></Route>
          <Route exact path='/login'><LogIn /></Route>
          <Route path='/404'><NotFound /></Route>
          <Redirect from='*' to='/404' />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}