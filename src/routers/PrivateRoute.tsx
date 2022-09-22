import { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorized } from './helper';

interface RouteProps {
  path: string;
  exact: boolean;
  component?: ComponentType;
  render?: any;
}

export default function PrivateRoute(props: RouteProps) {
  const isAuthenticated = isAuthorized();
  return isAuthenticated ? (
    <Route
      path={props.path}
      exact={props.exact}
      component={props.component}
      render={props.render}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
