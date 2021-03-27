import Header from 'components/header/Header';
import React from 'react';
import './CommonLayout.scss';

const CommonLayout: React.FC = ({ children }) => {
  return (
    <div className="common-layout">
      <Header />
      {children}
    </div>
  );
};

export default CommonLayout;
