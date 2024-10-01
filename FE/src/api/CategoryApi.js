import Api from './Api';
const url = '/categories';
const getAllCategory = (page = 1, size = 20, sortField = 'id', sortType = 'desc') => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  return Api.get(`${url}`, { params: parameters });
};
const createCategory = (values) => {
  const body = {
    categoryName: values.categoryName,
  };
  return Api.post(`${url}`, body);
};
const updateCategory = (id, values) => {
  const body = {
    categoryName: values.categoryName,
  };
  return Api.put(`${url}/${id}`, body);
};

const deleteIdIn = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};
// export
const api = {
  getAllCategory,
  deleteIdIn,
  createCategory,
  updateCategory,
};
export default api;
