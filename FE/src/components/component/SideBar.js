import styles from './scss/SideBar.module.scss';
import classNames from 'classnames/bind';
import images from '../../assets/logo/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from './button/Button';
import Cart from './cart/Cart';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import storage from '../../storage/Storage';
import { useNavigate } from 'react-router-dom';
import Search from './search/Search';
import { getCategoryAction } from '../../redux/actions/ProductAction';
import { selectCategory } from '../../redux/selectors/ProductSelector';
import { connect } from 'react-redux';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

const cx = classNames.bind(styles);

function SideBar(props) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const url = location.search;
  const url2 = location.pathname;
  const parts = url.split('=');
  const parts2 = url2.split('/');
  let lastSegment = parts2.pop();
  const categoryData = decodeURIComponent(parts[1]);

  const backGroundstyle = {
    height: '100%',
    // backgroundColor: '#565656',
    color: '#fcc100',
  };
  const nonStyle = {};

  const isAuthenticated = () => {
    return storage.getToken() !== null && storage.getToken() !== undefined;
  };
  useEffect(() => {}, [categoryData]);

  return (
    <div className={cx('side-bar')}>
      <div className={cx('content')}>
        <Link to={'/'} className={cx('logo')}>
          <img src={images.logo} alt="Nha Dep"></img>
        </Link>
        <div className={cx('action')}>
          <Button
            style={categoryData === 'undefined' && lastSegment === 'products' ? backGroundstyle : nonStyle}
            to={'/products'}
            onClick={() => {
              console.log(lastSegment);
            }}
          >
            <span>SẢN PHẨM</span>
          </Button>
          {/* PRODUCT BY ROOM */}
          <Button
            style={categoryData === 'health_care' ? backGroundstyle : nonStyle}
            to={'/products/category?category=health_care'}
            onClick={() => {
              console.log(categoryData);
            }}
          >
            <span>MASSAGE</span>
          </Button>
          <Button
            style={categoryData === 'sports_fitness' ? backGroundstyle : nonStyle}
            to={'/products/category?category=sports_fitness'}
            onClick={() => {
              // getCategory('DiningRoom');
            }}
          >
            <span>TẬP LUYỆN</span>
          </Button>
          <Button
            style={categoryData === 'medical_equipment' ? backGroundstyle : nonStyle}
            to={'/products/category?category=medical_equipment'}
            onClick={() => {
              // getCategory('Bedroom');
            }}
          >
            <span>Y TẾ</span>
          </Button>
        </div>
        {/* Search */}
        <Search />
        {/* CART */}
        <Button onClick={() => (!isAuthenticated() ? navigate('/sign-in') : setOpen(!isOpen))}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Giỏ hàng</span>
        </Button>
      </div>
      {isOpen === false ? <Fragment /> : <Cart onClick={() => setOpen(!isOpen)} />}
    </div>
  );
}

export default SideBar;
