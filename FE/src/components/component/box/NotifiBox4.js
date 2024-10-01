import React, { useState, useEffect } from 'react';
import styles from './Box4.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const NotifiBox4 = () => {
  return (
    <div className={cx('box-background')}>
      <div className={cx('box-box')}>
        <div className={cx('box-content')}>
          <div style={{ display: 'flex', margin: '10px 0', marginLeft: '150px' }}>
            <div className={cx('box-spinner')}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifiBox4;
