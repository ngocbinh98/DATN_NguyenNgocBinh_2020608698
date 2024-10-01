import styles from './scss/Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx('footer-content')}>
      <p>@2024</p>
      <p>Website bán thiết bị chăm sóc sức khỏe</p>
    </div>
  );
}

export default Footer;
