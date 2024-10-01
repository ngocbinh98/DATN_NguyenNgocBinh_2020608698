import styles from './scss/Header.module.scss';
import classNames from 'classnames/bind';
import Button from './button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from '../../storage/Storage';
import { Fragment } from 'react';
import UserApi from '../../api/UserApi';
import { selectCartItems } from '../../redux/selectors/CartSelector';
import { connect } from 'react-redux';
import { getCartItemAction } from '../../redux/actions/CartAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faRightFromBracket, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function Header(props) {
  const [isAuth, setAuth] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [usernameInfo, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const getCartItem = props.getCartItemAction;

  const checkAuthentication = async () => {
    const isAuthen = storage.getToken() !== null && storage.getToken() !== undefined;
    setAuth(isAuthen);

    if (isAuthen) {
      try {
        const userProfile = await UserApi.getProfile();
        setUsername(userProfile.username);
        if (userProfile.role === 'USER') {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  const handleLogout = () => {
    storage.removeToken();
    storage.removeUserInfo();
    setAuth(false);
    setIsUser(true);
    getCartItem([]);
    navigate('/');
  };

  useEffect(() => {
    checkAuthentication();
  }, [isAuth]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div>
          <p>
            {' '}
            <FontAwesomeIcon icon={faPhone} />
            Hotline: +84123456789
          </p>
        </div>
        <div className={cx('action')}>
          {location.pathname.includes('admin') ? (
            <button
              className={cx('buttons', 'home-btn')}
              onClick={() => {
                navigate('/');
              }}
            >
              Về trang chủ
            </button>
          ) : (
            <>
              {!isUser && isAuth && (
                <button
                  className={cx('buttons', 'admin-btn')}
                  onClick={() => {
                    navigate('/admin/user');
                  }}
                >
                  Tới trang quản lý
                </button>
              )}
            </>
          )}
          {!isAuth ? (
            <>
              <button className={cx('buttons')}>
                <Link className={cx('btn-a')} to={'/sign-in'}>
                  <FontAwesomeIcon icon={faRightToBracket} /> Đăng nhập
                </Link>
              </button>
              <button className={cx('buttons')}>
                <Link className={cx('btn-a')} to={'/sign-up'}>
                  <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className={cx('buttons')} onClick={() => navigate('/products/order')}>
                Đơn hàng
              </button>
              <button className={cx('buttons')} onClick={() => navigate('/profile')}>
                <FontAwesomeIcon icon={faUser} /> {usernameInfo}
              </button>
              <button className={cx('buttons', 'sign-out-btn')} onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapGlobalStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
  };
};

export default connect(mapGlobalStateToProps, { getCartItemAction })(Header);
