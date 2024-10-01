import Api from './Api';

const url = '/shoporders';

const getAllShopOrders = (page = 1, size = 10, sortField = 'id', sortType = 'desc', filter, minDate, maxDate) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  // if (filter) {
  //   parameters.filter = filter;
  // }

  // parameters.minDate = minDate;

  // if (maxDate) {
  //   parameters.maxDate = maxDate;
  // }
  return Api.get(`${url}?filter=${filter}&minDate=${minDate}&maxDate=${maxDate}`, { params: parameters });
};

const getAllShopOrderByUser = (page = 1, size = 5, sortField = 'id', sortType = 'desc', filter) => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };
  if (filter) {
    parameters.filter = filter;
  }

  return Api.get(`${url}/user`, { params: parameters });
};

const createShopOrderByCart = (cartId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/${cartId}`, body);
};

const createShopOrderByProduct = (quanity, productId, orderStatus) => {
  const body = {
    orderStatus,
  };

  return Api.post(`${url}/product/${productId}?quantity=${quanity}`, body);
};

const getTotalPrice = () => {
  return Api.get(`${url}/totalprice`);
};

const deleteByIds = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};

const api = {
  getAllShopOrders,
  getAllShopOrderByUser,
  createShopOrderByCart,
  createShopOrderByProduct,
  deleteByIds,
  getTotalPrice,
};
export default api;
