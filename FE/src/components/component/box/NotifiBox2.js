import React, { useState, useEffect } from 'react';
import styles from './Box2.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const NotifiBox2 = ({ content, btnname, action }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className={cx('box-background')}>
      <div className={cx('box-box')}>
        <div className={cx('box-content')}>
          <div style={{ display: 'flex', margin: '10px 0', marginLeft: '150px' }}>
            <div className={cx('box-spinner')}></div>
            {countdown}s
          </div>
          <p>{content}</p>
        </div>
        <div className={cx('box-btn')}>
          <button className={cx('box-btn-first')} onClick={action}>
            {btnname}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifiBox2;
