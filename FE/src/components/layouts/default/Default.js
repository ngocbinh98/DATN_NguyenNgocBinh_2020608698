import React from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import SideBar from '../../component/SideBar';

function Default({ children }) {
  return (
    <React.Fragment>
      <Header />
      <SideBar />
      <div className="main">
        <div className="content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Default;
