import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

import '../stylesheets/Navbar.css';

export default function CategoryBar() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;

  // console.log(userData);

  return (
    <div className='category-bar'>
      <NavLink className='homepage' to='/' exact>untitled</NavLink>
    </div>
  );
}