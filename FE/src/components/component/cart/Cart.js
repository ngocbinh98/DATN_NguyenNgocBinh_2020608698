import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import storage from '../../../storage/Storage';
import { useNavigate } from 'react-router-dom';
//redux
import ShoppingCartApi from '../../../api/ShoppingCartApi';
import { selectCartItems } from '../../../redux/selectors/CartSelector';
import { connect } from 'react-redux';
import { getCartItemAction } from '../../../redux/actions/CartAction';
import { Fragment, useEffect, useState } from 'react';
import FormatPrice from '../../checkprice/FormatPrice';
import NotifiBox from '../box/NotifiBox';
import { getPurchaseAction } from '../../../redux/actions/PurchaseAction';

const cx = classNames.bind(styles);

function Cart({ onClick, ...props }) {
  const navigate = useNavigate();
  const [isOpenDeleteItem, setOpenDeleteItem] = useState(false);
  const [isOpenDeleteAll, setOpenDeleteAll] = useState(false);
  const [idItemCart, setIdItemCart] = useState();
  const [cartId, setCartId] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const getCartItem = props.getCartItemAction;
  const cartData = props.cartItems;
  const getPurchase = props.getPurchaseAction;

  // const isAuthenticated = () => {
  //   return storage.getToken() !== null && storage.getToken() !== undefined;
  // };
  const getCart = async () => {
    try {
      const result = await ShoppingCartApi.getShoppingCartByDate();
      getCartItem(result.shoppingCartItems);
      setCartId(result.id);
      setIsVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreaseCartItem = async (idItemCart) => {
    try {
      await ShoppingCartApi.increaseItemInCart(cartId, idItemCart);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseCartItem = async (idItemCart) => {
    try {
      await ShoppingCartApi.decreaseItemInCart(cartId, idItemCart);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartItem = async () => {
    try {
      await ShoppingCartApi.deleteProductInCart(cartId, idItemCart);
      const result = await ShoppingCartApi.getShoppingCartByDate();
      getCartItem(result.shoppingCartItems);
      setIdItemCart(null);
      setOpenDeleteItem(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAll = async () => {
    try {
      await ShoppingCartApi.deleteCart(cartId);
      getCartItem(null);
      setOpenDeleteAll(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
    // console.log(cartData);
  }, []);

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('content', { visible: isVisible })}>
          <div className="text-center">
            <h1>GIỎ HÀNG</h1>
          </div>
          <div className={cx('list-product-container')}>
            <div className={cx('list-product')}>
              {cartData !== null ? (
                cartData.map((item) => (
                  <div className={cx('list-product-item')} key={item.product.id}>
                    <img src={item.product.image} alt={item.product.name} />

                    <div className={cx('list-product-info')}>
                      <p className={cx('list-product-info-name')}>{item.product.name}</p>
                      <div className={cx('list-product-info-price')}>
                        {/* <div className={cx('list-product-handle-price')}> */}
                        <button
                          onClick={() => {
                            handleDecreaseCartItem(item.product.id);
                          }}
                        >
                          {'<'}
                        </button>
                        <>{item.quantity}</>
                        <button
                          onClick={() => {
                            handleIncreaseCartItem(item.product.id);
                          }}
                        >
                          {'>'}
                        </button>
                        <>{' x '}</>
                        <>{FormatPrice(item.product.price)}</>
                        {/* </div> */}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setOpenDeleteItem(true);
                        setIdItemCart(item.product.id);
                      }}
                      className={cx('list-product-delete-btn')}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                ))
              ) : (
                <div>
                  <p>Chưa có sản phẩm nào</p>
                </div>
              )}
            </div>
          </div>
          <div className={cx('action')}>
            <button
              onClick={() => {
                if (cartData != null) setOpenDeleteAll(true);
              }}
              className={cx('delete-btn', 'white-btn')}
            >
              Xóa tất cả sản phẩm
            </button>
            <button
              className={cx('pay-btn', 'black-btn')}
              onClick={() => {
                if (cartData === null) {
                  alert('Chưa có sản phẩm nào trong giỏ hàng!!!');
                } else {
                  getPurchase(true, cartData, cartId);
                  navigate('/purchase');
                }
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
        <button onClick={onClick} className={cx('btn-close')}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
      {isOpenDeleteItem ? (
        <div className={cx('delete-item-background')}>
          <div className={cx('delete-item-box')}>
            <div className={cx('delete-item-content')}>
              <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng ?</p>
            </div>
            <div className={cx('delete-item-btn')}>
              <button
                className={cx('delete-item-btn-delete')}
                onClick={() => {
                  handleDeleteCartItem();
                }}
              >
                Delete
              </button>
              <button
                className={cx('delete-item-btn-close')}
                onClick={() => {
                  setOpenDeleteItem(false);
                  setIdItemCart(null);
                  console.log(idItemCart);
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
      {isOpenDeleteAll ? (
        <NotifiBox
          content="Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng"
          btnname1="Delete"
          btnname2="Close"
          action1={() => {
            handleDeleteAll();
          }}
          action2={() => setOpenDeleteAll(false)}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}

const mapGlobalStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
  };
};

export default connect(mapGlobalStateToProps, { getCartItemAction, getPurchaseAction })(Cart);
