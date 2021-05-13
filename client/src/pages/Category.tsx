import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import '../stylesheets/Category.css';

export default function Home() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;
  const { id } = useParams<{id: string}>();
  const [postData, setPostData] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);
  const history = useHistory();

  const getCategoryData = useCallback(() => {
    axios({
      method: 'get',
      url: '/api/category/' + id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.accessToken
      }      
    }).then(res => {
      console.log(res.data);
      setPostData(res.data);
      setFetchFlag(true);
    }).catch(err => {
      const errorMessage = err.response.data;
      if (errorMessage) {
        console.log(errorMessage);
        history.push('/404');
      } else {
        console.log(err);
      }
    });
  }, [userData]);

  useEffect(() => {
    getCategoryData();
  }, []);

  // TODO: add upvotes, downvotes, views, createdAt
  return (
    <div className='page-wrapper'>
      {fetchFlag ?
        postData.length > 0 ?
        postData.map((post, idx) => 
        <div className='post-wrapper' key={idx}>
          <div className='vote-wrapper'>
            <button className='vote-arrow-up'><i className="fas fa-arrow-up"></i></button>
            <span className='vote-score'>{post['upvotes'] - post['downvotes']}</span>
            <button className='vote-arrow-down'><i className="fas fa-arrow-down"></i></button>
          </div>
          <div className='content-wrapper'>
            <div className='post-title'>{post['title']}</div>
            <div className='post-description'>{post['description']}</div>
            <div className='post-data'>0 comments</div>
          </div>
        </div>) : 
        <div>There are no posts in this category.</div> :
        <>
        Loading...
        </>
      }
    </div>
  );
}