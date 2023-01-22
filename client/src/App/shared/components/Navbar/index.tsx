import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../utils/userContext';
import styles from '../../../styles/Navbar.module.scss';
import { UserContext as UserContextType } from '../../types/UserContext';

const siteName = 'ClonedIt';

export default function Navbar() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;

  function logOut() {
    if (!userData) return;
    localStorage.removeItem('token');
    setUserData({
      'user_id': '',
      'username': '',
      'access_token': '',
    });
  }

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navbarTitle} to='/' exact>{siteName}</NavLink>
      {userData.username ?
        <>
          <NavLink className={styles.navbarLink} to={'/u/' + userData.username} exact>{userData.username}</NavLink>
          <Link className={styles.navbarLink} to={'/'} onClick={logOut}>Log out</Link>
        </>
        :
        <>
          <NavLink className={styles.navbarLink} to='/signup' exact>sign up</NavLink>
          <NavLink className={styles.navbarLink} to='/login' exact>log in</NavLink>
        </>
      }
    </nav>
  );
}
