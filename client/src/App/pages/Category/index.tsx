import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import styles from '../../styles/Category.module.scss';
import { Post as PostType } from '../../shared/types/Post';
import { timeDifference } from '../../shared/utils/dateTime';
import { UserContext as UserContextType } from '../../shared/types/UserContext';

export default function Home() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [postData, setPostData] = useState<PostType[]>([]);
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
      if (err) {
        const errorMessage = err.response.data;
        if (errorMessage) {
          console.log(errorMessage);
          history.push('/404');
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    });
  }, [userData]);

  const handleCreatePost = () => {
    axios({
      method: 'post',
      url: '/api/category/' + categoryId,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.access_token
      },
      params: {
        category_id: 3,
        type: 1,
        title: 'test',
        content: 'test'
      }
    }).then(res => {
      console.log(res.data);
      setPostData(res.data);
      setFetchFlag(true);
    }).catch(err => {
      if (err) {
        const errorMessage = err.response.data;
        if (errorMessage) {
          console.log(errorMessage);
          history.push('/404');
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const renderPostTitle = (post: PostType) => post.type === 'link' ?
    <a href={post.content}>{post.title}</a> :
    <a href={'/category/' + categoryId + '/' + post.post_id}>{post.title}</a>
  const renderPostContent = (post: PostType) => post.type === 'link' ?
    <a href={post.content}>{post.content}</a> :
    <>{post.content}</>;
  const renderPostData = (post: PostType) =>
    <>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: PostType) =>
    <><i className='far fa-comments comments-icon'></i><a href={'/category/' + categoryId + '/' + post.post_id}>{post.PostComments.length} {post.PostComments.length === 1 ? 'comment' : 'comments'}</a></>;

  const renderPost = (post: PostType, idx: number) =>
    <div className={styles.postContainer} key={idx}>
      <div className={styles.voteContainer}>
        <button className={styles.voteArrowUp}><i className='fas fa-arrow-up'></i></button>
        <span className={styles.voteScore}>{post['upvotes'] - post['downvotes']}</span>
        <button className={styles.voteArrowDown}><i className='fas fa-arrow-down'></i></button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.postTitle}>{renderPostTitle(post)}</div>
        <div className={styles.postContent}>{renderPostContent(post)}</div>
        <div className={styles.postData}>{renderPostData(post)}</div>
        <div className={styles.postComments}>{renderPostComments(post)}</div>
      </div>
    </div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.categoryTitle}>{categoryId}</h1>
      {fetchFlag ?
        <>
          <div className={styles.createPostButtonContainer}>
            <button className={styles.createPostButton} onClick={handleCreatePost}>Create Post</button>
          </div>
          {postData.length > 0 ? postData.map((post: PostType, idx: number) => renderPost(post, idx)) :
            <div>There are no posts in this category.</div>}
        </> :
        'Loading...'
      }
    </div>
  );
}
