import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import '../stylesheets/Home.css';
import '../stylesheets/Category.css';
import { PostInterface } from '../interfaces/Post';
import { timeDifference } from '../js/functions';

export default function Post() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [postData, setPostData]: any = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();

  const getPostData = useCallback(() => {
    axios({
      method: 'get',
      url: '/api/category/' + categoryId + '/' + postId,
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
    getPostData();
  }, []);
  
  const renderPostTitle = (post: PostInterface) => post.type === 'link' ? <a href={post.content}>{post.title}</a> : <a href={'/category/' + categoryId + '/' + post.post_id}>{post.title}</a>
  const renderPostContent = (post: PostInterface) => post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>;
  const renderPostData = (post: PostInterface) => <>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: PostInterface) => <><i className='far fa-comments'></i>{post.PostComments.length} {post.PostComments.length === 0 ? "comments" : "comment"}</>;

  return (
    <div className='page-wrapper'>
      <h1><a href={'/category/' + categoryId}>{categoryId}</a></h1>
      {fetchFlag ? 
        <>
          <div className='post-wrapper'>
            <div className='vote-wrapper'>
              <button className='vote-arrow-up'><i className='fas fa-arrow-up'></i></button>
              <span className='vote-score'>{postData['upvotes'] - postData['downvotes']}</span>
              <button className='vote-arrow-down'><i className='fas fa-arrow-down'></i></button>
            </div>
            <div className='content-wrapper'>
              <div className='post-title'>{renderPostTitle(postData)}</div>
              <div className='post-content'>{renderPostContent(postData)}</div>
              <div className='post-data'>{renderPostData(postData)}</div>
              <div className='post-comments'>{renderPostComments(postData)}</div>
            </div>
          </div>
          <div className="comments-wrapper">
            <br/>*WIP comments section
          </div> 
        </> : 
        "Loading..."
      }
    </div>
  );
}