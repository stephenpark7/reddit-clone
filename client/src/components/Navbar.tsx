import { NavLink } from 'react-router-dom';

import '../stylesheets/Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <NavLink className='homepage' to='/' exact>untitled</NavLink>
      <NavLink className='nav-link sign-up' to='/signup' exact>sign up</NavLink>
      <NavLink className='nav-link log-in' to='/login' exact>log in</NavLink>
    </div>
  );
}