import React, { Fragment } from 'react';
import styles from './Box3.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NotifiBox = ({ title, content, isbtn1, isbtn2, btnname1, btnname2, action1, action2 }) => {
  return (
    <div className={cx('box-background')}>
      <div className={cx('box-box')}>
        <h1>{title}</h1>
        <div className={cx('box-content')}>{content}</div>
        <div className={cx('box-btn')}>
          {isbtn1 === true && isbtn1 ? (
            <button className={cx('box-btn-first')} onClick={action1}>
              {btnname1}
            </button>
          ) : (
            <Fragment />
          )}
          {isbtn2 === true && isbtn2 ? (
            <button className={cx('box-btn-second')} onClick={action2}>
              {btnname2}
            </button>
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotifiBox;
