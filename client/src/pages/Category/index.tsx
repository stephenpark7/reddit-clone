import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';
import { TPost } from '../../shared/types/Post';
import { timeDifference } from '../../shared/utils/dateTime';
import { TUserContext } from '../../shared/types/UserContext';

export default function Home() {
  const userContext = useContext(UserContext) as TUserContext;
  const { state: userData, setState: setUserData } = userContext;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [postData, setPostData] = useState<TPost[]>([]);
  const [fetchFlag, setFetchFlag] = useState(false);
  const history = useHistory();

  const getCategoryData = useCallback(() => {
    axios({
      method: 'get',
      url: '/api/category/' + categoryId,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.access_token
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

  const renderPostTitle = (post: TPost) => post.type === 'link' ? <a href={post.content}>{post.title}</a> : <a href={'/category/' + categoryId + '/' + post.post_id}>{post.title}</a>
  const renderPostContent = (post: TPost) => post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>;
  const renderPostData = (post: TPost) => <>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: TPost) => <><i className='far fa-comments'></i><a href={'/category/' + categoryId + '/' + post.post_id}>{post.PostComments.length} {post.PostComments.length === 1 ? "comment" : "comments"}</a></>;

  const renderPost = (post: TPost, idx: number) => 
    <div className='post-wrapper' key={idx}>
      <div className='vote-wrapper'>
        <button className='vote-arrow-up'><i className='fas fa-arrow-up'></i></button>
        <span className='vote-score'>{post['upvotes'] - post['downvotes']}</span>
        <button className='vote-arrow-down'><i className='fas fa-arrow-down'></i></button>
      </div>
      <div className='content-wrapper'>
        <div className='post-title'>{renderPostTitle(post)}</div>
        <div className='post-content'>{renderPostContent(post)}</div>
        <div className='post-data'>{renderPostData(post)}</div>
        <div className='post-comments'>{renderPostComments(post)}</div>
      </div>
    </div>;

  return (
    <div className='page-wrapper'>
      <h1 className='category-title'>{categoryId}</h1>
      {fetchFlag ?
        <>
          <div className='create-post-button-wrapper'>
            <button className='create-post-button'>Create Post</button>
          </div>
          {postData.length > 0 ? postData.map((post: TPost, idx: number) => renderPost(post, idx)) :
          <div>There are no posts in this category.</div>}
        </>
          : 
        "Loading..."
      }
    </div>
  );
}