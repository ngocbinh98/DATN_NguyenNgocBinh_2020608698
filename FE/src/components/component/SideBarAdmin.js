import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './scss/SideBarAdmin.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  faChair,
  faChevronLeft,
  faChevronRight,
  faCouch,
  faFile,
  faFileInvoiceDollar,
  faTag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SideBarAdmin() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const url2 = location.pathname;
  const parts2 = url2.split('/');
  let lastSegment = parts2.pop();
  const backGroundstyle = {
    // height: '100%',
    // backgroundColor: '#565656',
    backgroundColor: '#4ea0a4',
  };

  const nonStyle = {};

  return (
    <div className={cx('sidebar-admin-wrapper', { collapsed: isCollapsed })}>
      <button className={cx('collapse-button')} onClick={() => setIsCollapsed(!isCollapsed)}>
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faBars} />
      </button>
      {!isCollapsed && (
        <>
          <div className={cx('sidebar-admin-title')}>
            <svg
              className="user-update-svg-icon"
              style={{
                verticalAlign: 'middle',
                fill: 'currentColor',
                overflow: 'hidden',
                marginTop: '20px',
                color: 'white',
                border: 'white 2px solid',
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
            </svg>
            <div className="div-ex"></div>
            <h3></h3>
            <p>ADMINISTRATION</p>
          </div>
          <div className={cx('sidebar-admin-body')}>
            <button
              style={lastSegment === 'user' ? backGroundstyle : nonStyle}
              className={cx('sidebar-admin-btn')}
              onClick={() => {
                navigate('/admin/user');
              }}
            >
              <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faUser} />
              User manager
            </button>
            <button
              style={lastSegment === 'product' ? backGroundstyle : nonStyle}
              className={cx('sidebar-admin-btn')}
              onClick={() => {
                navigate('/admin/product');
              }}
            >
              <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faChair} />
              Product manager
            </button>
            <button
              style={lastSegment === 'order' ? backGroundstyle : nonStyle}
              className={cx('sidebar-admin-btn')}
              onClick={() => {
                navigate('/admin/order');
              }}
            >
              <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFileInvoiceDollar} />
              Order manager
            </button>
            <button
              style={lastSegment === 'type' ? backGroundstyle : nonStyle}
              className={cx('sidebar-admin-btn')}
              onClick={() => {
                navigate('/admin/type');
              }}
            >
              <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFile} />
              Type manager
            </button>
            <button
              style={lastSegment === 'category' ? backGroundstyle : nonStyle}
              className={cx('sidebar-admin-btn')}
              onClick={() => {
                navigate('/admin/category');
              }}
            >
              <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faTag} />
              Category manager
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBarAdmin;
