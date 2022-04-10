import React from 'react'
import { Row, Col, Space, Button } from 'antd';
import exImg from '../../../../../assets/images/no-image-available.png'
import { PlusOutlined } from '@ant-design/icons';


import './style.scss'

const OrganismsWidgetCardProduct = ({data, addProduct}) => {
  return (
    <div className='o-widget-card-product'>
      <Space direction="vertical" size="middle">
        <Row gutter={16} >
          <Col span={8}>
            <img src={exImg} alt="" />        
          </Col>
          <Col span={16}>          
            <p>{ data.type }</p>
            <h2>{ data.name }</h2>          
          </Col>
        </Row>
        <Row align="middle" style={{ display: 'flex' }}>
          <Col span={6}>
            <p>Stock</p>
            <h2>{ data.stock }</h2>
          </Col>
          <Col span={8}>
            <p>Harga</p>
            <h2>{ data.price }</h2>
          </Col>
          <Col span={10}>
            <Button icon={<PlusOutlined />} onClick={() => addProduct(data)} >Tambahkan Product</Button>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default OrganismsWidgetCardProduct