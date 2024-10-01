import { useEffect, useState } from 'react';
import VNPayApi from '../../api/VNPayApi';
import ShopOrderApi from '../../api/ShopOrderApi';
import PaymentApi from '../../api/PaymentApi';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import FormatPrice from '../../components/checkprice/FormatPrice';
function PurchaseVNPay() {
  const [orderId, setOrderId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [paymentTime, setPaymentTime] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const handleGetInfoVNPayPurchase = async () => {
    try {
      const queryString = window.location.search.substring(1);
      const result = await VNPayApi.paymentCompleted(queryString);
      setOrderId(result.orderId);
      setTotalPrice(result.totalPrice);
      setPaymentTime(result.paymentTime);
      setTransactionId(result.transactionId);
      setPaymentStatus(result.paymentStatus);
      let numbers = result.orderId.match(/\d+/g); // Biểu thức chính quy để tìm tất cả các số trong chuỗi
      let id = parseInt(numbers[0]);
      if (result.paymentStatus === 'fail') {
        await ShopOrderApi.deleteByIds(id);
      }
      if (result.paymentStatus === 'success') {
        await PaymentApi.createPayment(id);
      }
      console.log(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetInfoVNPayPurchase();
  });
  return (
    <div className="body py-5">
      <div className="container">
        {paymentStatus === 'success' ? (
          <div className="w-50 m-auto">
            <h1 className="my-3 text-success text-center">Thanh toán thành công</h1>
            <h2 className="my-2">Chi tiết đơn hàng</h2>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Thông tin đơn hàng:</td>
                  <td>{orderId}</td>
                </tr>
                <tr>
                  <td>Tổng tiền:</td>
                  <td>{FormatPrice(totalPrice * 10)}</td>
                </tr>
                <tr>
                  <td>Thời gian thanh toán:</td>
                  <td>{paymentTime}</td>
                </tr>
                <tr>
                  <td>Mã giao dịch:</td>
                  <td>{transactionId}</td>
                </tr>
              </tbody>
            </table>
            <Link to="/" className="btn btn-primary">
              Về trang chủ
            </Link>
          </div>
        ) : (
          <div className="w-50 m-auto">
            <h1 className="my-3 text-success text-center">Thanh toán thất bại</h1>
            <h2 className="my-2">Đơn hàng đã bị hủy</h2>
            <Link to="/" className="btn btn-primary">
              Về trang chủ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseVNPay;
