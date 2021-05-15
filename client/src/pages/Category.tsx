import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import '../stylesheets/Category.css';
import { Post } from '../interfaces/Post';

export default function Home() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData]: any = useState([]);
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

  function timeDifference(current: any, previous: any) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }
    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }
    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }
    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }
    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }
    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  return (
    <div className='page-wrapper'>
      {fetchFlag ?
        postData.length > 0 ?
          postData.map((post: Post, idx: number) =>
            <div className='post-wrapper' key={idx}>
              <div className='vote-wrapper'>
                <button className='vote-arrow-up'><i className='fas fa-arrow-up'></i></button>
                <span className='vote-score'>{post['upvotes'] - post['downvotes']}</span>
                <button className='vote-arrow-down'><i className='fas fa-arrow-down'></i></button>
              </div>
              <div className='content-wrapper'>
                <div className='post-title'>{post.type === 'link' ? <a href={post.content}>{post.title}</a> : <a href={'/category/' + id + '/' + post.post_id}>{post.title}</a>}</div>
                <div className='post-content'>{post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>}</div>
                <div className='post-data'>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</div>
                <div className='post-comments'><i className='far fa-comments'></i><span className='post-comments-text'>0 comments</span></div>
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