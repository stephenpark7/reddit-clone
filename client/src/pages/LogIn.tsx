import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../stylesheets/SignUp.css';
import axios, { AxiosResponse } from 'axios';

export default function LogIn() {
  const userContext = useContext(UserContext);
  const { setUserData } = userContext;
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password } = getFormElements();
    if (!username.value || !password.value) return;
    try {
      const res: AxiosResponse = await axios.post('/api/login', {
        "username": username.value, 
        "password": password.value
      });
      localStorage.setItem('token', JSON.stringify(res.data));
      setUserData(res.data);
      history.push('/');
    } catch (err) {
      const errorMessage = err.response.data;
      console.log(errorMessage);
      if (errorMessage) {
        clearForm();
      } else {
        console.log(err);
      }
    }
  }

  function clearForm(): void {
    const { username, password } = getFormElements();
    username.value = "";
    password.value = "";
  }

  function getFormElements(): { username: HTMLInputElement, password: HTMLInputElement } {
    const username: HTMLInputElement = (document.querySelector("#username") as HTMLInputElement);
    const password: HTMLInputElement = (document.querySelector("#password") as HTMLInputElement);
    return { username, password };
  }

  return (
    <form className='log-in-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required />
      </div>
      <button className='log-in-btn' type='submit'>Log in</button>
    </form>
  );
}