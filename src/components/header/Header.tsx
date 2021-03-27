import React from 'react';
import { Label } from 'reactstrap';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <div className="header-layout">
      <Label className="label">
        VIN<span className="label-effect">BDI</span>
      </Label>
    </div>
  );
};

export default Header;
