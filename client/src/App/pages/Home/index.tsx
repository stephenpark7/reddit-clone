import { useContext } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import styles from '../../styles/Home.module.css';

export default function Home() {
  const userContext = useContext(UserContext);
  const { state: userData, setState: setUserData } = userContext;

  return (
    <div className={styles.pageContainer}>
      {/* <h1>Homepage</h1> */}
      {userData ? 'Welcome ' + userData.username
      : ''}
    </div>
  );
}
