import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/Post.module.scss';
// import '../Post/styles.scss';
import { Post as PostType } from '../../shared/types/Post';
import { PostComment as PostCommentType } from '../../shared/types/PostComment';
import { timeDifference } from '../../shared/utils/dateTime';
import { UserContext as UserContextType } from '../../shared/types/UserContext';

export default function Post() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;
  const { categoryName } = useParams<{ categoryName: string }>();
  const [ postData, setPostData ]: any = useState([]);
  const [ fetchFlag, setFetchFlag ] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = useCallback(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/category/${categoryName}/${postId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.access_token
      }
    }).then(res => {
      setPostData(res.data);
      setFetchFlag(true);
    }).catch(err => {
      console.log(err);
    });
    // TODO: add error handling
  }, [userData]);

  async function handleAddComment(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const textAreaElement: HTMLInputElement = document.querySelector('textarea[name=add-comment-textarea]') as HTMLInputElement;
    const message: string = textAreaElement.value;
    if (!message || !userData.access_token) return;
    try {
      const res: AxiosResponse = await axios({
        method: 'post', 
        url: `${process.env.REACT_APP_API_URL}/category/${categoryName}/${postId}`, 
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
  }

  const renderPostTitle = (post: PostType) => <>{post.title}</>;
  const renderPostContent = (post: PostType) => post.type === 'link' ? <a href={post.content}>{post.content}</a> : <>{post.content}</>;
  const renderPostData = (post: PostType) => <>Posted by <a href={'/user/' + post.User?.username}>{post.User?.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}</>;
  const renderPostComments = (post: PostType) => <><i className='far fa-comments comments-icon'></i>{post.PostComments.length} {post.PostComments.length === 1 ? 'comment' : 'comments'}</>;

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>
        <a href={'/category/' + categoryName}>{categoryName}</a>
      </h1>
      {fetchFlag ?
        <>
          <div className={styles.postContainer}>
            {/* <div className={styles.voteContainer}>
              <button className={styles.voteArrowUp}><i className='fas fa-arrow-up'></i></button>
              <span className={styles.voteScore}>{postData['upvotes'] - postData['downvotes']}</span>
              <button className={styles.voteArrowDown}><i className='fas fa-arrow-down'></i></button>
            </div> */}
            <div className={styles.contentcontainer}>
              <div className={styles.postTitleFull}>{renderPostTitle(postData)}</div>
              <div className={styles.postContentFull}>{renderPostContent(postData)}</div>
              <div className={styles.postData}>
                <span className={styles.postDataTimeFull}>{renderPostData(postData)}</span>
                {renderPostComments(postData)}
              </div>
            </div>
          </div>
          <div className={styles.addCommentFormContainer}>
            <form className={styles.addCommentForm}>
              <div className={styles.addCommentContainer}>
                <div className={styles.addCommentTextAreaLabelContainer}>
                  <span className={styles.addCommentTextAreaLabel}>Comment as <a href={'/user/' + userData.username}>{userData.username}</a></span>
                </div>
                <textarea name='add-comment-textarea' className={styles.addCommentTextArea} placeholder='enter your comment' required></textarea>
                <div className={styles.addCommentButtonContainer}>
                  <button type='submit' className={styles.addCommentButton} onClick={handleAddComment}>Add Comment</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.commentsContainer}>
            {postData.PostComments.map((comment: PostCommentType, idx: number) =>
              <div className={styles.postCommentContainer} key={idx}>
                <div className={styles.postCommentAuthor}>
                  <a href={'/user/' + comment.User.username}>{comment.User.username}</a>
                  <span className={styles.postCommentTime}>· {timeDifference(new Date(), new Date(comment.createdAt))}</span>
                </div>
                <hr />
                <div className={styles.postCommentTextEditContainer}>
                  <p className={styles.postCommentText}>{comment.content}</p>
                  {comment.User.username === userData.username ? <a className={styles.postCommentEditLink} onClick={handleEditComment}>Edit</a> : null}
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
