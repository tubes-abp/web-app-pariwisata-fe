import React from 'react'
import { Row, Col, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import './style.scss'

const OrganismsWidgetCardProduct = ({data, addProduct}) => {
  return (
    <div className='o-widget-card-product'>
      <Space direction="vertical" size="middle" style={{ display: '100%' }}>
        <Row gutter={16} >
          <Col span={10}>
            <div className="o-widget-card-product__img">
              <img src={"http://localhost:8000/storage/"+data.image_url} alt="" />        
            </div>
          </Col>
          <Col span={14}>          
            <p>{ data.type }</p>
            <h2>{ data.name }</h2>          
          </Col>
        </Row>
        <Row align="middle" style={{ display: 'flex' }}>
          <Col span={6}>
            <p>Stock</p>
            <h2>{ data.stock }</h2>
          </Col>
          <Col span={11}>
            <p>Harga</p>
            <h2>{ "Rp"+new Intl.NumberFormat().format(data.price) }</h2>
          </Col>
          {
            addProduct &&
            <Col span={7}>
              <Button icon={<PlusOutlined />} onClick={() => addProduct(data)} >Tambah</Button>
            </Col>
          }
        </Row>
      </Space>
    </div>
  )
}

export default OrganismsWidgetCardProduct