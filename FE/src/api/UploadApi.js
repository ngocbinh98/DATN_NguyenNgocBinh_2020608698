import Api from './Api';
const url = '/upload';

const deleteUserImage = (id) => {
  return Api.delete(`${url}/user/${id}`);
};

const deleteProductImage = (id) => {
  return Api.delete(`${url}/product/${id}`);
};

const upload = (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return Api.post(`${url}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// export
const api = {
  upload,
  deleteUserImage,
  deleteProductImage,
};
export default api;
