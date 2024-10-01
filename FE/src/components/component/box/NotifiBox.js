import React from 'react';
import styles from './Box.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NotifiBox = ({ content, btnname1, btnname2, action1, action2 }) => {
  return (
    <div className={cx('box-background')}>
      <div className={cx('box-box')}>
        <div className={cx('box-content')}>
          <p>{content}</p>
        </div>
        <div className={cx('box-btn')}>
          <button className={cx('box-btn-first')} onClick={action1}>
            {btnname1}
          </button>
          <button className={cx('box-btn-second')} onClick={action2}>
            {btnname2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifiBox;
