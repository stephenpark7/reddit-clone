import { useContext } from 'react';
import { isLoggedIn, UserContext } from '../../shared/utils/userContext';
import styles from './index.module.scss';

export const Home = () => {
  const { state: userData } = useContext(UserContext);

  const renderWelcomeMessage = () => 
    isLoggedIn(userData) ?
      (userData ? `Welcome ${userData.username}` : '')
    :
      'Please register or log in.'
  ;

  return (
    <div className={styles.pageContainer}>
      {renderWelcomeMessage()}
    </div>
  );
};
