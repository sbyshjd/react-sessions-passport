import React, { useState } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import linus from '../images/linus.jpg';
import Form from '../components/Form';
import api from '../services/api';
import useSaveAndRedirect from '../hooks/useSaveRedirect';

const AuthPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const saveAndRedirect = useSaveAndRedirect();
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  const handleInputLogin = (e) => {
    const { name, value } = e.target;
    setErrorLogin(false);
    setLoginData({ ...loginData, [name]: value });
  };

  const handleInputRegister = (e) => {
    const { name, value } = e.target;
    setErrorRegister(false);
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await api.login(loginData);
      saveAndRedirect(result.data);
    } catch (error) {
      setErrorLogin(true);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let result = await api.create(registerData);
      saveAndRedirect(result.data);
    } catch (error) {
      setErrorRegister(true);
    }
  };

  const isDisabled = (state) => {
    return state.email === '' || state.password === '';
  };
  return (
    <div className='w-screen h-screen bg-gray-700'>
      <div className='flex flex-col-reverse sm:flex-row items-center justify-center h-screen overflow-hidden '>
        <div className='w-2/4 max-w-md w-full '>
          <nav>
            <ul className='flex justify-around bg-gray-600 py-3 text-gray-100 '>
              <li>
                <NavLink
                  isActive={(match) => {
                    if (!match) {
                      return false;
                    }
                    return match.isExact;
                  }}
                  activeClassName=' border-solid border-2 p-2 border-blue-400'
                  className='px-10 text-gray-100'
                  to='/auth'
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName=' border-solid border-2 p-2 border-blue-400'
                  className='px-10 text-gray-100'
                  to='/auth/register'
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact strict path='/auth'>
              <Form
                titleBtn='Login'
                OnSubmit={handleLogin}
                data={loginData}
                isDisabled={() => isDisabled(loginData)}
                setData={handleInputLogin}
                error={errorLogin}
              />
            </Route>
            <Route exact path='/auth/register'>
              <Form
                titleBtn='Register'
                OnSubmit={handleRegister}
                data={registerData}
                isDisabled={() => isDisabled(registerData)}
                setData={handleInputRegister}
                error={errorRegister}
              />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        </div>
        <div className='w-2/4 flex justify-center'>
          <img
            src={linus}
            alt='the perfect dog'
            className=' rounded-full h-24 w-24 sm:h-64 sm:w-64'
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
