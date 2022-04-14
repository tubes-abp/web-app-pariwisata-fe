import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import Forbidden from '../../../pages/forbidden';

const PrivateRoute = (props) => {
  const location = useLocation();

  const token = window.localStorage.getItem("token");
  const role = window.localStorage.getItem("role");

  const path = props.path.split("/")[1];
  const isRightRole = path === role;
  console.log(path,role);
  
  return token?
    isRightRole? (
      <Route {...props} />
  ) : (
    <Forbidden url={role} />
  ) : (
    <Redirect
      to={{
        pathname: `/login/${path}`,
        state: { from: location }
      }}
    />
  );
}

export default PrivateRoute
