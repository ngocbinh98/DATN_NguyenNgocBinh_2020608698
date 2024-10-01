import Api from './Api';
import store from '../storage/Storage';
const login = (username, password) => {
  const body = {
    username: username,
    password: password,
  };

  return Api.post(`/auth/login`, body);
};

// export
const api = { login };
export default api;
