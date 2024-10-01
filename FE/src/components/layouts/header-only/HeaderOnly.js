import React from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';

function HeaderOnly({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <div className="content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default HeaderOnly;
