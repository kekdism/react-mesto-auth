import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRouter({
  component: Component,
  path,
  loggedIn,
  ...props
}) {
  return (
    <Route>
      {() => (loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />)}
    </Route>
  );
}
