const isRememberMe = () => {
  if (localStorage.getItem('isRememberMe') !== null && localStorage.getItem('isRememberMe') !== undefined) {
    // convert string to boolean and return result
    return JSON.parse(localStorage.getItem('isRememberMe'));
  }
  return true;
};

const setRememberMe = (isRememberMe) => {
  localStorage.setItem('isRememberMe', isRememberMe);
};

const setItem = (key, value) => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};

const getItem = (key) => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};

const removeItem = (key) => {
  if (isRememberMe()) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};

const setToken = (token) => {
  setItem('token', token);
};

const removeToken = () => {
  removeItem('token');
};

const getToken = () => {
  return getItem('token');
};

const isAuth = () => {
  return getToken() !== null && getToken() !== undefined;
};

const setUserInfo = (user) => {
  setItem('username', user.username);
  setItem('role', user.role);
  // setItem('firstName', user.firstName);
  // setItem('lastName', user.lastName);
  // setItem('address', user.address);
  // setItem('phone', user.phone);
  // setItem('email', user.email);
  // setItem('status', user.status);
};

const getUserInfo = () => {
  return {
    username: getItem('username'),
    role: getItem('role'),
    // firstName: getItem('firstName'),
    // lastName: getItem('lastName'),
    // address: getItem('address'),
    // phone: getItem('phone'),
    // email: getItem('email'),
    // status: getItem('status'),
  };
};

const removeUserInfo = () => {
  removeItem('userName');
  removeItem('role');
  //   removeItem('firstName');
  //   removeItem('lastName');
  //   removeItem('address');
  //   removeItem('phone');
  //   removeItem('status');
  //   removeItem('email');
};

// export
const Storage = {
  isRememberMe,
  setRememberMe,
  setToken,
  getToken,
  removeToken,
  isAuth,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
};
export default Storage;
