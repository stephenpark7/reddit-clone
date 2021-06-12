import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import axios, { AxiosResponse } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import '../Category/styles.scss';
import '../Post/styles.scss';
import { TPost } from '../../shared/types/Post';
import { TPostComment } from '../../shared/types/PostComment';
import { timeDifference } from '../../shared/utils/dateTime';
import { TUserContext } from '../../shared/types/UserContext';

export default function Post() {
  const userContext = useContext(UserContext) as TUserContext;
  const { state: userData, setState: setUserData } = userContext;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [postData, setPostData]: any = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);
  const history = useHistory();
  const { postId } = useParams<{ postId: string }>();

  async function handleAddComment(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const textAreaElement: HTMLInputElement = document.querySelector(".add-comment-textarea") as HTMLInputElement;
    const message: string = textAreaElement.value;
    if (!message || !userData.access_token) return;
    try {
      const res: AxiosResponse = await axios({
        method: 'post', 
        url: `/api/category/${categoryId}/${postId}`, 
        withCredentials: true, 
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
      if (err.response) {
        console.log(err.response.data)
      } else {
        console.log(err);
      }
    }
  }

  const getPostData = useCallback(() => {
    axios({
      method: 'get',
      url: '/api/category/' + categoryId + '/' + postId,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.access_token
      }
    }).then(res => {
      // console.log(res.data);
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

  const renderPostTitle = (post: TPost) => <>{post.title}</>;
  const renderPostContent = (post: TPost) => post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>;
  const renderPostData = (post: TPost) => <>Posted by <a href={'/user/' + post.User.username}>{post.User.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: TPost) => <><i className='far fa-comments'></i>{post.PostComments.length} {post.PostComments.length === 1 ? "comment" : "comments"}</>;

  return (
    <div className='page-wrapper'>
      <h1 className='category-title'>
        <a className='category-title-link' href={'/category/' + categoryId}>{categoryId}</a>
      </h1>
      {fetchFlag ?
        <>
          <div className='post-wrapper'>
            <div className='vote-wrapper'>
              <button className='vote-arrow-up'><i className='fas fa-arrow-up'></i></button>
              <span className='vote-score'>{postData['upvotes'] - postData['downvotes']}</span>
              <button className='vote-arrow-down'><i className='fas fa-arrow-down'></i></button>
            </div>
            <div className='content-wrapper'>
              <div className='post-title-full'>{renderPostTitle(postData)}</div>
              <div className='post-content-full'>{renderPostContent(postData)}</div>
              <div className='post-data'>
                <span className='post-data-time-full'>{renderPostData(postData)}</span>
                {renderPostComments(postData)}
              </div>
            </div>
          </div>
          <div className='add-comment-form-wrapper'>
            <form className='add-comment-form'>
              <div className='add-comment-wrapper'>
                <div className='add-comment-textarea-label-wrapper'>
                  <span className='add-comment-textarea-label'>Comment as <a href={'/user/' + userData.username}>{userData.username}</a></span>
                </div>
                <textarea name='add-comment-textarea' className='add-comment-textarea' placeholder='enter your comment' required></textarea>
                <div className="add-comment-button-wrapper">
                  <button type='submit' className='add-comment-button' onClick={handleAddComment}>Add Comment</button>
                </div>
              </div>
            </form>
          </div>
          <div className='comments-wrapper'>
            {postData.PostComments.map((comment: TPostComment, idx: number) =>
              <div className='post-comment-wrapper' key={idx}>
                <div className='post-comment-author'>
                  <a href={'/user/' + comment.User.username}>{comment.User.username}</a>
                  <span className='post-comment-time'>· {timeDifference(new Date(), new Date(comment.createdAt))}</span>
                </div>
                <hr />
                <span className='post-comment-text'>{comment.content}</span>
              </div>
            )}
          </div>
        </> :
        'Loading...'
      }
    </div>
  );
}