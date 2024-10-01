import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItem({ data, onClick }) {
  return (
    <div className={cx('wrapper')}>
      <Link onClick={onClick} to={`/products/productinfo/${data.id}`}>
        {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}></FontAwesomeIcon> */}

        <img className={cx('img')} src={data.image} alt="image" />

        <span className={cx('productname')}>{data.name} </span>
      </Link>
    </div>
  );
}

export default ProductItem;
