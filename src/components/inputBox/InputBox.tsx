import React from 'react';
import { Input, Label } from 'reactstrap';
import { InputBoxProps } from './InputBox.d';
import './InputBox.scss';

const InputBox: React.FC<InputBoxProps> = ({ classname, title, onChange }) => {
  return (
    <div className={`input-box ${classname}`}>
      <Label className="input-box-label">{title}</Label>
      <Input className="input-box-content" placeholder="Input to search image" onChange={onChange} />
    </div>
  );
};

export default InputBox;
