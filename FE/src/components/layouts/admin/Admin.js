import React from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import SideBarAdmin from '../../component/SideBarAdmin';

function Admin({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideBarAdmin />
        <div style={{ height: '100%', width: '100%' }}>{children}</div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Admin;
