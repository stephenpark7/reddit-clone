import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { UserContext } from '../../shared/utils/userContext';
import { UserContext as UserContextType } from '../../shared/types/UserContext';
import { setCookiesForUserData } from '../../shared/utils/cookies';
import { toast } from '../../shared/utils/toast'
import styles from './index.module.scss';

export const LogIn = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const { setState: setUserData } = userContext;
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password } = getFormElements();
    if (!username.value || !password.value) return;
    try {
      const res: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        'username': username.value, 
        'password': password.value
      });
      setCookiesForUserData(JSON.stringify(res.data));
      setUserData(res.data);
      navigate('/');
      toast('Logged in successfully!', { autoClose: 2000, type: 'success' });
    } catch (err: any) {
      const errorMessage = err.response.data;
      if (errorMessage) {
        toast(errorMessage, { autoClose: 2000, type: 'error' });
        clearForm();
      } else {
        toast(err);
      }
    }
  }

  function clearForm(): void {
    const { username, password } = getFormElements();
    username.value = '';
    password.value = '';
  }

  function getFormElements(): { username: HTMLInputElement, password: HTMLInputElement } {
    const username: HTMLInputElement = (document.querySelector('#username') as HTMLInputElement);
    const password: HTMLInputElement = (document.querySelector('#password') as HTMLInputElement);
    return { username, password };
  }

  return (
    <form className={styles.logInForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' autoComplete='password' required />
      </div>
      <button className={styles.logInBtn} type='submit'>Log in</button>
    </form>
  );
};
