import React from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../storage/Storage';

function withAuth(AuthenticatedComponent) {
  class HOC extends React.Component {
    isAuthenticated = () => {
      return storage.getToken() !== null && storage.getToken() !== undefined;
    };

    render() {
      return !this.isAuthenticated() ? <Navigate to="/sign-in" /> : <AuthenticatedComponent {...this.props} />;
    }
  }

  return HOC;
}

export default withAuth;
