// import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  console.log(location);

  return (
    <div className='navbar'>
      <NavLink className='homepage' to='/' exact>untitled</NavLink>
      <NavLink className='sign-up' to='/signup' exact>sign up</NavLink>
      <NavLink className='log-in' to='/login' exact>log in</NavLink>
    </div>
  );
}