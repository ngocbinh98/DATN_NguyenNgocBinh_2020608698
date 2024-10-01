import Api from './Api';

const url = '/users';

const existsByEmail = (email) => {
  return Api.get(`${url}/email/${email}`);
};

const existsByUsername = (username) => {
  return Api.get(`${url}/username/${username}`);
};

const getByUsername = (username) => {
  return Api.get(`${url}/getbyname/${username}`);
};

const create = (values) => {
  const body = {
    username: values.username,
    email: values.email,
    password: values.password,
    address: values.address,
    phone: values.phone,
    firstName: values.firstName,
    lastName: values.lastName,
  };
  return Api.post(`${url}`, body);
};

const uploadProfileImage = (id, image) => {
  const body = {
    image: image,
  };
  return Api.put(`${url}/upload/${id}`, body);
};

const resendEmailToActiveAccount = (email) => {
  const parameters = {
    email: email,
  };

  return Api.get(`${url}/userRegistrationConfirmRequest`, { params: parameters });
};

const requestResetPassword = (email) => {
  const parameters = {
    email: email,
  };

  return Api.get(`${url}/resetPasswordRequest`, { params: parameters });
};

const resendEmailToResetpassword = (email) => {
  const parameters = {
    email: email,
  };

  return Api.get(`${url}/resendResetPassword`, { params: parameters });
};

const resetPassword = (token, newPassword) => {
  const parameters = {
    token: token,
    newPassword: newPassword,
  };

  return Api.get(`${url}/resetPassword`, { params: parameters });
};

const getProfile = () => {
  return Api.get(`${url}/profile`);
};

const createAccountFromAdmin = (values) => {
  const body = {
    username: values.username,
    email: values.email,
    password: values.password === null ? '' : values.password,
    address: values.address,
    phone: values.phone,
    firstName: values.firstName,
    lastName: values.lastName,
    role: values.role,
  };

  return Api.post(`${url}/byAdmin`, body);
};
const getAllUsers = (page = 1, size = 10, sortField = 'id', sortType = 'desc', search = '', role) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  // search
  if (search) {
    parameters.search = search;
  }
  if (role) {
    parameters.role = role;
  }

  return Api.get(`${url}`, { params: parameters });
};

const getById = (id) => {
  return Api.get(`${url}/${id}`);
};
const updateUser = (id, address, phone, firstName, lastName) => {
  const body = {
    address,
    phone,
    firstName,
    lastName,
  };
  return Api.put(`${url}/${id}`, body);
};
const updateByAdmin = (id, values) => {
  const body = {
    firstName: values.firstName,
    lastName: values.lastName,
    address: values.address,
    phone: values.phone,
    password: values.password,
    role: values.role,
  };
  return Api.put(`${url}/admin/${id}`, body);
};

const deleteByIds = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};
// export
const api = {
  deleteByIds,
  getAllUsers,
  getProfile,
  create,
  existsByEmail,
  existsByUsername,
  getByUsername,
  resendEmailToActiveAccount,
  requestResetPassword,
  resendEmailToResetpassword,
  resetPassword,
  createAccountFromAdmin,
  getById,
  updateUser,
  updateByAdmin,
  uploadProfileImage,
};
export default api;
