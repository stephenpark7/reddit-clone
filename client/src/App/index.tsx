import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Category from './pages/Category/';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Navbar from './shared/components/Navbar';
import { UserData } from './shared/types/UserData';
import './styles/App.scss';

import { DefaultUserState, UserContext } from './shared/utils/userContext';

export default function App() {
  const [userData, setUserData] = useState<UserData>(DefaultUserState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserData(JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{state: userData, setState: setUserData}}>
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
