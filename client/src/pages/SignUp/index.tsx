import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import axios, { AxiosResponse } from 'axios';

export default function SignUp() {
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password, confirmPassword } = getFormElements();
    if (!username.value || !password.value || !confirmPassword.value) return;
    if (password.value != confirmPassword.value) {
      // TODO: create red rectangle on password inputs if passwords do not match
      // TODO: add alert element above form for error and success messages
      return;
    }
    try {
      const res: AxiosResponse = await axios.post('/api/signup', {
        "username": username.value, 
        "password": password.value
      });
      console.log(res.data);
      history.push('/login');
    } catch (err) {
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
    const { username, password, confirmPassword } = getFormElements();
    username.value = "";
    password.value = "";
    confirmPassword.value = "";
  }

  function getFormElements(): { username: HTMLInputElement, password: HTMLInputElement, confirmPassword: HTMLInputElement } {
    const username: HTMLInputElement = (document.querySelector("#username") as HTMLInputElement);
    const password: HTMLInputElement = (document.querySelector("#password") as HTMLInputElement);
    const confirmPassword: HTMLInputElement = (document.querySelector("#confirm-password") as HTMLInputElement);
    return { username, password, confirmPassword };
  }

  return (
    <form className='sign-up-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' required />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input type='password' id='confirm-password' name='confirm-password' required />
      </div>
      <button className='sign-up-btn' type='submit'>Sign up</button>
    </form>
  );
}