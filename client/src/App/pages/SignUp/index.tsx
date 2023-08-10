import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios, { AxiosResponse } from 'axios';
import { UserContext } from '../../shared/utils/userContext';
import { UserContext as UserContextType } from '../../shared/types/UserContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const { setState: setUserData } = userContext;
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password, confirmPassword } = getFormElements();
    if (!username.value || !password.value || !confirmPassword.value) return;
    if (password.value !== confirmPassword.value) {
      toast('Passwords do not match.', { autoClose: 2000, position: 'top-center', type: 'error' });
      return;
    }
    try {
      const res: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
        'username': username.value, 
        'password': password.value
      });
      localStorage.setItem('token', JSON.stringify(res.data));
      setUserData(res.data);
      navigate('/');
      toast('Account created successfully!', { autoClose: 2000, position: 'top-center', type: 'success' });
    } catch (err: any) {
      const errorMessage = err.response.data;
      if (errorMessage) {
        toast(errorMessage, { autoClose: 2000, position: 'top-center', type: 'error' });
        clearForm();
      } else {
        toast(err);
      }
    }
  }

  function clearForm(): void {
    const { username, password, confirmPassword } = getFormElements();
    username.value = '';
    password.value = '';
    confirmPassword.value = '';
  }

  function getFormElements(): { username: HTMLInputElement, password: HTMLInputElement, confirmPassword: HTMLInputElement } {
    const username: HTMLInputElement = (document.querySelector('#username') as HTMLInputElement);
    const password: HTMLInputElement = (document.querySelector('#password') as HTMLInputElement);
    const confirmPassword: HTMLInputElement = (document.querySelector('#confirm-password') as HTMLInputElement);
    return { username, password, confirmPassword };
  }

  return (
    <form className='sign-up-form' onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' autoComplete='username' required />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' autoComplete='password' required />
      </div>
      <div className='input-container'>
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input type='password' id='confirm-password' name='confirm-password' autoComplete='confirm-password' required />
      </div>
      <button className='sign-up-btn' type='submit'>Sign up</button>
    </form>
  );
};
