import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../shared/utils/userContext';
import { UserContext as UserContextType } from '../../shared/types/UserContext';
import { setCookiesForUserData } from '../../shared/utils/cookies';
import { toast } from '../../shared/utils/toast'
import styles from './index.module.scss';
import { signUp } from '../../shared/utils/api';

export const SignUp = () => {
  const userContext = useContext(UserContext) as UserContextType;
  const { setState: setUserData } = userContext;
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { username, password, confirmPassword } = getFormElements();
    if (!username.value || !password.value || !confirmPassword.value) return;
    if (password.value !== confirmPassword.value) {
      toast('Passwords do not match.', { type: 'error' });
      clearForm();
      return;
    }
    try {
      const data = await signUp(username.value, password.value);
      setCookiesForUserData(data);
      setUserData(data);
      navigate('/');
      toast('Account created successfully!', { type: 'success' });
    }
    catch (err: any) {
      if (err) {
        toast(err.message, { type: 'error' });
        clearForm();
      } else {
        toast("Unknown error occured.", { type: 'error' });
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
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' autoComplete='username' required />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' autoComplete='password' required />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input type='password' id='confirm-password' name='confirm-password' autoComplete='confirm-password' required />
      </div>
      <button className={styles.signUpBtn} type='submit'>Sign up</button>
    </form>
  );
};
