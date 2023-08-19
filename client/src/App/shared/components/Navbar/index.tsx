import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { setCookiesForUserData } from '../../utils/cookies';
import { UserContext } from '../../utils/userContext';
import { UserContext as UserContextType } from '../../types/UserContext';
import { DefaultUserState, isLoggedIn } from '../../utils/userContext';
import { toast } from '../../utils/toast';
import styles from './index.module.scss';

const siteName = 'RedactedNode';

export const Navbar = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;

  const logOut = () => {
    if (!userData) return;
    toast('Logged out successfully.', { type: 'success' });
    setCookiesForUserData(DefaultUserState);
    setUserData(DefaultUserState);
  };

  const renderNavItems = () => 
    isLoggedIn(userData) ? 
      <div className={styles.linksContainer}>
        <NavLink className={styles.link} to={`/settings`}>Settings</NavLink>
        <Link className={styles.link} to={'/'} onClick={logOut}>Log out</Link>
      </div>
    :
      <div className={styles.linksContainer}>
        <NavLink className={styles.link} to='/signup'>Sign up</NavLink>
        <NavLink className={styles.link} to='/login'>Log in</NavLink>
      </div>
    ;
  ;

  return (
    <nav className={styles.container}>
      <NavLink className={styles.title} to='/'>{siteName}</NavLink>
      {renderNavItems()}
    </nav>
  );
};
