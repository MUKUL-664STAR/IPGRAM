// AuthRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Signup from '../components/auth/Singup';
import Login from '../components/auth/Login';


const AuthRoutes = () => {
  return (
    <>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </>
  );
};

export default AuthRoutes;
