import { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../stylesheets/Home/Home.css';

export default function Home() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;

  // console.log(userData);

  return (
    <div className='page-wrapper'>
      {/* <h1>Homepage</h1> */}
      {userData ? "Welcome " + userData.username
      : ""}
    </div>
  );
}