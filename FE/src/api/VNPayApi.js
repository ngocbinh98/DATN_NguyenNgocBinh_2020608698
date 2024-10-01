import Api from './Api';

const url = '/VNPay';

const submitOrder = (orderTotal, orderInfo) => {
  const parameters = {
    amount: orderTotal,
    orderInfo: orderInfo,
  };
  return Api.post(`${url}/submitOrder?amount=${orderTotal}&orderInfo=${orderInfo}`);
};
const paymentCompleted = (param) => {
  return Api.get(`${url}/vnpay-payment-return?${param}`);
};

const api = {
  submitOrder,
  paymentCompleted,
};
export default api;
