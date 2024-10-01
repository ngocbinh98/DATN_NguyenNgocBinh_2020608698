import { useEffect, useState, Fragment } from 'react';
import ShopOrderApi from '../../api/ShopOrderApi';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectOrders } from '../../redux/selectors/OrderSelector';
import { getOrderAction } from '../../redux/actions/OrderAction';
import { Button, Card, CardBody, FormGroup, Container, CardHeader, CardTitle, ModalHeader, Label } from 'reactstrap';
import { FastField, Form, Formik, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { ReactstrapInput } from 'reactstrap-formik';
import 'react-toastify/dist/ReactToastify.css';
import FormatPrice from '../../components/checkprice/FormatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const handleShowSuccessNotification = (message) => {
  toast.success(message, {
    toastId: 'login-error', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
let total = 1;
function OrderManager(props) {
  // const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [selectStatusValue, setSelectValue] = useState('');
  const [selectMinDateValue, setMinDateValue] = useState('');
  const [selectMaxDateValue, setMaxDateValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [indexCheck, setIdexCheck] = useState(undefined);
  const [totalPrice1, setTotalPrice] = useState(0);
  const [totalPrice2, setTotalPrice2] = useState(0);

  const navigate = useNavigate();

  const orderData = props.orders;

  const getOrder = props.getOrderAction;

  const handleSelect = (id) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const getAllOrder = async (page, status, minDate, maxDate) => {
    try {
      const result = await ShopOrderApi.getAllShopOrders(page, 8, undefined, undefined, status, minDate, maxDate);
      const orders = result.content;
      // setTotalPage(result.totalPages);
      getOrder(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const totalprice2 = () => {
    let price = 0;
    orderData.forEach((order) => {
      if (order.orderStatus === 'PAY') price += order.totalPrice;
    });
    setTotalPrice2(price);
  };

  const totalprice = async () => {
    try {
      const total = await ShopOrderApi.getTotalPrice();
      // totalPrice1 = total;
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (ids) => {
    try {
      const result = await ShopOrderApi.deleteByIds(ids);
      getAllOrder(page, selectStatusValue, selectMinDateValue, selectMaxDateValue);
      totalprice();
      handleShowSuccessNotification('Xóa đơn hàng thành công');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinDateChange = (event) => {
    setMinDateValue(event.target.value);
  };

  const handleMaxDateChange = (event) => {
    setMaxDateValue(event.target.value);
  };

  useEffect(() => {
    totalprice();
    getAllOrder(page, selectStatusValue, selectMinDateValue, selectMaxDateValue);
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    totalprice2();
  }, [orderData]);

  return (
    <>
      <Container fluid className="p-0">
        <ToastContainer />
        {/* HEADER */}
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            <p className="product-home-title" style={{ textAlign: 'center', fontSize: '75px' }}>
              ORDER MANAGER
            </p>
          </CardTitle>
          <div className="product-home-filter">
            <div className="product-home-type">
              <input
                onChange={handleMinDateChange}
                type="date"
                className="product-home-search-inp"
                placeholder="Min order date"
                style={{ width: '180px' }}
              ></input>
              -
              <input
                onChange={handleMaxDateChange}
                type="date"
                className="product-home-search-inp"
                placeholder="Search"
                style={{ width: '180px' }}
              ></input>
              <select id="order-status-select">
                <option key="0" value="">
                  Status
                </option>
                <option key="1" value="PAY">
                  PAY
                </option>
                <option key="2" value="NOT_PAY">
                  NOT PAY
                </option>
                <option key="3" value="PROCESSING">
                  PROCESSING
                </option>
              </select>
              <button
                className="manager-filter-btn"
                onClick={() => {
                  const selectElement = document.getElementById('order-status-select');
                  const selectedValue = selectElement.value;
                  setSelectValue(selectedValue);
                  getAllOrder(1, selectedValue, selectMinDateValue, selectMaxDateValue);
                  getAllOrder(1, selectedValue, selectMinDateValue, selectMaxDateValue);
                  totalprice2();
                  if (selectedValue != '') setPage(1);
                  if (selectedValue === '') setPage(1);
                  setSelectedIds([]);
                  console.log(selectMinDateValue);
                }}
              >
                Lọc
              </button>
            </div>
          </div>
        </CardHeader>

        {/* BODY */}
        <CardBody>
          <div className="product-manager-wrapper">
            <button
              className="manager-filter-btn product-manager-delete-btn"
              onClick={() => {
                if (selectedIds.length > 0) handleDeleteOrder(selectedIds);
                console.log(selectedIds);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <table className="product-table">
              <thead>
                <tr>
                  <th>✓</th>
                  <th>id</th>
                  <th>Order date</th>
                  <th>Pay date</th>
                  <th>Total price</th>
                  <th>Address shipping</th>
                  <th>Order status</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={order.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => handleSelect(order.id)}
                      />
                    </td>
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>
                      {order.payment && order.payment.paymentDate ? order.payment.paymentDate : 'Chưa thanh toán'}
                    </td>
                    <td>{FormatPrice(order.totalPrice)}</td>
                    <td>{order.addressShipping}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="order-manager-total-price"
              style={{ dislay: 'flex', justifyContent: 'right', width: '100%', marginTop: '50px' }}
            >
              <p>Doanh thu theo bảng: {FormatPrice(totalPrice2)}</p>
              <p>Tổng lợi nhuận tất cả đon hàng: {FormatPrice(totalPrice1)}</p>
            </div>
          </div>

          {/* PAGE CHUYỂN TRANG */}
          <div className="product-home-pages">
            <button onClick={() => setPage(page == 1 ? page : page - 1)} className="white-btn product-home-page-btn">
              {'<'}
            </button>
            {Array.from({ length: 7 }).map((_, index) => {
              const pageNumber = index - 3 + page;
              if (pageNumber > 0 && pageNumber <= total) {
                return pageNumber === page ? (
                  <button className="black-btn product-home-page-btn" key={index}>
                    {pageNumber}
                  </button>
                ) : (
                  <button onClick={() => setPage(pageNumber)} className="white-btn product-home-page-btn" key={index}>
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={() => setPage(page == total ? page : page + 1)}
              className="white-btn product-home-page-btn"
            >
              {'>'}
            </button>
          </div>
          <div className="product-home-input-div">
            <input className="product-home-input-page" type="number" />
            <button
              onClick={() => {
                // console.log(categoryData);
                const selectPageElement = document.getElementsByClassName('product-home-input-page')[0];
                const selectedPageValue = selectPageElement.value ? parseInt(selectPageElement.value, 10) : null;

                if (selectedPageValue !== null) {
                  if (selectedPageValue < 1) {
                    setPage(1);
                  } else if (selectedPageValue > total) {
                    setPage(total);
                  } else {
                    setPage(selectedPageValue);
                  }
                }
              }}
              className="white-btn product-home-input-page-btn"
            >
              Chuyển
            </button>
          </div>
        </CardBody>
      </Container>
    </>
  );
}
const mapGlobalStateToProps = (state) => {
  return {
    orders: selectOrders(state),
    // category: selectCategory(state),
    // page: selectPage(state),
    // totalSize: selectTotalSize(state),
    // category: selectCategory(state),
    // type: selectType(state),
    // size: selectSize(state),
    // selectedRows: selectSelectedRows(state),
  };
};

export default connect(mapGlobalStateToProps, { getOrderAction })(OrderManager);
