import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../shared/utils/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Post as PostType } from '../../shared/types/Post';
import { timeDifference } from '../../shared/utils/dateTime';
import { UserContext as UserContextType } from '../../shared/types/UserContext';
import { serialize } from '../../shared/utils/seralize';

import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import styles from './index.module.scss';

export default function Home() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData } = userContext;
  
  const { categoryName } = useParams<{ categoryName: string }>();
  const [ categoryData, setCategoryData ] = useState<any>({});

  const [ createPostToggle, setCreatePostToggle ] = useState(false);

  const navigate = useNavigate();

  const fetchCategoryData = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/category/${categoryName}`).then(res => res.json());
  };

  const { isLoading, error, data } = useQuery('POSTS', fetchCategoryData);

  useEffect(() => {
    if (error) {
      toast(error);
      navigate('/404');
    }
    setCategoryData(data);
  }, [ isLoading, error, data, navigate ]);


  const handleCreatePostToggle = () => {
    // TODO: use transitions
    setCreatePostToggle(!createPostToggle)
  };

  const handleCreatePost = () => {
    const title = document.querySelector('input[name=create-post-title-input]') as HTMLInputElement;
    const description = document.querySelector('textarea[name=create-post-content-textarea]') as HTMLInputElement;
    if (title.value && description.value) {
      createPost(title.value, description.value);
    }
  };

  const createPost = async (title: string, description: string) => {
    try {
      const params = {
        category_id: data.category_id,
        type: 1,
        title: title,
        content: description
      };
      const queryString = serialize(params);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/${categoryName}?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.access_token}`,
        },
      });
      const rawPostData = await response.json();

      let postData: PostType = {
        post_id: rawPostData.post_id,
        type: rawPostData.type,
        title: rawPostData.title,
        content: rawPostData.content,
        upvotes: rawPostData.upvotes,
        downvotes: rawPostData.downvotes,
        createdAt: rawPostData.createdAt,
        User: {
          username: userData.username
        },
        PostComments: [],
      };

      const temp = { ...categoryData, posts: [ postData, ...categoryData.posts ] };
      setCategoryData(temp);
      setCreatePostToggle(false);
      toast('Post created successfully!', { autoClose: 2000, type: 'success' });
    } 
    catch (err: any) {
      console.log(err)
      const errorMessage = err.message || err.response.data;
      if (errorMessage) {
        console.log(errorMessage);
        navigate('/404');
      } else {
        console.log(err);
      }
    }
  };

  const renderPostTitle = (post: PostType) => post.type === 'link' ?
    <a href={post.content}>
      {post.title}
    </a> :
    <a href={'/category/' + categoryName + '/' + post.post_id}>
      {post.title}
    </a>

  const renderPostContent = (post: PostType) => post.type === 'link' ?
    <a href={post.content}>
      {post.content}
    </a> :
    <>
      {post.content}
    </>;

  const renderPostData = (post: PostType) => <>
    Posted by <a href={'/user/' + post.User?.username}>{post.User?.username}</a> {timeDifference(new Date(), new Date(post.createdAt))}
  </>;

  const renderPostComments = (post: PostType) => <>
    <i className='far fa-comments comments-icon'></i>
    <a href={'/category/' + categoryName + '/' + post.post_id}>
      {post.PostComments?.length ?? 0} {post.PostComments?.length === 1 ? 'comment' : 'comments'}
    </a>
  </>;

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

  const renderedPosts = categoryData?.posts ? categoryData.posts.map((post: PostType, idx: number) => renderPost(post, idx)) : <div>There are no posts in this category.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>{categoryName}</h1>
      <div className={styles.createPostButtonContainer}>
        <button className={styles.createPostButton} 
           onClick={handleCreatePostToggle}>{!createPostToggle ? 'Create Post' : 'Hide'}</button>
      </div>
      {createPostToggle && 
      <div className={styles.createPostContainer}>
        <input type='text' 
               name='create-post-title-input' 
               className={styles.createPostTitleInput} 
               placeholder='Title of your post' 
               required />
        <textarea name='create-post-content-textarea' 
                  className={styles.createPostDescriptionTextArea} 
                  placeholder='What do you want to say?' 
                  required />
        <div className={styles.innerCreatePostButtonContainer}>
          <button className={styles.createPostButton}
                  onClick={handleCreatePost}>Create Post</button>
        </div>
      </div>}
      {categoryData ? renderedPosts : 'Loading...'}
    </div>
  );
}
