import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import uuid from 'uuid/v4';
import useSaveAndRedirect from '../hooks/useSaveRedirect';
import api from '../services/api';
let inputEmail = uuid();
let inputPassword = uuid();

const Form = ({ titleBtn, OnSubmit, data, setData, isDisabled, error }) => {
  const [isVisible, setVisibility] = useState(false);
  const saveAndRedirect = useSaveAndRedirect();

  const handleGoogleLogin = async (response) => {
    let result = await api.googleLogin(response);
    if (result) {
      saveAndRedirect(result);
    }
  };

  const ifDisabled = isDisabled();
  return (
    <div className='relative'>
      {error && (
        <div className='bg-red-200 w-full py-2 flex justify-center items-center absolute text-xs'>
          You have a problem with your email or password
        </div>
      )}
      <form onSubmit={OnSubmit} className='flex flex-col p-12 bg-white  '>
        <label className='text-gray-700' htmlFor={`email-${inputEmail}`}>
          Email
        </label>
        <input
          name='email'
          id={`email-${inputEmail}`}
          value={data.email}
          onChange={setData}
          type='email'
          className='border outline-none border-gray-500 px-2 '
        />
        <label className='text-gray-700' htmlFor={`password-${inputPassword}`}>
          Password
        </label>
        <div className='flex relative items-center '>
          <input
            autoComplete='new-password'
            name='password'
            value={data.password}
            onChange={setData}
            id={`password-${inputPassword}`}
            type={isVisible ? 'text' : 'password'}
            className='border outline-none border-gray-500 w-full px-2'
          />
          <button
            type='button'
            onClick={() => setVisibility((prev) => !prev)}
            className='absolute right-0 -mr-6 focus:outline-none  '
          >
            {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <button
          type='submit'
          disabled={isDisabled()}
          className={`text-sm py-1 text-gray-100 bg-indigo-600 my-4 rounded-sm  ${
            ifDisabled
              ? 'opacity-25 cursor-not-allowed'
              : ' hover:opacity-75 active:bg-indigo-800'
          }`}
        >
          {titleBtn}
        </button>
        <div className='flex justify-center '>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                type='button'
                className='flex items-center justify-around w-3/5 hover:underline focus:outline-none'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle />
                Sign in with Google
              </button>
            )}
            buttonText='Login'
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
