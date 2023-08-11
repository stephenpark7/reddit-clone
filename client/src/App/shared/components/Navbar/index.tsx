import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../utils/userContext';
import styles from '../../../styles/Navbar.module.scss';
import { UserContext as UserContextType } from '../../types/UserContext';
import { DefaultUserState } from '../../utils/userContext';

const siteName = 'RedactedNode';

export const Navbar = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;

  function logOut() {
    if (!userData) return;
    localStorage.removeItem('token');
    setUserData(DefaultUserState);
  }

  return (
    <nav className={styles.container}>
      <NavLink className={styles.title} to='/'>{siteName}</NavLink>
      {userData.username ?
        <>
          <NavLink className={styles.link} to={`'/u/'${userData.username}`}>{userData.username}</NavLink>
          <Link className={styles.link} to={'/'} onClick={logOut}>Log out</Link>
        </>
        :
        <div className={styles.linksContainer}>
          <NavLink className={styles.link} to='/signup'>sign up</NavLink>
          <NavLink className={styles.link} to='/login'>log in</NavLink>
        </div>
      }
    </nav>
  );
};
