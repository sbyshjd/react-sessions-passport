import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { useGoogleLogout } from 'react-google-login';
import { GiMagickTrick } from 'react-icons/gi';
import { AuthContext } from '../context/auth.context';
import Loader from '../components/Loader';
import { FiCamera } from 'react-icons/fi';
const AuthorizedPage = () => {
  const { logout } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
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

  const handleProfileChange = async (event) => {
    const data = new FormData();
    data.append('profile', event.target.files[0]);
    await api.changeProfileImage(data);
    getUser();
  };

  const handleLogout = async () => {
    await logout();
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
          <div className='p-2'>
            {/* <Loader /> */}
            <img
              className='rounded-full h-16 w-16 bg-gray-300 '
              src={
                user.imageUrl
                  ? user.imageUrl
                  : 'https://magomagomago.s3-us-west-2.amazonaws.com/unknown.png'
              }
              alt='probably yourself'
            />
            <label htmlFor='profile'>
              <FiCamera />
              <input
                className='hidden'
                id='profile'
                type='file'
                name='profile'
                onChange={handleProfileChange}
              />
            </label>
          </div>

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
