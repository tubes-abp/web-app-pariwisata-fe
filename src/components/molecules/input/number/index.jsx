import React from 'react'
import { Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import './style.scss';

const MoleculesInputNumber = ({ numberVal, stockMax, handleQuantity }) => {
  return (
    <div className="m-input-number">
      <Button icon={<MinusOutlined />} onClick={() => handleQuantity(numberVal - 1)} />
      <InputNumber 
        min={1} 
        max={stockMax} 
        value={numberVal} 
        controls={false}
        onChange={handleQuantity}
      />
      <Button icon={<PlusOutlined />} onClick={() => handleQuantity(numberVal + 1)} />
    </div>
  )
}

export default MoleculesInputNumber