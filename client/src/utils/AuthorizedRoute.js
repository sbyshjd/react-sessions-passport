import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../services/api';

const AuthorizedRoute = ({ component, ...rest }) => {
  const [logged, setLogged] = useState(null);

  const isLogged = async () => {
    let result = await api.isLogged();
    setLogged(result.success);
  };
  useEffect(() => {
    isLogged();
  }, []);

  if (logged === null) return <div>Loading...</div>;
  if (logged !== true) return <Redirect push to='/auth' />;
  return <Route component={component} {...rest} />;
};

export default AuthorizedRoute;
