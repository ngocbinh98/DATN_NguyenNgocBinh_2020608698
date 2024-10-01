import Api from './Api';

const url = '/shoppingcarts';
const getShoppingCartByDate = () => {
  return Api.get(`${url}`);
};

const deleteProductInCart = (cartId, productId) => {
  return Api.put(`${url}/delete/${cartId}?productId=${productId}`);
};

const createCart = (productId) => {
  return Api.post(`${url}/${productId}`);
};

const addProductToCart = (cartId, productId) => {
  return Api.put(`${url}/${cartId}?productId=${productId}`);
};

const deleteCart = (cartID) => {
  return Api.delete(`${url}/${cartID}`);
};

const decreaseItemInCart = (cartId, productId) => {
  return Api.put(`${url}/decrease/${cartId}?productId=${productId}`);
};
const increaseItemInCart = (cartId, productId) => {
  return Api.put(`${url}/increase/${cartId}?productId=${productId}`);
};
// export
const api = {
  getShoppingCartByDate,
  deleteProductInCart,
  createCart,
  addProductToCart,
  deleteCart,
  decreaseItemInCart,
  increaseItemInCart,
};
export default api;
