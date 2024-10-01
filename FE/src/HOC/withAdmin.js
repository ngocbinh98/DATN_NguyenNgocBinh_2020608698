import React from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../storage/Storage';

function withAdmin(AuthenticatedComponent) {
  class HOC extends React.Component {
    isAuthenticated = () => {
      return storage.getToken() !== null && storage.getToken() !== undefined;
    };
    isUser = storage.getUserInfo();

    render() {
      return this.isAuthenticated && this.isUser.role === 'USER' ? (
        <Navigate to="/products" />
      ) : (
        <AuthenticatedComponent {...this.props} />
      );
    }
  }

  return HOC;
}

export default withAdmin;
