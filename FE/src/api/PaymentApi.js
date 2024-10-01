import Api from './Api';

const url = '/payments';

const createPayment = (orderId) => {
  return Api.post(`${url}/shoporder/${orderId}`);
};

// export
const api = { createPayment };
export default api;
