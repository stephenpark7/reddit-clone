// import React, { useState } from 'react';
import '../stylesheets/SignUp.css';

export default function SignUp() {
  return (
    <form className='sign-up-form'>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input type='password' id='confirm-password' />
      </div>
      <button className='sign-up-btn' >Sign up</button>
    </form>
  );
}