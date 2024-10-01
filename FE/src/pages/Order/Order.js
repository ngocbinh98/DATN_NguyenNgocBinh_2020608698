import { useState, useEffect, Fragment } from 'react';
import ShopOrderApi from '../../api/ShopOrderApi';
import VNPayApi from '../../api/VNPayApi';
import { getOrderAction } from '../../redux/actions/OrderAction';
import { connect } from 'react-redux';
import { selectOrders } from '../../redux/selectors/OrderSelector';
import FormatPrice from '../../components/checkprice/FormatPrice';
import NotifiBox from '../../components/component/box/NotifiBox';
import NotifiBox3 from '../../components/component/box/NotifiBox3';
import { ToastContainer, toast } from 'react-toastify';
import PaymentApi from '../../api/PaymentApi';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/logo/vnpay-logo.png';
const handleShowSuccessotification = () => {
  toast.success('Thanh toán thành công!', {
    toastId: 'pay-success', // Đặt một toastId cụ thể
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const handleShowDeleteNotification = () => {
  toast.success('Hủy đơn hàng thành công!', {
    toastId: 'delete-order', // Đặt một toastId cụ thể
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
// const exList = [];
function Order(props) {
  const [page, setPage] = useState(1);
  // const [orderData, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [isChoose, setChoese] = useState('');
  const [isShow1, setShow1] = useState(false);
  const [isShow2, setShow2] = useState(false);
  const [isShow3, setShow3] = useState(false);
  const [index, setIndex] = useState(1);
  const orderList = props.orders;

  const navigate = useNavigate();

  const getOrder = props.getOrderAction;

  const style = { borderBottom: '3px solid #f19854' };
  const getOrderData = async (page, orderStatus) => {
    try {
      const result = await ShopOrderApi.getAllShopOrderByUser(page, undefined, undefined, undefined, orderStatus);
      getOrder(result.content);
      total = result.totalPages;
      // setOrders(result.content);
      console.log(orderList);
    } catch (error) {}
  };

  const handlePay = async (orderId) => {
    try {
      await PaymentApi.createPayment(orderId);
      getOrderData(page, orderStatus);
      setShow1(false);
      setShow2(false);
      handleShowSuccessotification();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchaseByVNPay = async (totalPrice, id) => {
    try {
      const result = await VNPayApi.submitOrder(totalPrice, 'Thong tin don hang id' + id);
      console.log(result);
      const paymentUrl = result.paymentUrl;
      console.log(result.data);
      // Chuyển hướng người dùng đến trang thanh toán của VNPay
      window.location.href = paymentUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await ShopOrderApi.deleteByIds(id);
      getOrderData(page, orderStatus);
      handleShowDeleteNotification();
      setShow3(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderData(page, orderStatus);
  }, [page]);

  return (
    <div className="order-container">
      <ToastContainer />
      <button className="black-btn order-back-btn" onClick={() => navigate('/products')}>
        {'<'}
      </button>
      <h2>Đơn hàng của bạn</h2>
      <div className="order-select-content">
        <div className="order-select-container" style={isChoose === '' ? style : {}}>
          <button
            className="order-select-btn"
            onClick={() => {
              setChoese('');
              getOrderData(1);
              setOrderStatus('');
              setPage(1);
            }}
          >
            Tất cả đơn hàng
          </button>
        </div>
        <div className="order-select-container" style={isChoose === 'PAY' ? style : {}}>
          <button
            className="order-select-btn"
            onClick={() => {
              setChoese('PAY');
              getOrderData(1, 'PAY');
              setOrderStatus('PAY');
              setPage(1);
            }}
          >
            Đã thanh toán
          </button>
        </div>
        <div className="order-select-container" style={isChoose === 'NOT_PAY' ? style : {}}>
          <button
            className="order-select-btn"
            onClick={() => {
              setChoese('NOT_PAY');
              getOrderData(1, 'NOT_PAY');
              setOrderStatus('NOT_PAY');
              setPage(1);
            }}
          >
            Thanh toán khi nhận hàng
          </button>
        </div>
        <div className="order-select-container" style={isChoose === 'PROCESSING' ? style : {}}>
          <button
            className="order-select-btn"
            onClick={() => {
              setChoese('PROCESSING');
              getOrderData(1, 'PROCESSING');
              setOrderStatus('PROCESSING');
              setPage(1);
            }}
          >
            Chưa thanh toán
          </button>
        </div>
      </div>

      <div className="order-orderList">
        {orderList.length !== 0 ? (
          orderList.map((order, index) => (
            <div key={order.id} className="order-content-item">
              <div className="order-item">
                <p className="order-id">Mã đơn hàng: {order.id}</p>
                <p className="order-details">Ngày đặt hàng: {order.orderDate}</p>
                <p className="order-details">Tổng giá trị: {FormatPrice(order.totalPrice)}</p>
                <p className="order-details">Địa chỉ giao hàng: {order.addressShipping}</p>
                <p className="order-details">
                  Trạng thái:{' '}
                  {order.orderStatus === 'PAY'
                    ? 'Đã thanh toán'
                    : order.orderStatus == 'NOT_PAY'
                    ? 'Thanh toán khi nhận hàng'
                    : 'Đơn hàng chưa thanh toán'}
                </p>
                <div className="order-moreinfo">
                  {order.orderStatus === 'NOT_PAY' ? (
                    <button
                      className="white-btn order-moreinfo-btn"
                      onClick={() => {
                        setShow1(true);
                        setIndex(index);
                      }}
                    >
                      Nhận hàng và thanh toán
                    </button>
                  ) : (
                    <></>
                  )}
                  {order.orderStatus === 'PROCESSING' ? (
                    <>
                      <button
                        className="white-btn order-moreinfo-btn"
                        onClick={() => {
                          setShow3(true);
                          setIndex(index);
                        }}
                      >
                        Hủy đơn hàng
                      </button>
                      <button
                        className="white-btn order-moreinfo-btn"
                        onClick={() => {
                          setIndex(index);
                          setShow1(true);
                        }}
                      >
                        <>
                          Thanh toán qua
                          <img src={image} alt="vnpay" style={{ width: '50px', marginLeft: '5px' }} />
                        </>
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  <button
                    className="black-btn order-moreinfo-btn"
                    onClick={() => {
                      setShow2(true);
                      setIndex(index);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '100px', textAlign: 'center' }}>
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        )}
        {isShow1 === false ? (
          <Fragment />
        ) : (
          <NotifiBox
            content={
              orderList[index].orderStatus === 'PROCESSING'
                ? 'Xác nhận để tiến hành tới thanh toán đơn hàng'
                : 'Xác nhận đã nhận được hàng và thanh toán cho người giao đơn hàng này?'
            }
            btnname1="Thanh toán"
            btnname2="Close"
            action1={() =>
              orderList[index].orderStatus === 'PROCESSING'
                ? handlePurchaseByVNPay(orderList[index].totalPrice / 1000, orderList[index].id)
                : handlePay(orderList[index].id)
            }
            action2={() => setShow1(false)}
          />
        )}
        {isShow3 === false ? (
          <Fragment />
        ) : (
          <NotifiBox
            content={'Bạn có chắc chắn muốn hủy đơn hàng này ?'}
            btnname1="Xác nhận"
            btnname2="Close"
            action1={() => handleDeleteOrder(orderList[index].id)}
            action2={() => setShow3(false)}
          />
        )}
        {isShow2 === false ? (
          <Fragment />
        ) : (
          <NotifiBox3
            title="Chi tiết đơn hàng"
            content={
              <div style={{ overflowY: 'auto' }}>
                <p className="order-id">Mã đơn hàng: {orderList[index].id}</p>
                <p className="order-details">Ngày đặt hàng: {orderList[index].orderDate}</p>
                <p className="order-details">Tổng giá trị: {FormatPrice(orderList[index].totalPrice)}</p>
                <p className="order-details">Địa chỉ giao hàng: {orderList[index].addressShipping}</p>
                <p className="order-details">
                  Trạng thái: {orderList[index].orderStatus === 'PAY' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </p>
                {orderList[index].orderStatus === 'PAY' ? (
                  <>
                    <h3>Thông tin thanh toán</h3>
                    <p style={{ paddingLeft: '10px' }} className="order-details">
                      Ngày thanh toán : {orderList[index].payment.paymentDate}
                    </p>
                  </>
                ) : (
                  <Fragment />
                )}
                <h3>Sản phẩm</h3>
                {orderList[index].shopOrderItems.map((item) => (
                  <>
                    <div key={item.product.id} style={{ borderTop: '1px #ccc solid', padding: '10px' }}>
                      <p className="order-details">Mã sản phẩm: {item.product.id}</p>
                      <p className="order-details">Tên sản phẩm: {item.product.name}</p>
                      <p className="order-details">Giá tiền: {FormatPrice(item.product.price)}</p>
                      <p className="order-details">Số lượng: {item.quantity}</p>
                    </div>
                  </>
                ))}
              </div>
            }
            isbtn1={orderList[index].orderStatus === 'PAY' ? false : true}
            isbtn2={true}
            btnname1={
              orderList[index].orderStatus === 'NOT_PAY' ? (
                'Xác nhận đã thanh toán nhận hàng'
              ) : (
                <>
                  Thanh toán qua
                  <img src={image} alt="vnpay" style={{ width: '50px', marginLeft: '5px' }} />
                </>
              )
            }
            btnname2="Close"
            action1={() => {
              orderList[index].orderStatus === 'NOT_PAY'
                ? handlePay(orderList[index].id)
                : handlePurchaseByVNPay(orderList[index].totalPrice / 1000, orderList[index].id);
            }}
            action2={() => setShow2(false)}
          />
        )}
      </div>

      {/* PAGE CHUYỂN TRANG */}
      <div className="product-home-pages">
        <button onClick={() => setPage(page === 1 ? page : page - 1)} className="white-btn product-home-page-btn">
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
        <button onClick={() => setPage(page === total ? page : page + 1)} className="white-btn product-home-page-btn">
          {'>'}
        </button>
      </div>
      <div className="product-home-input-div">
        <input className="product-home-input-page" type="number" />
        <button
          onClick={() => {
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
    </div>
  );
}

const mapGlobalStateToProps = (state) => {
  return {
    orders: selectOrders(state),
  };
};

export default connect(mapGlobalStateToProps, { getOrderAction })(Order);
