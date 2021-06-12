import { useContext } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import './styles.css';

export default function Home() {
  const userContext = useContext(UserContext);
  const { state: userData, setState: setUserData } = userContext;

  // console.log(userData);

  return (
    <div className='page-wrapper'>
      {/* <h1>Homepage</h1> */}
      {userData ? "Welcome " + userData.username
      : ""}
    </div>
  );
}