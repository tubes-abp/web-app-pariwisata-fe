import React from 'react'
import { Row, Col, Space } from 'antd';

import './style.scss'
import MoleculesInputNumber from '../../../../../molecules/input/number';

const OrganismsCashierDataTransactionItem = ({ data, handleQuantity }) => {
  return (
    <div className='o-cashier-data-transaction-item'>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <p>{ data.name }</p>
            <h2>Rp{ data.price }</h2>          
          </Col>
          <Col span={12}>
            <p className="o-cashier-data-transaction-item__secondary-text">Quantity</p>
            <MoleculesInputNumber value={data.quantity} handleQuantity={handleQuantity} />          
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <p className="o-cashier-data-transaction-item__secondary-text">Sub Total</p>
          <p>Rp{ parseInt(data.price) * data.quantity }</p>
        </Row>
      </Space>
    </div>
  )
}

export default OrganismsCashierDataTransactionItem