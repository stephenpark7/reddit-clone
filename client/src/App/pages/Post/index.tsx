import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import axios, { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import styles from '../../styles/Category.module.scss';
import '../Post/styles.scss';
import { Post as PostType } from '../../shared/types/Post';
import { PostComment as PostCommentType } from '../../shared/types/PostComment';
import { timeDifference } from '../../shared/utils/dateTime';
import { UserContext as UserContextType } from '../../shared/types/UserContext';

export default function Post() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [ postData, setPostData ]: any = useState([]);
  const [ fetchFlag, setFetchFlag ] = useState(false);
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = useCallback(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/category/${categoryId}/${postId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.access_token
      }
    }).then(res => {
      // console.log(res.data);
      setPostData(res.data);
      setFetchFlag(true);
    }).catch(err => {
      console.log(err);
    });
    // TODO: add error handling
  }, [userData]);

  async function handleAddComment(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const textAreaElement: HTMLInputElement = document.querySelector('.add-comment-textarea') as HTMLInputElement;
    const message: string = textAreaElement.value;
    console.log(userData.access_token)
    if (!message || !userData.access_token) return;
    try {
      const res: AxiosResponse = await axios({
        method: 'post', 
        url: `${process.env.REACT_APP_API_URL}/category/${categoryId}/${postId}`, 
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userData.access_token
        }, 
        data: {
          content: message
        }
      });
      const newComment = res.data;
      setPostData({...postData, PostComments: [newComment, ...postData.PostComments]});
      textAreaElement.value = '';
    } catch (err) {
      // TODO: add error handling
      console.log(err);
    }
  }

  async function handleEditComment(e: React.FormEvent): Promise<void> {
    console.log('test');

  }

  const renderPostTitle = (post: PostType) => <>{post.title}</>;
  const renderPostContent = (post: PostType) => post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>;
  const renderPostData = (post: PostType) => <>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: PostType) => <><i className='far fa-comments comments-icon'></i>{post.PostComments.length} {post.PostComments.length === 1 ? 'comment' : 'comments'}</>;

  return (
    // <div className='page-container'>
    <div className={styles.pageContainer}>
      <h1 className='category-title'>
        <a className='category-title-link' href={'/category/' + categoryId}>{categoryId}</a>
      </h1>
      {fetchFlag ?
        <>
          <div className='post-container'>
            <div className='vote-container'>
              <button className='vote-arrow-up'><i className='fas fa-arrow-up'></i></button>
              <span className='vote-score'>{postData['upvotes'] - postData['downvotes']}</span>
              <button className='vote-arrow-down'><i className='fas fa-arrow-down'></i></button>
            </div>
            <div className='content-container'>
              <div className='post-title-full'>{renderPostTitle(postData)}</div>
              <div className='post-content-full'>{renderPostContent(postData)}</div>
              <div className='post-data'>
                <span className='post-data-time-full'>{renderPostData(postData)}</span>
                {renderPostComments(postData)}
              </div>
            </div>
          </div>
          <div className='add-comment-form-container'>
            <form className='add-comment-form'>
              <div className='add-comment-container'>
                <div className='add-comment-textarea-label-container'>
                  <span className='add-comment-textarea-label'>Comment as <a href={'/user/' + userData.username}>{userData.username}</a></span>
                </div>
                <textarea name='add-comment-textarea' className='add-comment-textarea' placeholder='enter your comment' required></textarea>
                <div className='add-comment-button-container'>
                  <button type='submit' className='add-comment-button' onClick={handleAddComment}>Add Comment</button>
                </div>
              </div>
            </form>
          </div>
          <div className='comments-container'>
            {postData.PostComments.map((comment: PostCommentType, idx: number) =>
              <div className='post-comment-container' key={idx}>
                <div className='post-comment-author'>
                  <a href={'/user/' + comment.User.username}>{comment.User.username}</a>
                  <span className='post-comment-time'>· {timeDifference(new Date(), new Date(comment.createdAt))}</span>
                </div>
                <hr />
                <div className='post-comment-text-edit-container'>
                  <p className='post-comment-text'>{comment.content}</p>
                  {comment.User.username === userData.username ? <a className='post-comment-edit-link' onClick={handleEditComment}>Edit Comment</a> : null}
                </div>
              </div>
            )}
          </div>
        </> :
        'Loading...'
      }
    </div>
  );
}
