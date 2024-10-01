import Api from './Api';

const url = '/products';

const getAllProduct = (page = 1, size = 8, sortField = 'id', sortType = 'desc', search = '', category, type) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  // search
  if (search) {
    parameters.search = search;
  }

  // category
  if (category) {
    parameters.category = category;
  }

  // category
  if (type) {
    parameters.type = type;
  }

  return Api.get(`${url}`, { params: parameters });
};

const getProductById = (id) => {
  return Api.get(`${url}/${id}`);
};

const createProduct = (values) => {
  const body = {
    name: values.name,
    collection: values.collection,
    size: values.size,
    material: values.material,
    description: values.description,
    price: values.price,
    image: values.image,
    type: values.type,
    category: values.category,
  };
  return Api.post(`${url}`, body);
};

const updateProduct = (id, values) => {
  const body = {
    name: values.name,
    collection: values.collection,
    size: values.size,
    material: values.material,
    description: values.description,
    price: values.price,
    image: values.image,
    type: values.type,
    category: values.category,
  };
  return Api.put(`${url}/${id}`, body);
};

const deleteProduct = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};

const uploadProfileImage = (id, image) => {
  const body = {
    image: image,
  };
  return Api.put(`${url}/upload/${id}`, body);
};

// export
const api = { getAllProduct, createProduct, updateProduct, getProductById, deleteProduct, uploadProfileImage };
export default api;
