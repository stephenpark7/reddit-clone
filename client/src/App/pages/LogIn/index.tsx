import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../shared/utils/userContext';
import '../SignUp/styles.css';
import axios, { AxiosResponse } from 'axios';
import { UserContext as UserContextType } from '../../shared/types/UserContext';

export default function LogIn() {
  const userContext = useContext(UserContext) as UserContextType;
  const { state: userData, setState: setUserData } = userContext;
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password } = getFormElements();
    if (!username.value || !password.value) return;
    try {
      const res: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        'username': username.value, 
        'password': password.value
      });
      localStorage.setItem('token', JSON.stringify(res.data));
      setUserData(res.data);
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response.data;
      if (errorMessage) {
        console.log(errorMessage);
        clearForm();
      } else {
        console.log(err);
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
    <form className='log-in-form' onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required />
      </div>
      <button className='log-in-btn' type='submit'>Log in</button>
    </form>
  );
}
