import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

import '../stylesheets/Navbar/Navbar.css';

export default function Navbar() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;

  function logOut() {
    if (!userData) return;
    localStorage.removeItem('token');
    setUserData({
      "user_id": "",
      "username": "",
      "access_token": "",
    });
  }

  return (
    <div className='navbar'>
      <NavLink className='nav-title' to='/' exact>asperitas</NavLink>
      {userData.username ?
        <>
          <NavLink className='nav-link' to={'/u/' + userData.username} exact>{userData.username}</NavLink>
          <Link className='nav-link' to={'/'} onClick={logOut}>Log out</Link>
        </>
        :
        <>
          <NavLink className='nav-link' to='/signup' exact>sign up</NavLink>
          <NavLink className='nav-link' to='/login' exact>log in</NavLink>
        </>
      }
    </div>
  );
}