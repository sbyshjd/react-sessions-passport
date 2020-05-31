import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import AuthorizedPage from './pages/AuthorizedPage';
import AuthPage from './pages/AuthPage';
import AuthorizedRoute from './utils/AuthorizedRoute';
import './assets/main.css';

function App() {
  return (
    <Switch>
      <Route path='/auth'>
        <AuthPage />
      </Route>
      <AuthorizedRoute exact path='/'>
        <AuthorizedPage />
      </AuthorizedRoute>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
