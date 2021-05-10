import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Home() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;

  // console.log(userData);

  return (
    <div>
      {userData ? "Welcome " + userData.username : ""}
    </div>
  );
}