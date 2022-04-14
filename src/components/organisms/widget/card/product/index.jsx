import React from 'react'
import { Row, Col, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import './style.scss'

const OrganismsWidgetCardProduct = ({data, addProduct}) => {
  return (
    <div className={`o-widget-card-product ${data.stock <= 0? 'disabled':''}`}>
      <Space direction="vertical" size="middle" style={{ display: '100%' }}>
        <Row gutter={16} >
          <Col span={10}>
            <div className="o-widget-card-product__img">
              <img src={`${process.env.REACT_APP_API_ENDPOINT}/storage/${data.image_url}`} alt="" />
            </div>
          </Col>
          <Col span={14}>          
            <p>{ data.type }</p>
            <h2>{ data.name }</h2>          
          </Col>
        </Row>
        <Row align="middle" style={{ display: 'flex' }}>
          <Col md={{ span: 6 }} span={12}>
            <p>Stock</p>
            <h2>{ data.stock }</h2>
          </Col>
          <Col md={{ span: 11 }} span={12}>
            <p>Harga</p>
            <h2>{ "Rp"+new Intl.NumberFormat().format(data.price) }</h2>
          </Col>
          {
            addProduct &&
            <Col span={7}>
              <Button icon={<PlusOutlined />} onClick={() => addProduct(data)} >Tambah</Button>
            </Col>
          }
          {
            data.stock <= 0 &&
            <Col span={7}>
              <p className="text-danger">Stock Abis</p>
            </Col>          
          }
        </Row>
      </Space>
    </div>
  )
}

export default OrganismsWidgetCardProduct