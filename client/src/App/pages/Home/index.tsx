import { useContext } from 'react';
import { isLoggedIn, UserContext } from '../../shared/utils/userContext';
import styles from './index.module.scss';

export const Home = () => {
  const { state: userData } = useContext(UserContext);

  return (
    <div className={styles.pageContainer}>
      {isLoggedIn(userData) ? 
        (userData ? 'Welcome ' + userData.username : '') 
      : 
        'Please register or log in.'
      }
    </div>
  );
};
