import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className='flex flex-col h-screen justify-center align-center'>
      <section className='error-container'>
        <span>4</span>
        <span>
          <span className='screen-reader-text'>0</span>
        </span>
        <span>4</span>
      </section>
      <div className='flex justify-center align-center'>
        <button
          onClick={() => history.push('/')}
          className='border w-30 p-2 hover:bg-gray-600 hover:text-gray-800 focus:outline-none'
        >
          GO HOME!
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
