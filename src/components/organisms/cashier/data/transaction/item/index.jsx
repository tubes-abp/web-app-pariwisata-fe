import React from 'react'
import { Row, Col, Space } from 'antd';

import './style.scss'
import MoleculesInputNumber from '../../../../../molecules/input/number';

const OrganismsCashierDataTransactionItem = ({ data, handleQuantity, handleDeleteItem }) => {
  return (
    <div className='o-cashier-data-transaction-item'>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <p>{ data.name }</p>
            <h2>{ "Rp"+new Intl.NumberFormat().format(data.price) }</h2>          
          </Col>
          <Col span={12}>
            <div className="o-cashier-data-transaction-item__header-text">
              <p>Quantity</p>
              <p onClick={() => handleDeleteItem(data.id)}>Delete Item</p>
            </div>
            <MoleculesInputNumber numberVal={data.quantity} stockMax={data.stock} handleQuantity={handleQuantity} />          
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <p className="o-cashier-data-transaction-item__secondary-text">Sub Total</p>
          <p>{ "Rp"+new Intl.NumberFormat().format(parseInt(data.price) * data.quantity) }</p>
        </Row>
      </Space>
    </div>
  )
}

export default OrganismsCashierDataTransactionItem