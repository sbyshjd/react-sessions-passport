import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthorizedPage = () => {
  const history = useHistory();
  const [user, setUser] = useState();

  const getUser = async () => {
    let user = await api.getUserInformation();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    await api.logout();
    history.push('/auth');
  };
  if (!user) {
    return (
      <h1 className='flex justify-center items-center  h-screen'>loading</h1>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex py-2'>
        {user.imageUrl && (
          <div className='p-2'>
            <img
              className='rounded-full h-16 w-16 bg-gray-300'
              src={user.imageUrl}
              alt='probably yourself'
            />
          </div>
        )}
        <div className='flex flex-col justify-center pl-2 '>
          <h1>HEY, {user.name ? user.name : user.email}</h1>
          {user.name && <h2>{user.email}</h2>}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className='border p-2 w-1/5  hover:bg-gray-400 focus:outline-none'
      >
        Logout
      </button>
    </div>
  );
};

export default AuthorizedPage;
