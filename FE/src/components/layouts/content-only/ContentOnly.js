import React from 'react';
import Footer from '../../component/Footer';

function ContentOnly({ children }) {
  return (
    <React.Fragment>
      <div className="main">
        <div className="content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default ContentOnly;
