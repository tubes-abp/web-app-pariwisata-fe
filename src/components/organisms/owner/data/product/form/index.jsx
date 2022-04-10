import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Row, Col, Space, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsOwnerDataProductForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialFormData, form]);  
  
  return (
    <div className="o-owner-data-product-form">      
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Product Name"
              name="name"              
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your Product Name!",
                }            
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                }            
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Product Type" name="type">
              <Select>
                <Select.Option value="product">Product</Select.Option>
                <Select.Option value="ticket">Ticket</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Stock"
              name="stock"
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your stock!",
                }            
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>  
        <Space size="middle">
          <Form.Item shouldUpdate>
            {() => (              
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                { initialFormData.title } Product
              </Button>
            )}
          </Form.Item>
          <Form.Item >
            <Button type="text" className="text-danger" onClick={goBack}>
              <span className="text-danger">Cancel</span>
            </Button>
          </Form.Item>
        </Space>
      </Form>      
    </div>
  )
}

export default OrganismsOwnerDataProductForm
