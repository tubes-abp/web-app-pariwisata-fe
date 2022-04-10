import React from 'react'
import { Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import './style.scss';

const MoleculesInputNumber = ({ value, handleQuantity }) => {
  return (
    <div className="m-input-number">
      <Button icon={<MinusOutlined />} onClick={() => handleQuantity(value - 1)} />
      <Input value={value} />
      <Button icon={<PlusOutlined />} onClick={() => handleQuantity(value + 1)} />
    </div>
  )
}

export default MoleculesInputNumber