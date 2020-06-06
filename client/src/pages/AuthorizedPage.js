import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { useGoogleLogout } from 'react-google-login';
import { GiMagickTrick } from 'react-icons/gi';
import {AuthContext} from "../context/auth.context"
const AuthorizedPage = () => {
  const {logout} =useContext(AuthContext)
  const value =useContext(AuthContext)
  console.log("show me the context in authorized page", value)
  const history = useHistory();
  const [user, setUser] = useState();
  const [sudo, setSudo] = useState(null);

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });

  const getUser = async () => {
    let user = await api.getUserInformation();
    if (user.admin === true) {
      let { title, image } = await api.isAdmin();
      setSudo({ title, image });
    }
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
     await logout()
    signOut();
    history.push('/auth');
  };
  if (!user) {
    return null;
  }

  return (
    <div
      className={`flex ${
        sudo ? 'flex-row' : 'flex-col'
      } justify-center items-center h-screen`}
    >
      {sudo && (
        <div className={`w-2/5`}>
          <img src={sudo.image} alt='magic' />
        </div>
      )}
      <div className='w-3/5 p-2'>
        <div className='flex py-2 '>
          {user.imageUrl && (
            <div className='p-2'>
              <img
                className='rounded-full h-16 w-16 bg-gray-300 '
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
          className={`border p-2 ${
            sudo ? '' : 'w-2/5'
          }   hover:bg-gray-400 focus:outline-none`}
        >
          Logout
        </button>
        {sudo && (
          <div className='mt-6 p-8 border-2 border-pink-300 bg-gray-200 rounded w-3/5 flex-wrap'>
            You are a google account. Magic is here{' '}
            <GiMagickTrick color={'#ff847c'} size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorizedPage;
