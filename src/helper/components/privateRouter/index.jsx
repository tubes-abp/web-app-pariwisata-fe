import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';

const PrivateRoute = (props) => {
  const location = useLocation();
  
  const token = window.localStorage.getItem("token");
  console.log(props);
  const path = props.path.split("/")[1];
  console.log(path);
  
  return token? (
    <Route {...props} />
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
