import Api from './Api';
const url = '/types';
const getAllType = (page = 1, size = 20, sortField = 'id', sortType = 'desc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  return Api.get(`${url}`, { params: parameters });
};

const createType = (values) => {
  const body = {
    typeName: values.typeName,
  };
  return Api.post(`${url}`, body);
};
const updateType = (id, values) => {
  const body = {
    typeName: values.typeName,
  };
  return Api.put(`${url}/${id}`, body);
};

const deleteIdIn = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = {
  getAllType,
  deleteIdIn,
  createType,
  updateType,
};
export default api;
